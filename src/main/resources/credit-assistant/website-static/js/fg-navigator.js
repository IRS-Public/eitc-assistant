import { checkCondition } from './fg-conditions.js'

// === Single-question-per-screen navigation =======================================
//
// When flow-manifest.json is present (build flag --singleQuestionPerScreen), each page hosts a
// single question and conditional show/hide that used to happen inline now happens between
// pages. We walk the manifest on Next/Prev to skip pages whose gate is false against the live
// Fact Graph, and on load we redirect off pages whose gate has become false (e.g., the user
// changed an earlier answer that invalidated the current page).
//
// If the manifest is absent (multi-question mode), this code no-ops.

const SUPPORTED_LOCALES = ['es', 'ht', 'ko', 'ru', 'vi', 'zh-hans', 'zh-hant']

async function loadFlowManifest () {
  try {
    const res = await fetch('/app/eitc/resources/flow-manifest.json')
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    return null
  }
}

function stripAppPrefix (pathname) {
  const APP_PREFIX = '/app/eitc'
  return pathname.startsWith(APP_PREFIX) ? pathname.slice(APP_PREFIX.length) : pathname
}

function detectLocaleSegment (pathAfterApp) {
  const firstSegment = pathAfterApp.startsWith('/') ? pathAfterApp.slice(1).split('/')[0] : ''
  return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : ''
}

function currentLangPrefix () {
  const afterApp = stripAppPrefix(window.location.pathname)
  const locale = detectLocaleSegment(afterApp)
  return locale ? `/${locale}` : ''
}

function currentRouteFromLocation () {
  let path = stripAppPrefix(window.location.pathname)
  const locale = detectLocaleSegment(path)
  if (locale) path = path.slice(locale.length + 1) // remove "/{locale}"
  if (path === '' || path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

function hrefForRoute (route) {
  const lang = currentLangPrefix()
  const routePortion = route === '/' ? '/' : `${route}/`
  return `/app/eitc${lang}${routePortion}`
}

function pageGateLive (manifestEntry) {
  if (!manifestEntry || !manifestEntry.gatePath || !manifestEntry.gateOperator) return true
  return checkCondition(manifestEntry.gatePath, manifestEntry.gateOperator)
}

function findLive (manifest, fromIdx, step) {
  for (let i = fromIdx + step; i >= 0 && i < manifest.length; i += step) {
    if (pageGateLive(manifest.at(i))) return i
  }
  return -1
}

export function refreshNavigationLinks (manifest) {
  const currentRoute = currentRouteFromLocation()
  const currentIdx = manifest.findIndex(p => p.route === currentRoute)
  if (currentIdx < 0) return

  const nextLink = document.querySelector('.form-actions a.usa-button:not(.usa-button--outline)')
  if (nextLink) {
    const nextIdx = findLive(manifest, currentIdx, 1)
    const nextEntry = nextIdx >= 0 ? manifest.at(nextIdx) : null
    if (nextEntry) nextLink.href = hrefForRoute(nextEntry.route)
  }

  const backLinks = document.querySelectorAll('.form-actions a.usa-button--outline')
  if (backLinks.length > 0) {
    const prevIdx = findLive(manifest, currentIdx, -1)
    const prevEntry = prevIdx >= 0 ? manifest.at(prevIdx) : null
    if (prevEntry) {
      const newHref = hrefForRoute(prevEntry.route)
      for (const link of backLinks) link.href = newHref
    }
  }
}

export async function initSingleQuestionNav () {
  const manifest = await loadFlowManifest()
  if (!manifest) return

  const currentRoute = currentRouteFromLocation()
  const currentIdx = manifest.findIndex(p => p.route === currentRoute)
  const currentEntry = currentIdx >= 0 ? manifest.at(currentIdx) : null
  if (currentEntry && !pageGateLive(currentEntry)) {
    // Current page's gate is false — bounce forward to the first live page rather than show a
    // question that should be skipped given current answers.
    const nextIdx = findLive(manifest, currentIdx, 1)
    const nextEntry = nextIdx >= 0 ? manifest.at(nextIdx) : null
    if (nextEntry) {
      window.location.replace(hrefForRoute(nextEntry.route))
      return
    }
  }

  refreshNavigationLinks(manifest)
  document.addEventListener('fg-update', () => refreshNavigationLinks(manifest))
}
