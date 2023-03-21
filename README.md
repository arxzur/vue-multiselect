# vue-multiselect

A Vue multiselect component. See [demo here](https://codesandbox.io/s/confident-oskar-y6q6lo) and [source here](https://gitlab.com/arxzur/vue-multiselect/).

## Install

```sh
npm i @arxzur/vue-multiselect
```

## Basic usage

### Import component styles

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import "@arxzur/vue-multiselect/dist/index.css";

createApp(App).mount("#app");
```

### Import Vue component

```ts
// App.vue
<script setup lang="ts">
import { VueMultiselect } from "@arxzur/vue-multiselect"

function printOptions(n: string[]) {
  console.log(n)
}
</script>

<template>
    <VueMultiselect :options="['one', 'two', 'three']" :selected="[]" @update="printOptions" />
</template>
```

## Available props

Chose from following props

```ts
const props = withDefaults(defineProps<{
  options: any[]            // Dropdown menu options
  selected: any[]           // Pre-selected options
  placeholder?: string      // Placeholder text in search field
  isFlexible?: boolean      // Flexible width toggle
}>(), {
  placeholder: "Search or add a tag",
  isFlexible: false
})
```

## Events emitted

`@update` will emit an array of currently selected options whenever an option is selected or removed.

## Contribute

For contact, bug reports see [repo here](https://gitlab.com/arxzur/vue-multiselect/).

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build in library mode

```sh
npm run build:lib
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:run
```

## Licence

This component is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT/).
