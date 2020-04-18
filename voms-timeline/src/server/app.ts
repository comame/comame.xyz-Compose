import { dotenv } from './dotenv'
import { fetch } from '../util/fetch'

console.log(dotenv)
fetch('https://blog.comame.xyz/').then(res => res.text()).then(console.log).catch(console.error)
