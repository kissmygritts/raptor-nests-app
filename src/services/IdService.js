import { customAlphabet } from 'nanoid/async'

async function generateId (n) {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', n)
  return nanoid()
}

export default generateId
