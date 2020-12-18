import geobuf from 'geobuf'
import Pbf from 'pbf'

function toGeojson (buffer) {
  return geobuf.decode(new Pbf(buffer))
}

export {
  toGeojson
}
