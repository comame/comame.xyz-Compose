export interface URLQuery {
    [ key: string ]: string|number|undefined
}

export function buildUrlQuery(url: string, query: URLQuery) {
    const queryString = Object.keys(query).map(key => {
        const value = query[key]
        if (typeof value == 'undefined') return
        return encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }).filter(it =>
        typeof it != 'undefined'
    ).join('&')
    return url + '?' + queryString
}
