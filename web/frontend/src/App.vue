<template>
  <div class="d-flex" id="app">
    <div v-if="loading">로딩 중...({{loadingCount}}초 경과)</div>
    <div class="d-flex flex-column flex-fill overflow-hidden" v-else>
      <Navbar />
      <Sign v-if="isShowSign" class="sign"/>
      <router-view v-else />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sign from '@/views/Sign.vue'
import { auth } from '@/core/api-handle'

export default {
  name: 'App',
  components: {
    Navbar,
    Sign
  },
  data () {
    return {
      loading: true,
      loadingCount: 0,
      timeout: undefined
    }
  },
  computed: {
    isShowSign () {
      return typeof this.$store.state.user.id === 'undefined'
    }
  },
  methods: {
    timer () {
      clearTimeout(this.timeout)
      if (!this.loading) return
      this.timeout = setTimeout(() => {
        this.loadingCount += 1
        this.timer()
      }, 1000)
    },
    onLoad () {
      clearTimeout(this.timeout)
      this.loading = false
    },
    async autoLogin (accessToken) {
      const { data: user } = await auth({ accessToken })
      this.$store.commit('signin', user)
    }
  },
  beforeUpdate () {
    const currRouteName = this.$router.currentRoute.name
    const isExistsRoute = this.$router.options.routes.some(({ name }) => name === currRouteName)
    if (isExistsRoute) return
    this.$router.replace('/')
  },
  beforeMount () {
    const accessToken = this.$cookies.get('accessToken') || null
    if (accessToken === null) return this.onLoad()

    this.loadingCount = 0
    this.timer()
    this.autoLogin(accessToken)
      .then(() => this.onLoad())
      .catch((e) => {
        console.error(e)
        this.onLoad()
      })
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
  overflow: hidden;
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

@keyframes shake {
  0% { transform: translate(5px, 0px); }
  10% { transform: translate(-5px, 0px); }
  20% { transform: translate(4px, 0px); }
  30% { transform: translate(-4px, 0px); }
  40% { transform: translate(3px, 0px); }
  50% { transform: translate(-3px, 0px); }
  60% { transform: translate(-2px, 0px); }
  70% { transform: translate(2px, 0px); }
  80% { transform: translate(-1px, 0px); }
  90% { transform: translate(1px, 0px); }
  100% { transform: translate(0px, 0px); }
}
</style>
