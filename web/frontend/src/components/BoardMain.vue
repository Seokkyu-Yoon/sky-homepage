<template>
  <div class="d-flex flex-fill px-5 flex-column overflow-hidden">
    <div class="d-flex my-3" inline>
      <div class="d-flex flex-fill">
        <b-button variant="success" v-on:click="moveToUpsert">글쓰기</b-button>
        <b-button class="ml-1" variant="danger" v-on:click="deleteBoards">삭제</b-button>
      </div>
      <div class="mx-1">
        <b-form-input placeholder="검색"></b-form-input>
      </div>
      <div>
        <b-button>검색</b-button>
      </div>
    </div>
    <div class="d-flex align-items-center py-2 px-3">
      <div class="check-slot"><b-check /></div>
      <div class="upload-at">작성일</div>
      <div class="writter">작성자</div>
      <div class="flex-fill title">제목</div>
      <div><b-btn class="btn-sm ml-1">보기</b-btn></div>
    </div>
    <div class="d-flex flex-column flex-fill px-3 mb-5 overflow-auto">
      <div class="d-flex align-items-center my-1" v-for="board in boards" v-bind:key="board.id">
        <div class="check-slot"><b-check /></div>
        <div class="upload-at">{{formatter.time(board.uploadAt)}}</div>
        <div class="writter">{{board.writter}}</div>
        <div class="flex-fill title title-content">{{board.title}}</div>
        <div><b-btn class="btn-sm ml-1">보기</b-btn></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardMain',
  props: {
    moveToUpsert: Function
  },
  data () {
    return {
      startIndex: 0,
      boards: [],
      formatter: {
        time: (uploadAt = new Date()) => {
          const year = uploadAt.getFullYear()
          const month = uploadAt.getMonth() + 1
          const date = uploadAt.getDate()
          return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
        }
      }
    }
  },
  methods: {
    deleteBoards () {

    }
  },
  beforeCreate () {
    this.$get('/api/board').then(({ boards = [], count = 0 }) => {
      this.boards = [
        { id: 0, uploadAt: new Date(), writter: 'dummy', title: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest' },
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

<style scoped>
.check-slot {
  min-width: 1.5rem;
}
.upload-at {
  min-width: 6rem;
}
.writter {
  min-width: 8rem;
}
.title {
  min-width: 10rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
}
.title-content {
  text-overflow: ellipsis;
}

.btn {
  white-space: nowrap;
}
</style>
