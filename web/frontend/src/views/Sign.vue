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
      this.$get('/api/sign', { id, pw }).then(({ data: user }) => {
        this.$store.commit('signIn', user)
      }).catch(console.log)
    },
    signUp (id, pw, name) {
      this.$post('/api/sign', { id, pw, name }).then(() => {
        this.$store.commit('signIn', { id, name })
      }).catch(console.log)
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
