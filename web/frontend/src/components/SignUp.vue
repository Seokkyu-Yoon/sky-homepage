<template>
  <div class="bg-jumbotron m-auto p-5 br-1">
    <h2>회원가입</h2>
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
        v-on:keydown.enter="$refs.name.focus"/>
      <b-form-input
        ref="name"
        class="mt-1"
        placeholder="이름을 입력해주세요"
        v-model="name"
        v-on:focus="resetName"
        v-on:keydown.enter="enter"/>
      <div class="mt-1">
        <b-btn class="mr-1" variant="primary" v-on:click="enter">가입</b-btn>
        <b-btn variant="danger" v-on:click="moveToSignin">취소</b-btn>
      </div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  props: {
    signup: Function,
    moveToSignin: Function
  },
  data () {
    return {
      id: '',
      pw: '',
      name: ''
    }
  },
  mounted () {
    this.$refs.id.focus()
  },
  methods: {
    resetId () {
      this.id = ''
    },
    resetPw () {
      this.pw = ''
    },
    resetName () {
      this.name = ''
    },
    enter () {
      this.signup(this.id, this.pw, this.name)
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
