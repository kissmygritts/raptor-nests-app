import { customAlphabet } from 'nanoid/async'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6)

async function generateId () {
  return nanoid()
}

export default generateId
