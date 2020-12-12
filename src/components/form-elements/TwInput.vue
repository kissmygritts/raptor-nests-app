<template>
  <div>
    <label v-if="label" class="block text-lg font-medium tracking-wide text-gray-700">
      {{ label }}
    </label>
    <p  v-if="helptext" class="text-sm text-gray-700 font-light">
      {{ helptext }}
    </p>

    <input
      class="mt-2 shadow-sm focus:ring-oxford-lightest focus:border-oxford-lightest block w-full rounded sm:text-sm border-gray-300"
      :class="validationClasses"
      v-bind="$attrs"
      v-on="listeners"
    >

    <!-- error messages -->
    <div v-if="hasError" class="mt-2 py-1 px-2 text-sm font-light bg-red-50 text-red-700 rounded">
      <slot>errors go here</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TwInput',

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: false
    },
    helptext: {
      type: String,
      required: false
    },
    hasError: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    },

    validationClasses () {
      return this.hasError ? 'border-red-600' : ''
    }
  },

  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
