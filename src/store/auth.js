import { mapGetters, mapState } from 'vuex'

export const authComputed = {
  ...mapGetters('user', ['loggedIn', 'isVerified'])
}

export const user = {
  ...mapGetters('user', ['currentUser'])
}

export const token = {
  ...mapState('user', ['token'])
}
