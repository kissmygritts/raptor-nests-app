<template>
  <div>
    <div class="flex items-center space-x-2">
      <label v-if="label" class="block text-lg font-medium tracking-wide text-gray-700">
        {{ label }}
      </label>
      <span v-if="$attrs.required" class="block text-saffron-darker">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>
    </div>
    <p  v-if="helptext" class="text-sm text-gray-700 font-light">
      {{ helptext }}
    </p>

    <select
      class="mt-2 shadow-sm block w-full rounded sm:text-sm border-gray-300"
      :class="validationClasses"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="value === option"
      >
        {{ option }}
      </option>
    </select>

    <!-- error messages -->
    <div v-if="hasError" class="mt-2 py-1 px-2 text-sm font-light bg-red-50 text-red-700 rounded">
      <slot>errors go here</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwSelect',

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number]
    },
    // required: {
    //   type: Boolean,
    //   default: false
    // },
    label: {
      type: String,
      required: false
    },
    helptext: {
      type: String,
      required: false
    },
    options: {
      type: [Array, Object],
      required: true
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false
    },
    isInvalid: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: this.updateValue
      }
    },

    hasErrorOrIsvalid () {
      return this.hasError || !this.isInvalid
    },

    validationClasses () {
      // this works ok
      return this.hasError
        ? 'border-red-700 focus:ring-red-700 focus:border-red-700'
        : this.hasErrorOrIsvalid
          ? 'border-green-600 focus:ring-green-700 focus:border-green-700'
          : 'focus:ring-oxford-lightest focus:border-oxford-lightest'
    }
  },

  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
