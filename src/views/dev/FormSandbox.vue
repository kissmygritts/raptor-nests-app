<template>
  <div class="w-full p-4 text-gray-700 overflow-y-auto">
    <h1 class="h-16 text-2xl text-gray-800">Forms</h1>

    <main>

      <!-- functionality container -->
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
          v-model="title"
          @blur="$v.title.$touch()"
        >
            <p v-if="!$v.title.required">This field is required</p>
            <p v-if="!$v.title.minLength">Must be at least 3 characters</p>
        </tw-input>

        <pre class="bg-gray-100 p-4 rounded mt-4">{{ { title } }}</pre>
      </div>
    </main>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'FormSandbox',

  data () {
    return {
      title: ''
    }
  },

  validations: {
    title: {
      required,
      minLength: minLength(4)
    }
  },

  computed: {
    errorMessages () {
      return this.$v.title.messages
    }
  }
}
</script>
