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

    <!-- lat long (x,y) inputs -->
    <!-- x -->
    <tw-input
      label="X Coordinate"
      name="x"
      type="number"
      v-model="nestLocation.latLng.lng"
      @input="updateNestMarker()"
    />

    <!-- y -->
    <tw-input
      label="Y Coordinate"
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
