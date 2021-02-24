<template>
  <router-link
    :to="to"
    class="group flex flex-col items-center px-1 py-2 text-xs font-light text-gray-300 focus:outline-none hover:bg-oxford-lighter transition ease-in-out duration-150"
    exact
  >
    <svg class="block h-8 w-8 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <slot />
    </svg>
    <p class="block mt-1">
      {{ linkText }}
    </p>
  </router-link>
</template>

<script>
export default {
  name: 'NavLinkItem_Desktop',

  props: {
    linkText: {
      type: String,
      default: 'Nav Link'
    },

    to: {
      required: true
    }
  }
}
</script>
