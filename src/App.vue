<template>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div id="app" class="h-screen flex overflow-hidden bg-gray-100">
    <sidebar-nav
      :visible="showMobileNav"
      @close="toggleNav()"
    />
    <router-view @nav:toggle="toggleNav()" />
  </div>
</template>

<script>
// import PageHeader from '@/components/PageHeader.vue'
import SidebarNav from '@/components/SidebarNav.vue'

export default {
  components: {
    // PageHeader,
    SidebarNav
  },

  data () {
    return {
      showMobileNav: false
    }
  },

  computed: {
    isHomePage () {
      return this.$route.path === '/'
    }
  },

  methods: {
    toggleNav () {
      this.showMobileNav = !this.showMobileNav
    }
  }
}
</script>

<style src="./assets/tailwind.css">
