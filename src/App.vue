<script setup lang="ts">
import VueMultiselect from "./components/VueMultiselect.vue"
import { VueDatepicker } from "@arxzur/vue-datepicker"

const options = ["word", "long multi word", "verylongsingleword", "another word"]
const selected: any[] = ["word", "another word"]

function printOptions(n: string[]) {
  console.log(n)
}
</script>

<template>
  <VueDatepicker :has-week-numbers="false" />
  <VueMultiselect :options="options" :selected="selected" @update="printOptions" />
</template>
