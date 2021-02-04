<template>
  <div class="bg-jumbotron m-auto p-5 br-1">
    <div>
      <h2>sky-homepage</h2>
      <div class="d-flex">
        <b-form-group class="m-0 mr-1">
          <b-form-input
            ref="id"
            placeholder="아이디를 입력해주세요"
            v-model="id"
            v-on:focus="resetId"
            v-on:keydown.enter="$refs.pw.focus"/>
          <b-form-input
            ref="pw"
            class="mt-1"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="pw"
            v-on:focus="resetPw"
            v-on:keydown.enter="enter"/>
        </b-form-group>
        <b-btn variant="primary" v-on:click="enter">로그인</b-btn>
        <b-btn class="ml-1" variant="success" v-on:click="moveToSignup">회원가입</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signIn',
  props: {
    signin: Function,
    moveToSignup: Function
  },
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  mounted () {
    const { id } = this.$refs
    id.focus()
  },
  methods: {
    resetId () {
      this.id = ''
    },
    resetPw () {
      this.pw = ''
    },
    enter () {
      this.signin(this.id, this.pw)
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
