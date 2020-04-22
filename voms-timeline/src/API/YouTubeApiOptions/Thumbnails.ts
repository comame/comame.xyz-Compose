export type Thumbnails = {
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail
    [ key: string ]: Thumbnail
}

interface Thumbnail {
    url: string
    width: number
    height: number
}
