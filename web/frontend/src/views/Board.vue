<template>
  <div>
    <h1>Board</h1>
    <b-button>글쓰기</b-button>
    <b-table :items="boards" :fields="fields"></b-table>
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
      this.boards = []
      this.startIndex += count
    }).catch(console.error)
  }
}
</script>
