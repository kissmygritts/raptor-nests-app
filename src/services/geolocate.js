async function geolocate (options) {
  return new Promise((resolve, reject) => {
    const hasGeolocation = 'geolocation' in navigator

    if (!hasGeolocation) {
      console.log(hasGeolocation)
      reject(new Error('Geolocation is not available'))
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          accuracy: position.coords.accuracy
        })
      },
      err => {
        reject(err)
      },
      options
    )
  })
}

export default geolocate
