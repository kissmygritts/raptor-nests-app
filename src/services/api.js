const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

const POST_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8'
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

async function getNestsGeobuf () {
  try {
    const response = await fetch(`${API_URL}/geobuf/nests`, {
      method: 'GET',
      responseType: 'arraybuffer'
    })

    return response.arrayBuffer()
  } catch (err) {
    console.log(err)
  }
}

export default {
  findNest,
  submitNest,
  submitNestLocation,
  getNestsGeobuf
}
