<template>
  <div class="d-flex flex-fill overflow-hidden">
    <BoardMain v-if="showMain" v-bind:moveToUpsert="moveToUpsert"/>
    <BoardUpsert v-else-if="showUpsert" v-bind:moveToMain="moveToMain"/>
    <div v-else/>
  </div>
</template>

<script>
import BoardMain from '@/components/BoardMain.vue'
import BoardUpsert from '@/components/BoardUpsert.vue'

export default {
  name: 'Board',
  components: {
    BoardMain,
    BoardUpsert
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
