<template>
  <div class="d-flex flex-column" id="app">
    <Navbar />
    <router-view v-if="typeof $store.state.user.id !== 'undefined'" />
    <Login v-else />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Login
  },
  watch: {
    $store: {
      handler (value) {
        console.log(value)
      }
    }
  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg-jumbotron {
  background-color: #e9ecef;
}

.br-1 {
  border-radius: 1rem;
}
.br-2 {
  border-radius: 2rem;
}
.br-3 {
  border-radius: 3rem;
}
</style>
