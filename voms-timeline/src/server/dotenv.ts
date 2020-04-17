import fs from 'fs'
import { resolve } from 'path'

export const dotenv: { [key: string]: string } = {}

fs.readFileSync(resolve(__dirname, '../../.env'), {
    encoding: 'utf8'
}).split('\n').forEach(line => {
    const [ key, value ] = line.split('=')
    if (!key) return
    dotenv[key] = value
})
