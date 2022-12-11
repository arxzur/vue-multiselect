<script setup lang="ts">
import { toRaw } from "vue";
import MultiSelect from "./components/MultiSelect.vue"

const options = ["test 1", "test 2", "test 3", "test 4", "test 5"]
const selected: any[] = ["test 1", "test 2"]

function test(n: any) {
  console.log(n)
}
</script>

<template>
  <div class="p-10 w-96">
    <MultiSelect :options="options" :selected="selected" @update="test"/>
  </div>
</template>

// search on type
// select on enter key
// click outside
// pretty UI
