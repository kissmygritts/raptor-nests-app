<template>
  <!-- form -->
  <div>
    <form @submit.prevent>
      <map-input
        :lat-lng="latLng"
        @input:nest-location="updateNestLocation"
      />

      <!-- current location -->
      <base-radio
        :label="current_location.label"
        :name="current_location.name"
        :options="current_location.options"
        v-model="model"
      />

      <!-- exact location? -->
      <base-radio
        :label="exact_coordinates.label"
        :name="exact_coordinates.name"
        :options="exact_coordinates.options"
        v-model="model"
      />

      <!-- show these fields base on exact location -->
      <div v-if="showLocationModifiers">
        <base-input
          :name="distance.name"
          :label="distance.label"
          :helptext="distance.helptext"
          :type="distance.type"
          v-model="model"
        />

        <base-select
          :name="direction.name"
          :label="direction.label"
          :helptext="direction.helptext"
          :type="direction.type"
          :options="direction.options"
          v-model="model"
        />
      </div>
    </form>
  </div>
</template>

<script>
import BaseRadio from '@/components/form-elements/BaseRadio.vue'
import BaseInput from '@/components/form-elements/BaseInput.vue'
import BaseSelect from '@/components/form-elements/BaseSelect.vue'
import MapInput from '@/components/form-elements/MapInput.vue'

// location form config
const locationDetailsConfig = {
  current_location: {
    name: 'current_location',
    label: 'Is this the current, actual location of the nest.',
    type: 'radio',
    options: ['true', 'false']
  },
  exact_coordinates: {
    name: 'exact_coordinates',
    label: 'Are these the exact coordinates of the nest?',
    type: 'radio',
    options: [
      'true',
      'false'
    ]
  },
  distance: {
    name: 'distance',
    label: 'Distance to Nest',
    type: 'number',
    helptext: 'The distance, in meters, to the nest from your location.'
  },
  direction: {
    name: 'direction',
    label: 'Direction',
    type: 'select',
    helptext: 'Approximate direction to the nest from the recorded coordinates',
    options: ['NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W']
  }
}

export default {
  name: 'LocationDetails',

  components: {
    BaseInput,
    BaseSelect,
    BaseRadio,
    MapInput
  },

  data () {
    return {
      ...locationDetailsConfig,
      model: {},
      latLng: null
    }
  },

  computed: {
    output () {
      return {
        ...this.model
      }
    },

    showLocationModifiers () {
      return this.model.exact_coordinates === 'No'
    },

    hasCoordsInRoute () {
      return Object.keys(this.$route.query).includes('lat', 'lng')
    }
  },

  watch: {
    output (newOutput, oldOutput) {
      this.$emit('input:location-details', this.output)
    }
  },

  methods: {
    updateNestLocation ({ lat, lng }) {
      this.model.lat = lat
      this.model.lng = lng
    }
  },

  mounted () {
    if (this.hasCoordsInRoute) {
      const { lat, lng } = this.$route.query
      this.latLng = { lat, lng }
    }
  }
}
</script>
