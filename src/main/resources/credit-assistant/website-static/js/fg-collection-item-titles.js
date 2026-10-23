const STORAGE_KEY_PREFIX = 'fgCollectionItemTitles'

function storageKey (collectionPath) {
  return `${STORAGE_KEY_PREFIX}:${collectionPath}`
}

function readItemTitles (collectionPath) {
  try {
    return new Map(Object.entries(JSON.parse(sessionStorage.getItem(storageKey(collectionPath))) ?? {}))
  } catch (e) {
    console.error(`Error reading collection item titles (${collectionPath}):\n`, e)
    return new Map()
  }
}

export function clearItemTitles () {
  try {
    Object.keys(sessionStorage)
      .filter(key => key.startsWith(`${STORAGE_KEY_PREFIX}:`))
      .forEach(key => sessionStorage.removeItem(key))
  } catch (e) {
    console.error('Error clearing collection item titles:\n', e)
  }
}

export function readItemTitle (collectionPath, collectionId) {
  return readItemTitles(collectionPath).get(collectionId) ?? ''
}

export function writeItemTitle (collectionPath, collectionId, title) {
  const titles = readItemTitles(collectionPath)
  if (title) {
    titles.set(collectionId, title)
  } else {
    titles.delete(collectionId)
  }

  try {
    sessionStorage.setItem(storageKey(collectionPath), JSON.stringify(Object.fromEntries(titles)))
  } catch (e) {
    console.error(`Error saving collection item title (${collectionPath}):\n`, e)
  }
}
