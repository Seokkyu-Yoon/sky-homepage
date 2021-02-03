<template>
  <div class="bg-jumbotron m-auto p-5 br-1">
    <h2>회원가입</h2>
    <b-form-group class="m-0 mr-1">
      <b-form-input
        ref="id"
        placeholder="아이디를 입력해주세요"
        v-model="id"
        v-on:focus="() => { id = '' }"
        v-on:keydown.enter="() => { $refs.pw.focus() }"/>
      <b-form-input
        ref="pw"
        class="mt-1"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        v-model="pw"
        v-on:focus="() => { pw = '' }"
        v-on:keydown.enter="() => { $refs.name.focus() }"/>
      <b-form-input
        ref="name"
        class="mt-1"
        placeholder="이름을 입력해주세요"
        v-model="name"
        v-on:focus="() => { name = '' }"
        v-on:keydown.enter="() => signup(id, pw, name)"/>
      <div class="mt-1">
        <b-btn class="mr-1" variant="primary" v-on:click="() => signup(id, pw, name)">가입</b-btn>
        <b-btn variant="danger" v-on:click="cancel">취소</b-btn>
      </div>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  props: {
    signup: Function,
    cancel: Function
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
  }
}
</script>

<style scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}
</style>
