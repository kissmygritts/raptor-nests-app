export const decodeToken = (token) => {
  console.log('TOKEN DECODED')
  console.log({ token })
  return token ? JSON.parse(atob(token.split('.')[1])) : {}
}
