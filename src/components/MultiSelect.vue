<script setup lang="ts">
import { ref, onMounted, toRaw, computed } from "vue"

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

const filteredOptions = computed(() => {
  let temp = []
  let includes = false
  for (let o of props.options) {
    if (selectedOptions.value) {
      for (let s of selectedOptions.value) {
        if (o === s) {
          includes = true
          break
        }
      }
    }
    if (!includes) {
      temp.push(o)
    }
    includes = false
  }
  return temp.filter((o) => o.toLowerCase().includes(input.value.toLowerCase()))
})

function open() {
  isMenuActive.value = true
}

function close() {
  isMenuActive.value = false
}

function selectOption(item: any) {
  selectedOptions.value.push(item)
  emits("update", toRaw(selectedOptions.value))
}

function selectOptionTop() {
  console.log("test")
  selectedOptions.value.push(filteredOptions.value[0])
  emits("update", toRaw(selectedOptions.value))
}

function removeOption(item: any) {
  selectedOptions.value.splice(selectedOptions.value.findIndex((el: any) => el === item), 1)
  emits("update", toRaw(selectedOptions.value))
}

onMounted(() => {
  selectedOptions.value = props.selected
})

const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = function (event: any) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el)
      }
    }
    document.body.addEventListener("click", el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.body.removeEventListener("click", el.clickOutsideEvent)
  },
}
</script>

<template>


  <div class="m-10 w-40 flex">
    <div>
      <div class="bg-blue-500 ">
        test
      </div>
    </div>
    <div class="flex justify-end content-center items-center w-20 h-20  bg-green-500">
      <div class="bg-red-500">
        test
      </div>

    </div>
  </div>


  <div
    v-click-outside="close"
    @keyup.escape="close"
    @click="open"
  >
    <div
      class="border border-gray-500 w-full"
    >
      <div v-if="selectedOptions" class="pb-2">
        <span 
          v-for="s in selectedOptions"
          class="bg-emerald-500 text-white text-sm ml-2 mt-2 rounded-md inline-block"
        >
          {{s}}
          <span
            @click.stop="removeOption(s)"
            class="bg-emerald-600"
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
        @keyup.enter="selectOptionTop"
        v-model="input"
        class="border-none shadow-none outline-none w-11/12 pl-2 text-sm"
        :placeholder="placeholder"
      >
      <span 
        class="w-1/12 inline-block"
      >
          <font-awesome-icon :icon="['fa', 'angle-down']"  class="text-xs"/>
      </span>
    </div>
    <div 
      class="scrollbar-thin max-h-12 overflow-scroll overflow-x-hidden border border-gray-500 pl-1"
    >
      <ul v-if="isMenuActive">
        <li 
          v-for="o in filteredOptions"
          @click.prevent="selectOption(o)"
        >
          {{o}}
        </li>
      </ul>
    </div>
  </div>
</template>
