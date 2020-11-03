<template>
  <div id="app" class="flex flex-col h-screen">
    <main-nav />
    <router-view class="flex-grow" />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
export default {
  components: {
    MainNav
  }
}
</script>

<style src="./assets/tailwind.css">
