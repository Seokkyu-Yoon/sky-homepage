<template>
  <div class="d-flex flex-column flex-fill">
    <b-alert
      class="mt-5 alert"
      variant="danger"
      :show="dismissCountDown"
      fade
      @dismiss-count-down="dismissChanged"
      @dismissed="dismissed">
      {{alertMessage}}
    </b-alert>
      <Signin
        v-if="showSignin"
        ref="signin"
        v-bind:signin="signin"
        v-bind:moveToSignup="moveToSignup"/>
      <Signup
        v-else-if="showSignup"
        ref="signup"
        v-bind:signup="signup"
        v-bind:moveToSignin="moveToSignin"/>
      <div v-else />
  </div>
</template>

<script>
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'
import { signin, signup } from '@/core/api-handle'

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
  computed: {
    showSignin () {
      return this.pageIs('in')
    },
    showSignup () {
      return this.pageIs('up')
    }
  },
  methods: {
    pageIs (page) {
      return this.page === page
    },
    moveTo (page) {
      this.page = page
    },
    moveToSignup () {
      this.moveTo('up')
    },
    moveToSignin () {
      this.moveTo('in')
    },
    async signin (id, pw) {
      try {
        const data = await signin({ id, pw })
        this.successToSign(data)
      } catch (e) {
        this.failToSignin(e)
      }
    },
    async signup (id, pw, name) {
      try {
        const data = await signup({ id, pw, name })
        this.successToSign(data)
      } catch (e) {
        this.failToSignup(e)
      }
    },
    showAlert (message) {
      this.alertMessage = message
      this.dismissCountDown = this.dismissSecs
    },
    dismissChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    dismissed () {
      this.dismissCountDown = 0
    },
    successToSign ({ data: user }) {
      this.$store.commit('signin', user)
    },
    failToSignin ({ code, message }) {
      this.showAlert(message)

      const { signin } = this.$refs
      const { $refs: { id, pw } } = signin

      if (code === 301) return id.focus()
      if (code === 302) return pw.focus()
      signin.resetPw()
      id.focus()
    },
    failToSignup ({ code, message }) {
      this.showAlert(message)

      const { signup } = this.$refs
      const { $refs: { id, pw, name } } = signup

      if (code === 301) return id.focus()
      if (code === 302) return pw.focus()
      if (code === 303) return name.focus()

      signup.resetPw()
      signup.resetName()
      id.focus()
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
.alert {
  position: absolute;
  left: 33%;
  right: 33%;
}
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>
