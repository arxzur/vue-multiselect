<script setup lang="ts">
import MultiSelect from "./components/MultiSelect.vue"
import { VueDatepicker } from "@arxzur/vue-datepicker"

const options = ["word", "long multi word", "verylongsingleword", "another word"]
const selected: any[] = ["word", "another word"]

function test(n: any) {
  console.log(n)
}
</script>

<template>
  <VueDatepicker :has-week-numbers="false" />
  <MultiSelect :options="options" :selected="selected" @update="test"/>
</template>
