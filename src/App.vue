<template>
  <div id="app">
    <main-nav />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
    </div> -->
    <router-view/>
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
