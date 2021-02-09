<template>
  <div class="d-flex flex-fill overflow-hidden">
    <BoardMain v-if="page === 'main'" v-bind:moveToUpsert="moveToUpsert"/>
  </div>
</template>

<script>
import BoardMain from '@/components/BoardMain.vue'

export default {
  name: 'Board',
  components: {
    BoardMain
  },
  data () {
    return {
      page: 'main'
    }
  },
  computed: {
    showMain () {
      return this.pageIs('main')
    },
    showUpsert () {
      return this.pageIs('upsert')
    }
  },
  methods: {
    pageIs (page) {
      return this.page === page
    },
    moveTo (page) {
      this.page = page
    },
    moveToMain () {
      this.moveTo('main')
    },
    moveToUpsert () {
      this.moveTo('upsert')
    }
  }
}
</script>
