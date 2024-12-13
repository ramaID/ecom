export const updateSearchParams = (location: Location, params: Record<string, string>): string => {
  const searchParams = new URLSearchParams(location.search)
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
  })
  return searchParams.toString()
}

export const getFullUrl = (pageUrl: string): string => {
  const urlLink = new URL(pageUrl, window.location.origin)
  const url = new URL(window.location.href)
  url.searchParams.set('page', urlLink.searchParams.get('page') || '1')
  return url.toString()
}
