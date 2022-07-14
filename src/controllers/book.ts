import axios from 'axios'
import { WEB_SERVICE__ENDPOINT } from '../config'

export default async function saveBook(book:any):Promise<boolean> {
    await axios.post(`${WEB_SERVICE__ENDPOINT}/books`, book)
        .then(res => {
            console.log('[DEBUG] saveBook response', res.status, res.data)
            return res.status == 200
        }).catch(error => {
            console.error(error)
            return false
        })
    return true
}