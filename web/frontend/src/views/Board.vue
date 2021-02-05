<template>
  <div>
    <h1>Board</h1>
    <b-form-group class="mx-5">
      <b-button>글쓰기</b-button>
      <b-input />
      <b-table hover bordered :items="boards" :fields="fields">
      </b-table>
    </b-form-group>

  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      startIndex: 0,
      fields: [
        { key: 'uploadAt', label: '작성일', formatter: (value) => value },
        { key: 'writter', label: '작성자', formatter: (value) => value },
        { key: 'title', label: '제목', formatter: (value) => value }
      ],
      boards: []
    }
  },
  beforeCreate () {
    this.$get('/api/board').then(({ data: { boards, count } }) => {
      this.boards = [
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { uploadAt: new Date(), writter: 'dummy', title: 'test' }
      ]
      this.startIndex += count
    }).catch(console.error)
  }
}
</script>
