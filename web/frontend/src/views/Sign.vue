<template>
  <div class="m-auto">
    <b-alert
      class="mt-2"
      variant="danger"
      :show="dismissCountDown"
      fade
      @dismiss-count-down="dismissChanged"
      @dismissed="dismissed">
      {{alertMessage}}
    </b-alert>
    <div class="m-auto" v-if="page === 'in'">
      <Signin ref="signIn" v-bind:signin="signin" v-bind:signup="() => moveTo('up')"/>
    </div>
    <Signup ref="signUp" v-else-if="page === 'up'" v-bind:signup="signup" v-bind:cancel="() => moveTo('in')"/>
  </div>
</template>

<script>
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'

export default {
  name: 'sign',
  components: {
    Signin,
    Signup
  },
  data () {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      page: 'in',
      alertMessage: ''
    }
  },
  methods: {
    moveTo (page) {
      this.page = page
    },
    signin (id, pw) {
      this.$post('/auth/signin', { id, pw })
        .then(({ data: user }) => {
          this.$store.commit('signin', user)
        })
        .catch(this.showAlert)
    },
    signup (id, pw, name) {
      this.$post('/auth/signup', { id, pw, name })
        .then(({ data: user }) => this.$store.commit('signin', user))
        .catch(this.showAlert)
    },
    showAlert (e) {
      const { code, message } = e.response.data
      this.alertMessage = message

      this.dismissCountDown = this.dismissSecs
      if (this.page === 'in') {
        const { signIn } = this.$refs
        const { $refs: { id, pw } } = signIn

        if (code === 301) return id.focus()
        if (code === 302) return pw.focus()

        signIn.pw = ''
        id.focus()
      } else if (this.page === 'up') {
        const { signUp } = this.$refs
        const { $refs: { id, pw, name } } = signUp

        if (code === 301) return id.focus()
        if (code === 302) return pw.focus()
        if (code === 303) return name.focus()

        signUp.pw = ''
        signUp.name = ''
        id.focus()
      }
    },
    dismissChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    dismissed () {
      this.dismissCountDown = 0
    }
  },
  watch: {
    page: {
      handler () {
        this.dismissCountDown = 0
      }
    }
  }
}
</script>

<style scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>
