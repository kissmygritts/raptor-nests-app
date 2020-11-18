<template>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div id="app" class="h-screen flex overflow-hidden bg-gray-100">
    <sidebar-nav
      :visible="showMobileNav"
      @close="toggleNav()"
    />

    <!-- Page -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Page header -->
      <page-header
        v-if="isHomePage"
        @nav:toggle="toggleNav()"
      />

      <!-- Page content -->
      <main class="flex-1 relative overflow-y-auto focus:outline-none" tabindex="0">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import SidebarNav from '@/components/SidebarNav.vue'

export default {
  components: {
    PageHeader,
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
