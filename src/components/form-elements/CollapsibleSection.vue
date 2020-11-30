<template>
  <div class="border rounded border-gray-700">
    <!-- header, always visible -->
    <div class="flex justify-between items-center">
      <h2 class="inline-block text-lg font-medium leading-6">{{ title }}</h2>
      <button
        class="inline-block h-5 w-5"
        @click="toggleOpen()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- section, visible based on open state -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        class="mt-4 transform"
        v-if="open"
      >
        <slot>Collapsible Section Content</slot>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'CollapsibleSection',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Section Title'
    }
  },
  data () {
    return {
      open: true
    }
  },
  methods: {
    toggleOpen () {
      this.open = !this.open
    }
  }
}
</script>
