export const COLLECTION_ID_PLACEHOLDER = '{{COLLECTION_ID}}'

export function makeCollectionIdPath (abstractPath, id) {
  return abstractPath.replace('*', `#${id}`)
}

export function configureCollectionIds (template, collectionId) {
  const attributes = ['path', 'condition', 'id', 'for', 'name', 'aria-describedby']
  const nodesWithAbstractPaths = template.querySelectorAll(attributes.map(attr => `[${attr}*="/*/"]`).join(','))
  for (const node of nodesWithAbstractPaths) {
    for (const attribute of attributes) {
      const path = node.getAttribute(attribute)
      if (path) {
        node.setAttribute(attribute, makeCollectionIdPath(path, collectionId))
      }
    }
  }

  for (const button of template.querySelectorAll('button.pdf-download')) {
    const onclick = button.getAttribute('onclick')
    button.setAttribute('onclick', onclick.replaceAll(COLLECTION_ID_PLACEHOLDER, collectionId))
  }
}

export function generateUUID () {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // 0 is the placeholder, 1 and - are static
  return '00000000-0000-1000-0000-000000000000'.replace(/0/g, () => {
    return (Math.random() * 16 | 0).toString(16)
  })
}
