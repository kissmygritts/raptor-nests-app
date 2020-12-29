<template>
  <!-- form -->
  <div>
    <form @submit.prevent>
      <map-input
        :lat-lng="latLng"
        @input:nest-location="updateNestLocation"
      />

      <!-- exact location? -->
      <tw-radio
        class="mt-4"
        :label="exact_coordinates.label"
        :name="exact_coordinates.name"
        :options="exact_coordinates.options"
        :has-error="$v.model.exact_coordinates.$error"
        :is-invalid="$v.model.exact_coordinates.$invalid"
        v-model="model.exact_coordinates"
        @blur="$v.model.exact_coordinates.$touch()"
      >
        <p v-if="!$v.model.exact_coordinates.required">Exact Coordinates is a required field.</p>
      </tw-radio>

      <!-- show these fields base on exact location -->
      <div v-if="showLocationModifiers">
        <tw-input
          :name="distance.name"
          :label="distance.label"
          :helptext="distance.helptext"
          :type="distance.type"
          v-model="model.distance"
        />

        <tw-select
          :name="direction.name"
          :label="direction.label"
          :helptext="direction.helptext"
          :type="direction.type"
          :options="direction.options"
          v-model="model.direction"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import MapInput from '@/components/form-elements/MapInput.vue'

// location form config
const locationDetailsConfig = {
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
    options: ['', 'NW', 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W']
  }
}

export default {
  name: 'LocationDetails',

  components: { MapInput },

  data () {
    return {
      ...locationDetailsConfig,
      latLng: null,
      model: {
        exact_coordinates: null,
        distance: null,
        direction: null
      }
    }
  },

  validations: {
    model: {
      exact_coordinates: { required }
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
