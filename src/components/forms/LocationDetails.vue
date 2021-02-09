<template>
  <!-- form -->
  <div>
    <form @submit.prevent novalidate>
      <map-input
        v-model="latLng"
      />

      <tw-radio
        class="mt-4"
        :label="current_location.label"
        :name="current_location.name"
        :helptext="current_location.helptext"
        :options="current_location.options"
        :has-error="$v.model.current_location.$error"
        :is-invalid="$v.model.current_location.$invalid"
        v-model="model.current_location"
        @blur="$v.model.current_location.$touch()"
        required
      >
        <p v-if="!$v.model.current_location.required">Current Location is a required field.</p>
      </tw-radio>

      <!-- exact location? -->
      <tw-select
        class="mt-4"
        :label="exact_coordinates.label"
        :name="exact_coordinates.name"
        :helptext="exact_coordinates.helptext"
        :options="exact_coordinates.options"
        :has-error="$v.model.exact_coordinates.$error"
        :is-invalid="$v.model.exact_coordinates.$invalid"
        v-model="model.exact_coordinates"
        @blur="$v.model.exact_coordinates.$touch()"
        :required="true"
      >
        <p v-if="!$v.model.exact_coordinates.required">Exact Coordinates is a required field.</p>
      </tw-select>

      <!-- show these fields base on exact location -->
      <div v-if="showLocationModifiers" class="space-y-4 mt-4">
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
import locationDetailsConfig from '@/data/LocationDetailsForm.json'

export default {
  name: 'LocationDetails',

  components: { MapInput },

  data () {
    return {
      ...locationDetailsConfig,
      latLng: null,
      model: {
        exact_coordinates: null,
        current_location: null,
        distance: null,
        direction: null
      }
    }
  },

  validations: {
    model: {
      exact_coordinates: { required },
      current_location: { required }
    }
  },

  computed: {
    output () {
      return {
        ...this.model,
        ...this.latLng
      }
    },

    showLocationModifiers () {
      return this.model.exact_coordinates === 'observation location'
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
