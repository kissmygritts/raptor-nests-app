import { mapGetters, mapState } from 'vuex'

export const authComputed = {
  ...mapGetters('user', ['loggedIn', 'isVerified'])
}

export const token = {
  ...mapState('user', ['token'])
}
