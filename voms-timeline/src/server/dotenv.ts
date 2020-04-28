import fs from 'fs'
import { resolve } from 'path'

export const dotenv: { [ key: string ]: string } = Object.fromEntries(
    fs.readFileSync(resolve(__dirname, '../../.env'), {
        encoding: 'utf8'
    }).split('\n').map(line => line.split('='))
)
