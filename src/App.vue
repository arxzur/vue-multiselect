<script setup lang="ts">
import VueMultiselect from "./components/VueMultiselect.vue"
import { VueDatepicker } from "@arxzur/vue-datepicker"

const options = ["word", "long multi word", "verylongsingleword", "another word"]
const selected: any[] = ["word", "another word"]

function test(n: any) {
  console.log(n)
}
</script>

<template>
  <div class="p-10">
    <VueDatepicker :has-week-numbers="false" />
    <br>
    <VueMultiselect :options="options" :selected="selected" @update="test" />

  </div>
</template>
