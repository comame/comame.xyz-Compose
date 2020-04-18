import { IncomingMessage } from 'http'
import { target } from './target'

export interface HTTPHeaders {
    [key: string]: string
}

export interface FetchOptions {
    method?: 'GET'
    headers?: HTTPHeaders
}

export async function fetch(url: string, option?: FetchOptions): Promise<Response> {
    if (target == 'web') {
        return (window as any).fetch(url, option)
    }

    const { request } = await import('https')
    return new Promise((resolve, reject) => {
        const responseHandler = (res: IncomingMessage) => {
            let responseText = ''

            res.on('data', (chunk: Buffer | string) => {
                if (typeof chunk == 'string') {
                    responseText += chunk
                } else {
                    responseText += chunk.toString('utf8')
                }
            })

            res.on('end', () => {
                const headers = {} as HTTPHeaders
                for (const key of Object.keys(res.headers)) {
                    const value: string | string[] | undefined = res.headers[key]
                    if (typeof value == 'undefined') continue
                    if (Array.isArray(value)) {
                        headers[key] = value.join(' ')
                        continue
                    }
                    headers[key] = value
                }

                resolve(new Response(
                    headers,
                    res.statusCode!!,
                    res.url!!,
                    responseText
                ))
            })
        }

        const req = option ? request(url, option, responseHandler) : request(url, responseHandler)

        req.on('error', (err) => {
            reject(err)
        })

        req.end()
    })
}

export class Response {
    public ok: boolean
    public json: () => Promise<string>
    public text: () => Promise<string>

    constructor(
        public headers: HTTPHeaders,
        public status: number,
        public url: string,
        responseText: string
    ){
        if (200 <= status && status < 300) {
            this.ok = true
        } else {
            this.ok = false
        }

        this.json = async () => JSON.parse(responseText)
        this.text = async () => responseText
    }
}
