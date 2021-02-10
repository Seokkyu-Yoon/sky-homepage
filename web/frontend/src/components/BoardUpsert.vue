<template>
  <div class="d-flex flex-fill px-5 flex-column overflow-hidden">
    <div class="text-left mt-5">제목</div>
    <div class="mt-1 mb-2">
      <b-input v-model="inputTitle" placeholder="제목을 입력해주세요"/>
    </div>
    <div class="text-left">설명</div>
    <div class="mt-1 mb-2">
      <b-form-textarea no-resize v-model="inputDescription" placeholder="설명을 입력해주세요"/>
    </div>
    <div class="d-flex flex-column flex-fill mb-2 overflow-hidden">
      <div class="d-flex align-items-center">
        <div class="text-left">파일</div>
        <b-btn class="ml-3">파일첨부</b-btn>
      </div>
      <div class="mt-1 flex-fill overflow-auto">
        <div v-for="(content, idx) in inputContents" v-bind:key="`content-${idx}`">
          {{content}}
        </div>
      </div>
    </div>
    <div class="mt-1 mb-2">
      <b-btn :variant="upsertVariant" v-on:click="upsert">{{upsertText}}</b-btn>
      <b-btn class="ml-1" variant="danger" v-on:click="moveToMain">취소</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardUpsert',
  props: {
    moveToMain: Function,
    id: Number,
    title: String,
    description: String
  },
  data () {
    return {
      inputTitle: this.title || '',
      inputDescription: this.description || '',
      inputContents: []
    }
  },
  computed: {
    isModify () {
      return typeof this.id === 'number'
    },
    upsertVariant () {
      return this.isModify ? 'warning' : 'primary'
    },
    upsertText () {
      return this.isModify ? '수정' : '등록'
    }
  },
  methods: {
    async upsert () {
      await this.$post('/api/board', {
        title: this.inputTitle,
        description: this.inputDescription,
        contents: this.inputContents
      })
      this.moveToMain()
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
