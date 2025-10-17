<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useFirestore } from '@/composables/useFirestore'
import type { Schema } from './types';
import { onMounted } from 'vue';

const { loading, error, getAll } = useFirestore<Schema>('forms')
onMounted(() => {
  getAll()
})

</script>

<template>
  <div class="min-h-screen bg-background text-foreground container xl:max-w-5xl @container mx-auto ">
    <!-- <nav class="flex gap-4 mb-6 border-b border-gray-200 pb-4 bg-white rounded-lg p-4">
    <template v-for="route in $router.options.routes" :key="route.path">
      <RouterLink
        :to="route.path"
        class="capitalize"
        :class="[ route.name !== $route.name ?
          'text-blue-600 hover:underline': 
          'text-gray-500 font-bold cursor-default' ]"
      >
        {{ route.name ?? route.path }}
      </RouterLink>
    </template>
    </nav> -->
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-muted animate-pulse">
      {{ $t('common.loading') }}
    </div>
    <!-- Error State -->
    <div v-else-if="error" class="text-destructive mt-4 mx-auto text-center">
      {{ error.message }}
    </div>
    <RouterView v-else/>
  </div>
</template>
