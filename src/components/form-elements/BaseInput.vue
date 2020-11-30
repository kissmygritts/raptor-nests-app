<template>
  <div class="mt-4">
    <label :for="labelFor" class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <p v-if="helptext" class="text-sm text-gray-600">
      {{ helptext }}
    </p>
    <input
      class="mt-2 shadow-sm focus:ring-oxford-lightest focus:border-oxford-lightest block w-full rounded sm:text-sm border-gray-300"
      v-bind="$attrs"
      :value="value"
      @input="updateValue"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseInput',
  props: {
    value: {
      type: [String, Number]
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
  computed: {
    labelFor () {
      return this.$attrs.id
    }
  },
  methods: {
    updateValue (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style>

</style>
