<script setup lang="ts">
import { ref, onBeforeMount, toRaw, computed } from "vue"

const props = withDefaults(defineProps<{
  options: any[]
  selected: any[]
  placeholder?: string
  isFlexible?: boolean
}>(), {
  placeholder: "Search or add a tag",
  isFlexible: false
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

function selectOptionFiltered() {
  selectedOptions.value.push(filteredOptions.value[0])
  emits("update", toRaw(selectedOptions.value))
}

function removeOption(item: any) {
  selectedOptions.value.splice(selectedOptions.value.findIndex((el: any) => el === item), 1)
  emits("update", toRaw(selectedOptions.value))
}

onBeforeMount(() => {
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
<div 
  id="vue-multiselect"
  :class="[
    'mt-1',
    'shadow-sm',
    'rounded-md',
    {'w-56': !isFlexible},
  ]" 
  v-click-outside="close" 
  @keyup.escape="close" 
  @click="open"
>
  <div 
    :class="[
      'flex justify-between',
      'border',
      'border-gray-200',
      'rounded-tl-md',
      'rounded-tr-md',
      'pb-1',
      {'rounded-bl-md': !isMenuActive || filteredOptions.length === 0},
      {'rounded-br-md': !isMenuActive || filteredOptions.length === 0},
    ]"
  >
    <div class="w-10/12">
      <div v-if="(selectedOptions.length > 0)" class="w-full">
        <div 
          v-for="(s, i) in selectedOptions" 
          :class="[
            'bg-indigo-600',
            'text-white',
            'text-sm',
            'font-[600]',
            'ml-1',
            'rounded-md',
            'shadow-md',
            'whitespace-nowrap',
            'inline-block',
            'h-4',
            'max-w-[80%]'
          ]"
        >
          <div class="flex h-full">
            <div class="overflow-hidden inline-block pl-1 pr-2 leading-none">
              {{s}}
            </div>
            <div 
              :id="'remove-button-' + i"
              class="hover:bg-indigo-800 inline-block rounded-md cursor-pointer" 
              @click.stop="removeOption(s)"
            >
              <div 
                class=" 
                  flex 
                  items-center 
                  h-full
                  text-white 
                  pl-1 
                  pr-1
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="(selectedOptions.length === 0 || isMenuActive)" class="w-full bg-transparent">
        <input 
          type="text" 
          @keyup.enter="selectOptionFiltered"
          v-model="input"
          class="border-none shadow-none outline-none w-full pl-2 text-xs h-4 leading-none bg-transparent focus:outline-none"
          :placeholder="placeholder"
        >
      </div>
    </div>
    <div class="w-5">
      <div class="flex justify-end content-center items-start pr-1 pt-1">
        <svg v-if="isMenuActive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>
  <div 
    v-if="isMenuActive && filteredOptions.length > 0"
    class="
      overflow-hidden 
      border
      border-gray-200 
      border-t-0
      rounded-bl-md
      rounded-br-md
    "
  >
    <div class="overflow-y-auto overflow-x-hidden scrollbar-thin overflow-scroll max-h-24">
      <ul>
        <li 
          v-for="(o, i) in filteredOptions" 
          @click.prevent="selectOption(o)"
          :id="'select-button-' + i"
          class="hover:bg-indigo-600 pl-2 hover:text-white"
        >
          {{o}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
