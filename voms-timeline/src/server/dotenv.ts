import fs from 'fs'
import { resolve } from 'path'

const txt = fs.readFileSync(resolve(__dirname, '../../.env'), {
    encoding: 'utf8'
})

const _dotenv = txt.split('\n').map(line => {
    const [ key, value ] = line.split('=')
    return { [key]: value }
})

export const dotenv = _dotenv as {}
