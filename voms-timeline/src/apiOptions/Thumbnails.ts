export interface Thumbnails {
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail
}

interface Thumbnail {
    url: string
    width: number
    height: number
}
