<script setup lang="ts">
import { ref } from "vue"

const props = withDefaults(defineProps<{
  options: any[]
  selected?: any[]
  placeholder?: string
}>(), {
  placeholder: "Select",
})

const input = ref("")

</script>

<template>
  <div
    class="border border-gray-300 object-fill"
  >
    <input 
      type="text" 
      v-model="input"
      class="border-none shadow-none outline-none bg-blue-500"
    >
    <span class="bg-red-500 w-24 float-right">test</span>
  </div>
  <ul>
    <li v-for="o in options">
      {{o}}
    </li>
  </ul>
</template>
