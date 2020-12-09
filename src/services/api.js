const API_URL = 'http://localhost:3000'
const POST_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8'
}

async function getNests () {

}

async function findNest () {

}

async function submitNest (nest) {
  const body = JSON.stringify(nest)

  try {
    await fetch(`${API_URL}/nests`, {
      method: 'POST',
      body: body,
      headers: {
        ...POST_HEADERS
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function submitNestLocation (location) {
  const body = JSON.stringify(location)

  try {
    await fetch(`${API_URL}/locations`, {
      method: 'POST',
      body: body,
      headers: {
        ...POST_HEADERS
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export default {
  getNests,
  findNest,
  submitNest,
  submitNestLocation
}
