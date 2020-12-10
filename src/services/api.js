const API_URL = 'http://localhost:3000'
const POST_HEADERS = {
  'Content-type': 'application/json; charset=UTF-8'
}

async function getNests () {
  const url = `${API_URL}/nests?_embed=locations`

  try {
    const res = await fetch(url)
    const nests = await res.json()
    const data = nests.map(nest => {
      const { lat, lng } = nest.locations[0]

      return {
        ...nest,
        lat,
        lng
      }
    })

    return data
  } catch (err) {
    console.log(err)
  }
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
