<script setup lang="ts">
import { RouterView } from 'vue-router'
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
