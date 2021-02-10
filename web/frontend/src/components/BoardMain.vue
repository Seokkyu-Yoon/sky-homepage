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
      <div class="check-slot"><b-check v-model="checkAll"/></div>
      <div class="d-none d-sm-block upload-at">작성일</div>
      <div class="d-none d-md-block writter">작성자</div>
      <div class="flex-fill title">제목</div>
      <div><b-btn class="btn-sm ml-1" v-visible="false">삭제</b-btn></div>
      <div><b-btn class="btn-sm ml-1" v-visible="false">보기</b-btn></div>
    </div>
    <div class="d-flex flex-column flex-fill px-3 mb-5 overflow-auto">
      <div class="d-flex align-items-center my-1" v-for="board in boards" v-bind:key="board.id">
        <div class="check-slot"><b-check v-on:change="checkOnChange" v-model="board.checked"/></div>
        <div class="d-none d-sm-block upload-at">{{formatter.time(board.uploadAt)}}</div>
        <div class="d-none d-md-block writter">{{board.writter}}</div>
        <div class="flex-fill title title-content">{{board.title}}</div>
        <div><b-btn class="btn-sm ml-1" v-on:click="() => deleteBoard(board.id)">삭제</b-btn></div>
        <div><b-btn class="btn-sm ml-1" v-on:click="() => showBoard(board)">보기</b-btn></div>
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
      },
      checkAll: false
    }
  },
  computed: {
    isAllBoardChecked () {
      return this.boards.every(({ checked }) => checked)
    }
  },
  methods: {
    async getBoard () {
      const { boards = [], count = 0 } = await this.$get('/api/board', { startIndex: this.startIndex })
      this.boards = boards.map((board) => ({ ...board, checked: false }))
      this.startIndex += count
    },
    showBoard (board) {
      console.log(board)
    },
    checkOnChange () {
      this.checkAll = this.isAllBoardChecked
    },
    deleteBoard (boardId) {
      const boardIndex = this.boards.findIndex(({ id }) => id === boardId)
      if (boardIndex < 0) return
      this.boards.splice(boardIndex, 1)
      console.log(boardId)
    },
    deleteBoards () {
      this.boards = this.boards.reduce((bucket, board) => {
        if (board.checked) {
          console.log(board.id)
        } else {
          bucket.push(board)
        }
        return bucket
      }, [])
    }
  },
  beforeMount () {
    this.getBoard()
  },
  watch: {
    checkAll: {
      handler (value) {
        if (value || this.isAllBoardChecked) {
          this.boards = this.boards.map((board) => ({
            ...board,
            checked: value
          }))
        }
      }
    }
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
