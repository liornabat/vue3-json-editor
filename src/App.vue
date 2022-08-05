<template>
  <div class="example-json">
    <div class="example-demo">{{content}}</div>
    <Vue3JsonEditor v-model="content"/>
    <button type="button" @click="resetJson">reset</button>
  </div>
</template>

<script  setup lang="ts">
import { reactive, ref } from 'vue'
import { Vue3JsonEditor } from '../components/vue3-json-editor'
const content = ref()

</script>

<style lang="scss">

</style>
