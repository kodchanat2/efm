<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1>{{ msg }}</h1>

    <div class="card flex flex-col items-center justify-center">
      <button type="button" class="bg-blue-500 text-white p-2 rounded-md" @click="count++">count is {{ count }}</button>
      <p class="text-sm text-gray-500 flex items-center gap-2">
        <Icon icon="mdi:pencil" />
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Learn more about IDE Support for Vue in the
      <a
        href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
        target="_blank"
        >Vue Docs Scaling up Guide</a
      >.
    </p>
    <p class="text-[#888]">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

