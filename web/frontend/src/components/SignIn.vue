<template>
  <div class="bg-jumbotron m-auto p-5 br-1">
    <h2>sky-homepage</h2>
    <div class="d-flex">
      <b-form-group class="m-0 mr-1">
        <b-form-input
          ref="id"
          placeholder="아이디를 입력해주세요"
          v-model="id"
          v-on:focus="() => { id = ''}"
          v-on:keydown.enter="() => { $refs.pw.focus() }"/>
        <b-form-input
          ref="pw"
          class="mt-1"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          v-model="pw"
          v-on:focus="() => { pw = ''}"
          v-on:keydown.enter="signIn"
          v-on:keydown.delete="() => {
            if (pw === '') $refs.id.focus()
          }"/>
      </b-form-group>
      <b-btn variant="primary" v-on:click="() => signIn(id, pw)">로그인</b-btn>
      <b-btn class="ml-1" variant="success" v-on:click="() => signUp()">회원가입</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signIn',
  props: {
    signIn: Function,
    signUp: Function
  },
  data () {
    return {
      id: '',
      pw: ''
    }
  },
  mounted () {
    this.$refs.id.focus()
  }
}
</script>

<style scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>
