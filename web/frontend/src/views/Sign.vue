<template>
  <div class="bg-jumbotron m-auto p-5 br-1">
    <SignIn v-if="page === 'in'" v-bind:signIn="signIn" v-bind:signUp="() => moveTo('up')"/>
    <SignUp v-else-if="page === 'up'" v-bind:signUp="signUp" v-bind:cancel="() => moveTo('in')"/>
  </div>
</template>

<script>
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

export default {
  name: 'sign',
  components: {
    SignIn,
    SignUp
  },
  data () {
    return {
      page: 'in'
    }
  },
  methods: {
    moveTo (page) {
      this.page = page
    },
    signIn (id, pw) {
      this.$store.commit('signIn', { id, pw, name: '윤석규' })
    },
    signUp (id, pw, name) {
      this.$store.commit('signIn', { id, pw, name })
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
