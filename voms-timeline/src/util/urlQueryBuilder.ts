export interface URLQuery {
    [ key: string ]: string
}

export function buildUrlQuery(url: string, query: URLQuery) {
    const queryString = Object.keys(query).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
    ).join('&')
    return url + '?' + queryString
}
