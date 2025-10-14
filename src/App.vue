<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 @container max-w-5xl mx-auto">
    <nav class="flex gap-4 mb-6 border-b border-gray-200 pb-4 bg-white rounded-lg p-4">
    <template v-for="route in $router.options.routes" :key="route.path">
      <RouterLink
        :to="route.path"
        class="capitalize"
        :class="{ 
          'text-blue-600 hover:underline': route.path !== $route.path,
          'text-gray-500 font-bold cursor-default': route.path === $route.path
        }"
      >
        {{ route.name ?? route.path }}
      </RouterLink>
    </template>
    </nav>
    <RouterView />
  </div>
</template>
