const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

const POST_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8'
}

async function getNestById ({ id }) {
  const response = await fetch(uriPath(`nests/${id}`))
  const data = await response.json()

  return {
    statusCode: response.status,
    data
  }
}

async function submitNest (nest) {
  const response = await fetch(`${API_URL}/nests`, {
    method: 'POST',
    body: JSON.stringify(nest),
    headers: {
      ...POST_HEADERS
    }
  })

  const data = await response.json()
  return {
    statusCode: response.status,
    data
  }
}

async function submitNestLocation (location) {
  const response = await fetch(`${API_URL}/locations`, {
    method: 'POST',
    body: JSON.stringify(location),
    headers: {
      ...POST_HEADERS
    }
  })

  const data = await response.json()
  return {
    statusCode: response.status,
    data
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
  getNestById,
  submitNest,
  submitNestLocation,
  getNestsGeobuf
}

function uriPath (path) {
  return `${API_URL}/${path}`
}
