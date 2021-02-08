<template>
  <div class="d-flex flex-column flex-fill px-5 overflow-hidden">
    <h1>Board</h1>
    <div class="d-flex mb-2" inline>
      <div class="d-flex flex-fill">
        <b-button>글쓰기</b-button>
      </div>
      <div>
        <b-form-input placeholder="검색"></b-form-input>
      </div>
      <div class="ml-1">
        <b-button>검색</b-button>
      </div>
    </div>
    <div class="flex-fill mb-5 overflow-auto">
      <div class="row col mb-1">
        <div class="col-2">작성일</div>
        <div class="col-2">작성자</div>
        <div class="col">제목</div>
      </div>
      <div class="row col" v-for="board in boards" v-bind:key="board.id">
        <div class="col-2">{{formatter().time(board.uploadAt)}}</div>
        <div class="col-2">{{board.writter}}</div>
        <div class="col">{{board.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      startIndex: 0,
      boards: []
    }
  },
  methods: {
    formatter () {
      return {
        time: (uploadAt = new Date()) => {
          const year = uploadAt.getFullYear()
          const month = uploadAt.getMonth() + 1
          const date = uploadAt.getDate()
          return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
        }
      }
    }
  },
  beforeCreate () {
    this.$get('/api/board').then(({ data: { boards, count } }) => {
      this.boards = [
        { id: 0, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 1, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 2, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 3, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 4, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 5, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 6, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 7, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 8, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 9, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 10, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 11, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 12, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 13, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 14, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 15, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 16, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 17, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 18, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 19, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 20, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 21, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 22, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 23, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 24, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 25, uploadAt: new Date(), writter: 'dummy', title: 'test' },
        { id: 26, uploadAt: new Date(), writter: 'dummy', title: 'test' }
      ]
      this.startIndex += count
    }).catch(console.error)
  }
}
</script>
