const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000'

const POST_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8'
}

async function login ({ username, password }) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: POST_HEADERS
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    return {
      statusCode: response.status,
      data
    }
  } catch (err) {
    return {
      statusCode: 401,
      data: null,
      error: 'username or password not found'
    }
  }
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

async function updateNestDetails (nest) {
  const { id, ...nestDetails } = nest

  const response = await fetch(`${API_URL}/nests/${id}`, {
    method: 'PUT',
    body: JSON.stringify(nestDetails),
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

async function submitNestVisit (nest) {
  const response = await fetch(`${API_URL}/nests/${nest.nest_id}/visits`, {
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
  login,
  getNestById,
  submitNest,
  submitNestLocation,
  submitNestVisit,
  getNestsGeobuf,
  updateNestDetails
}

function uriPath (path) {
  return `${API_URL}/${path}`
}
