<template>
  <div class="mt-4">
    <label :for="labelFor" class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <p v-if="helptext" class="text-sm text-gray-600">
      {{ helptext }}
    </p>
    <select
      class="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-oxford-lightest focus:border-oxford-lightest sm:text-sm"
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
    >
      <option value=""></option>
      <option
        v-for="(option, key) in options"
        :key="key"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseSelect',
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
    },
    options: {
      type: Array,
      required: true,
      default: () => ['options']
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
