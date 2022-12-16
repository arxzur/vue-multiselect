<script setup lang="ts">
import MultiSelect from "./components/MultiSelect.vue"

const options = ["testtest 1", "testtest 2", "testtest 3", "test 4", "test 5", "test 6", "test 7", "test 8"]
const selected: any[] = ["testtest 1", "test 2asdasdasdasdasdasd"]

function test(n: any) {
  console.log(n)
}
</script>

<template>
  <div class="p-10 w-60">
    <MultiSelect :options="options" :selected="selected" @update="test"/>
  </div>
</template>

// publish
// add tests
