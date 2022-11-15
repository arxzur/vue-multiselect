<script setup lang="ts">
import MultiSelect from "./components/MultiSelect.vue"

const options = ["test 1", "test 2", "test 3", "test 4", "test 5"]

</script>

<template>
  <div class="p-10">
    <MultiSelect :options="options" />
  </div>
</template>

// emit event on select
// filter options
// remove selected option
// click outside
// scroll
