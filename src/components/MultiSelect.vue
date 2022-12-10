<script setup lang="ts">
import { ref, onMounted, toRaw } from "vue"

const props = withDefaults(defineProps<{
  options: any[]
  selected: any[]
  placeholder?: string
}>(), {
  placeholder: "Select",
})

const emits = defineEmits({
  update(o) {
    return o
  }
})

const input = ref("")
const isMenuActive = ref(false)
const selectedOptions = ref()

function toggleMenu() {
  isMenuActive.value = ! isMenuActive.value
}

function selectOption(item: any) {
  selectedOptions.value.push(item)
  emits("update", toRaw(selectedOptions.value))
}

function removeOption(item: any) {
  selectedOptions.value.splice(selectedOptions.value.findIndex((el: any) => el === item), 1)
  emits("update", toRaw(selectedOptions.value))
}

onMounted(() => {
  selectedOptions.value = props.selected
})
</script>

<template>
  <div
    @click="toggleMenu"
    class="border border-gray-500 w-full"
  >
    <div v-if="selectedOptions.length" class="pb-2">
      <span 
        v-for="s in selectedOptions"
        :key="s"
        class="bg-emerald-500 text-white text-xs p-1 ml-2 mt-2 rounded-md inline-block"
      >
        {{s}}
        <span
          @click.stop="removeOption(s)"
        >
          <font-awesome-icon 
          :icon="['fa', 'xmark']" 
          class="ml-1 text-gray-600 text-[0.6rem] pl-1 pr-1"
          />
        </span>
      </span>
    </div>
    <input 
      type="text" 
      v-model="input"
      class="border-none shadow-none outline-none bg-blue-500 w-11/12 pl-1"
      :placeholder="placeholder"
    >
    <span 
      class="bg-red-500 w-1/12 inline-block"
    >
        <font-awesome-icon :icon="['fa', 'angle-down']"  class="text-xs"/>
    </span>
  </div>
  <div 
    class="scrollbar-thin max-h-12 overflow-scroll overflow-x-hidden border border-gray-500 pl-1"
  >
    <ul v-if="isMenuActive">
      <li 
        v-for="o in options"
        @click.prevent="selectOption(o)"
      >
        {{o}}
      </li>
    </ul>
  </div>
</template>
