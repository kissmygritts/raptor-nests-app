import * as utm from 'utm'

export function coordConverter ({ x, y, proj }) {
  const utms = proj === 'utm' ? { easting: x, northing: y } : utm.fromLatLon(y, x)
  const latLng = proj === 'latlng' ? { longitude: x, latitude: y } : utm.toLatLon(x, y, 11, null, true)

  return {
    utms: { x: utms.easting, y: utms.northing },
    latlng: { x: latLng.longitude, y: latLng.latitude }
  }
}
