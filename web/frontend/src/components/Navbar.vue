<template>
  <b-navbar variant="primary">
    <div v-if="typeof $store.state.user.id === 'undefined'">로그인이 필요합니다</div>
    <div v-else class="d-flex align-items-center w-100">
      <b-form-group class="my-auto mr-auto" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          v-model="currRoutePath"
          :options="options"
          :aria-describedby="ariaDescribedby"
          buttons
        />
      </b-form-group>
      {{$store.state.user.name}}님 환영합니다
      <b-btn class="ml-2" v-on:click="signOut">logout</b-btn>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      currRoutePath: this.$router.currentRoute.path,
      options: this.$router.options.routes.map(({ path: value, name: text }) => ({ text, value }))
    }
  },
  methods: {
    signOut () {
      this.$cookies.remove('accessToken')
      this.$store.commit('signout')
    }
  },
  watch: {
    currRoutePath: {
      handler (path) {
        this.$router.replace(path)
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  color: white;
  font-weight: 600;
  height: 54px;
}
</style>
