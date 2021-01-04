<template>
  <div class="mt-4">
    <label class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <p v-if="helptext" class="text-sm text-gray-600">
      {{ helptext }}
    </p>
    <textarea
      class="mt-2 shadow-sm focus:ring-oxford-lightest focus:border-oxford-lightest block w-full rounded sm:text-sm border-gray-300"
      v-bind="$attrs"
      v-model="input"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseTextarea',
  props: {
    value: {
      type: [String, Object]
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
  data () {
    return {
      input: this.value ? this.value[this.$attrs.name] : ''
    }
  },
  methods: {
    updateValue (event) {
      const payload = {
        ...this.value
      }
      payload[this.$attrs.name] = event.target.value
      this.$emit('input', payload)
    }
  }
}
</script>
