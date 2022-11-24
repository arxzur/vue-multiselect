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

const isMenuActive = ref(false)

function toggleMenu() {
  isMenuActive.value = ! isMenuActive.value
}

</script>

<template>
  <div
    @click="toggleMenu"
    class="border border-gray-300 w-80"
  >
    <input 
      type="text" 
      v-model="input"
      class="border-none shadow-none outline-none bg-blue-500 w-72"
    >
    <span 
      class="bg-red-500 w-6 float-right"
    >
        <font-awesome-icon icon="fa-solid fa-angle-down" />
    </span>
  </div>
  <div class="scrollbar-thin">
    <ul v-if="isMenuActive">
      <li v-for="o in options">
        {{o}}
      </li>
    </ul>
  </div>
</template>
