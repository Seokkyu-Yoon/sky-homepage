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
        <b-button variant="info">검색</b-button>
      </div>
    </div>
    <div class="d-flex align-items-center py-2 px-3">
      <div class="check-slot"><b-check v-model="checkAll" :disabled="myBoards.length === 0"/></div>
      <div class="d-none d-sm-block upload-at">작성일</div>
      <div class="d-none d-md-block writter">작성자</div>
      <div class="flex-fill title">제목</div>
      <div><b-btn class="btn-sm ml-1" v-visible="false">삭제</b-btn></div>
      <div><b-btn class="btn-sm ml-1" v-visible="false">보기</b-btn></div>
    </div>
    <div class="d-flex flex-column flex-fill px-3 mb-5 overflow-auto">
      <div class="d-flex align-items-center my-1" v-for="board in boards" v-bind:key="board.id">
        <div class="check-slot"><b-check v-visible="isWritter(board)" v-on:change="checkOnChange" v-model="board.checked"/></div>
        <div class="d-none d-sm-block upload-at">{{formatter.time(board.uploadAt)}}</div>
        <div class="d-none d-md-block writter">{{board.writter}}</div>
        <div class="flex-fill title title-content">{{board.title}}</div>
        <div><b-btn class="btn-sm ml-1" variant="danger" v-visible="isWritter(board)" v-on:click="() => deleteBoard(board)">삭제</b-btn></div>
        <div><b-btn class="btn-sm ml-1" variant="info" v-on:click="() => showBoard(board)">보기</b-btn></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBoard, removeBoard } from '@/core/api-handle'

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
    myBoards () {
      return this.boards.filter(this.isWritter)
    },
    isAllBoardChecked () {
      return this.myBoards.every(({ checked }) => checked)
    }
  },
  methods: {
    async getBoard () {
      const { boards = [], count = 0 } = await getBoard({ startIndex: this.startIndex })
      this.boards = boards.map((board) => ({ ...board, checked: false }))
      this.startIndex += count
    },
    showBoard (board) {
      console.log(board)
    },
    checkOnChange () {
      this.checkAll = this.isAllBoardChecked
    },
    isWritter (board) {
      return this.$store.state.user.name === board.writter
    },
    async deleteBoard (board) {
      if (!this.isWritter(board)) return
      const boardIndex = this.boards.findIndex(({ id }) => id === board.id)

      if (boardIndex < 0) return
      const target = this.boards[boardIndex]
      console.log(target)
      await removeBoard({ id: target.id, writter: this.$store.state.user.name })
      this.boards.splice(boardIndex, 1)
    },
    async deleteBoards () {
      const { boards, removes } = this.boards.reduce((bucket, board) => {
        if (board.checked && this.isWritter(board)) {
          bucket.removes.push(board)
        } else {
          bucket.boards.push({ ...board, checked: false })
        }
        return bucket
      }, { boards: [], removes: [] })

      await Promise.all(
        removes.map((target) => removeBoard({
          id: target.id,
          writter: this.$store.state.user.name
        }))
      )

      this.boards = boards
      this.checkAll = false
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
