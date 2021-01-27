<template>
  <div class="bg-jumbotron m-auto p-5 br-1">
    <h2>로그인</h2>
    <div class="d-flex">
      <b-form-group class="m-0 mr-1">
        <b-form-input ref="id" placeholder="아이디를 입력해주세요" v-model="id" v-on:keydown.enter="login"/>
        <b-form-input class="mt-1" type="password" placeholder="비밀번호를 입력해주세요" v-model="pw" v-on:keydown.enter="login"/>
      </b-form-group>
      <b-btn variant="primary" v-on:click="login">로그인</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  methods: {
    login () {
      this.$store.commit('login', { id: this.id, pw: this.pw, name: '윤석규' })
    }
  },
  mounted () {
    this.$refs.id.focus()
  }
}
</script>

<style scoped>

</style>
