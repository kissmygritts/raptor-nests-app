<template>
  <div class="w-full space-y-4">
    <l-map
      ref="map"
      style="height: 350px;"
      class="w-full mb-4"
      :zoom="map.zoom"
      :center="map.center"
    >
      <l-tile-layer :url="map.basemaps" />

      <!-- geolocation marker -->
      <l-circle-marker
        v-if="hasGeolocation"
        :lat-lng="[geolocation.lat, geolocation.lng]"
      />

      <!-- nest location marker -->
      <l-marker
        ref="marker"
        v-if="hasNestLocation"
        :draggable="true"
        :lat-lng.sync="nestLocation.latLng"
        @update:lat-lng="panMapToNest()"
        @ready="emitLocation()"
      />
    </l-map>

    <!-- latlng/utm selector -->
    <!-- WIP: still working on this  -->
    <!-- <div class="inline-flex shadow-sm rounded">
      <label
        class="relative inline-flex items-center px-5 py-2 rounded-l cursor-pointer border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-oxford-lightest focus:border-oxford-lightest"
        :class="{ active: crs === 'latlng' }"
      >
        <input type="radio" class="hidden" name="crs" v-model="crs" value="latlng">
        LatLng
      </label>
      <label
        class="-ml-px relative inline-flex items-center px-5 py-2 rounded-r cursor-pointer border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-oxford-lightest focus:border-oxford-lightest"
        :class="{ active: crs === 'utm' }"
      >
        <input type="radio" class="hidden" name="crs" v-model="crs" value="utm">
        UTMs
      </label>
    </div> -->

    <!-- lat long (x,y) inputs -->
    <!-- x -->
    <tw-input
      label="Longitude"
      name="x"
      type="number"
      v-model="nestLocation.latLng.lng"
      @input="updateNestMarker()"
    />

    <!-- y -->
    <tw-input
      label="Latitude"
      name="y"
      type="number"
      v-model="nestLocation.latLng.lat"
      @input="updateNestMarker()"
    />
  </div>
</template>

<script>
import { LMap, LMarker, LTileLayer, LCircleMarker } from 'vue2-leaflet'
import geolocate from '@/services/geolocate.js'
// import { coordConverter } from '@/services/utm.js'

export default {
  name: 'MapInput',

  components: {
    LMarker,
    LMap,
    LTileLayer,
    LCircleMarker
  },

  props: {
    value: {
      type: Object,
      default () {
        return { lat: 39.320833, lng: -116.638583 }
      }
    }
  },

  data () {
    return {
      map: {
        center: [39.320833, -116.638583],
        zoom: 7,
        basemaps: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      crs: 'latlng',
      geolocation: null,
      nestLocation: {
        latLng: []
      }
    }
  },

  computed: {
    hasGeolocation () {
      return Object.prototype.toString.call(this.geolocation) === '[object Object]'
    },

    hasLatLngProp () {
      return this.value !== null
    },

    hasNestLocation () {
      return Object.keys(this.nestLocation.latLng).length > 0
    }

    // coordinates () {
    //   const { lng: x, lat: y } = this.nestLocation.latLng
    //   return coordConverter({ x, y, proj: 'latlng' })
    // }
  },

  methods: {
    flyToLocation (zoom) {
      this.$nextTick(() => {
        this.$refs.map.mapObject.flyTo(this.nestLocation.latLng, zoom)
      })
    },

    updateNestMarker () {
      this.$refs.marker.mapObject.setLatLng(this.nestLocation.latLng)
      this.panMapToNest()
      this.emitLocation()
    },

    panMapToNest () {
      this.$refs.map.mapObject.panTo(this.nestLocation.latLng, {
        animate: true
      })
      this.emitLocation()
    },

    emitLocation () {
      // this.$emit('input:nest-location', this.nestLocation.latLng)
      this.$emit('input', this.nestLocation.latLng)
    }
  },

  async mounted () {
    this.$nextTick(async () => {
      let zoom = 10

      if (this.hasLatLngProp) {
        this.nestLocation.latLng = this.value
      } else {
        try {
          this.geolocation = await geolocate()
          this.nestLocation.latLng = { lat: this.geolocation.lat, lng: this.geolocation.lng }
        } catch (err) {
          this.nestLocation.latLng = { lat: this.map.center[0], lng: this.map.center[1] }
          zoom = 8
        }
      }

      this.emitLocation()
      this.flyToLocation(zoom)
    })
  }
}
</script>

<style scoped>
/* .active {
  @apply bg-olive border-olive text-white
} */
</style>
