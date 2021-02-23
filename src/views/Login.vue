<template>
  <div class="w-full min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"> -->
      <h2 class="mt-6 text-3xl font-extrabold text-gray-700">
        Sign into the Raptor Nest app
      </h2>
      <p class="mt-2 text-sm text-gray-600 max-w">
        Or
        <a href="mailto: mgritts@ndow.org" class="font-medium text-olive hover:text-olive-darker">
          contact Mitchell Gritts
        </a>
        to register for an account.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow rounded sm:px-10">
        <div v-if="loggedIn && !isVerified">
          <p>
            Welcome, your account isn't verified yet. Please contact
            Mitchell Gritts about verifying your account.
          </p>

          <button
            type="button"
            class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-olive-lighter hover:bg-olive-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click.prevent="logout()"
          >
            Logout
          </button>
        </div>

        <form v-else class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div class="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-lighter focus:border-olive-lighter sm:text-sm"
                v-model="username"
              >
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-lighter focus:border-olive-lighter sm:text-sm"
                v-model="password"
              >
            </div>
          </div>

          <div class="">
            <p v-if="error" id="login-errors" class="p-2 font-light text-sm bg-red-100 text-red-700 rounded">
            {{ error }}
          </p>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-olive-lighter hover:bg-olive-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click.prevent="login()"
            >
              Sign in
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import { authComputed } from '@/store/auth.js'

export default {
  name: 'Login',

  data () {
    return {
      username: null,
      password: null,
      error: null
    }
  },

  computed: {
    ...authComputed
  },

  methods: {
    async login () {
      try {
        await this.$store.dispatch('user/loginUser', {
          username: this.username,
          password: this.password
        })

        this.$router.push('/')
      } catch (e) {
        console.error(e)
        this.error = 'Username or Password not found.'
      }
    },

    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
