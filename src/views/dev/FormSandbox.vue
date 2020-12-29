<template>
  <div class="w-full p-4 text-gray-700 overflow-y-auto">
    <h1 class="h-16 text-2xl text-gray-800">Forms</h1>

    <main>

      <!-- basic inputs -->
      <div class="bg-white p-4 rounded mt-6">
        <h2 class="text-2xl text-gray-800">Base Input Test</h2>
        <p class="pt-1">
          Testing the base input...
        </p>

        <tw-input
          class="mt-6"
          type="text"
          placeholder="Enter title"
          label="Title"
          helptext="Think of a funny title."
          :has-error="$v.title.$error"
          :is-invalid="$v.title.$invalid"
          v-model="title"
          @blur="$v.title.$touch()"
        >
            <p v-if="!$v.title.required">Title is required.</p>
            <p v-if="!$v.title.minLength">Title must be at least 3 characters long.</p>
        </tw-input>

        <pre class="bg-gray-100 p-4 rounded mt-4">{{ { title } }}</pre>
      </div>

      <!-- select inputs -->
      <div class="bg-white p-4 rounded mt-6">
        <h2 class="text-2xl text-gray-800">Select Test</h2>
        <p class="pt-1">
          Testing the select component...
        </p>

        <tw-select
          class="mt-6"
          label="Pick a color"
          helptext="Select a color from the list, no validation"
          :options="['red', 'green', 'blue']"
          v-model="select.simple"
        />

        <tw-select
          class="mt-6"
          label="Pick a color"
          helptext="Select a color from the list, required"
          :options="['', 'red', 'green', 'blue']"
          :has-error="$v.select.withValidation.$error"
          :is-invalid="$v.select.withValidation.$invalid"
          v-model="select.withValidation"
          @blur="$v.select.withValidation.$touch()"
        >
          <p v-if="!$v.select.withValidation.required">This field is required</p>
        </tw-select>

        <pre class="bg-gray-100 p-4 rounded mt-4">{{ {
          select: select.simple,
          withValidation: select.withValidation
        } }}</pre>
      </div>

      <!-- radio inputs -->
      <div class="bg-white p-4 rounded mt-6">
        <h2 class="text-2xl text-gray-800">Base Input Test</h2>
        <p class="pt-1">
          Testing the base input...
        </p>

        <tw-radio
          class="mt-6"
          label="Radio input"
          name="simple_radio"
          helptext="Pick a color from the list"
          :options="['red', 'orange', 'blue']"
          v-model="radio.simple"
        />

        <tw-radio
          class="mt-6"
          label="Radio with validation"
          name="validation_radio"
          helptext="Pick a color from the list"
          :options="['true', 'false']"
          :has-error="$v.radio.withValidation.$error"
          :is-invalid="$v.radio.withValidation.$invalid"
          v-model="radio.withValidation"
          @blur="$v.radio.withValidation.$touch()"
        >
          <p v-if="!$v.radio.withValidation.required">This field is required</p>
        </tw-radio>

        <pre class="bg-gray-100 p-4 rounded mt-4">{{ { ...radio } }}</pre>
      </div>

      <!-- map input -->
      <div class="bg-white p-4 rounded mt-6">
        <h2 class="text-2xl text-gray-800">Map Input Test</h2>
        <p class="pt-1">
          Testing the map input
        </p>

        <map-input
          v-model="map.latLng"
        />

        <pre class="bg-gray-100 p-4 rounded mt-4">{{ { map } }}</pre>
      </div>
    </main>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import MapInput from '@/components/form-elements/MapInput.vue'

export default {
  name: 'FormSandbox',

  components: { MapInput },

  data () {
    return {
      title: 'Big Green Egg',
      select: {
        simple: '',
        withValidation: ''
      },
      radio: {
        simple: 'red',
        withValidation: null
      },
      map: {
        latLng: { lat: 40, lng: 0 }
      }
    }
  },

  validations: {
    title: {
      required,
      minLength: minLength(4)
    },
    select: {
      withValidation: {
        required
      }
    },
    radio: {
      withValidation: {
        required
      }
    }
  },

  computed: {
    errorMessages () {
      return this.$v.title.messages
    }
  }
}
</script>
