<template>
  <b-navbar variant="primary">
    <div v-if="typeof $store.state.user.id === 'undefined'">로그인이 필요합니다</div>
    <div v-else class="d-flex align-items-center w-100">
      <b-btn
        class="d-none d-sm-block"
        v-for="({path, name}) in $router.options.routes"
        v-bind:key="`radio-${path}`"
        :pressed="path === $router.currentRoute.path"
        v-on:click="() => changeView(path)">
        {{name}}
      </b-btn>
      <b-dropdown class="d-sm-none">
        <b-dropdown-item-button
          v-for="({path, name}) in $router.options.routes"
          v-bind:key="`dropdown-${path}`"
          :active="path === $router.currentRoute.path"
          v-on:click="() => changeView(path)">
          {{name}}
        </b-dropdown-item-button>
      </b-dropdown>
      <div class="flex-fill mx-2 welcome">
        {{$store.state.user.name}}님 환영합니다
      </div>
      <b-btn v-on:click="signOut">logout</b-btn>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    changeView (path) {
      if (path === this.$router.currentRoute.path) return
      this.$router.replace(path)
      this.$forceUpdate()
    },
    signOut () {
      this.$cookies.remove('accessToken')
      this.$store.commit('signout')
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

.welcome {
  text-align: end;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
