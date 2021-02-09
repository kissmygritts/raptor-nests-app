<template>
  <div>
    <label class="block text-lg font-medium tracking-wide text-gray-700">
      {{ label }}
    </label>
    <p v-if="helptext" class="text-sm text-gray-700 font-light">
      {{ helptext }}
    </p>
    <textarea
      class="mt-2 shadow-sm focus:ring-oxford-lightest focus:border-oxford-lightest block w-full rounded sm:text-sm border-gray-300"
      v-bind="$attrs"
      v-model="value"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  name: 'TwTextarea',

  props: {
    value: {
      type: String
    },
    label: {
      type: String,
      required: true,
      default: 'Label'
    },
    helptext: {
      type: String,
      required: false
    }
  },

  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
