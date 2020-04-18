export interface YouTubeAPIError {
    errors: [{
        domain: string
        reason: string
        message: string
        locationType: string
        location: string
    }]
    code: string
    message: string
}
