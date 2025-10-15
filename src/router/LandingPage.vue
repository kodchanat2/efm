<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'

const router = useRouter()
const { t } = useI18n()

const recentForms = ref<{ id: number; name: string }[]>([])

// Placeholder: try to read recent from localStorage
try {
  const raw = localStorage.getItem('recentForms')
  if (raw) recentForms.value = JSON.parse(raw)
} catch (e) {
  /* ignore */
}

function createNewForm() {
  router.push({ name: 'builder' })
}

function importFromJSON() {
  // Placeholder route; implement later if needed
  router.push({ name: 'builder' })
}

function openForm(f: { id: number }) {
  router.push({ name: 'form', params: { id: String(f.id) } })
}
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-6 py-10">
    <div class="flex-center flex-col gap-2">
      <h1 class="text-2xl sm:text-3xl font-semibold">{{ t('landing.title') }}</h1>
      <p class="text-sm text-foreground/70">{{ t('landing.subtitle') }}</p>
    </div>

    <div class="mt-10 flex-center items-start flex-col-reverse gap-4 w-full max-w-xs mx-auto">
      <Button @click="createNewForm" size="lg" class="cursor-pointer w-full text-md">
        <Icon icon="wpf:create-new" />
        {{ t('landing.feature.newForm.title') }}
      </Button>

      <Button @click="importFromJSON" size="lg" variant="link" class="cursor-pointer mx-auto text-md">
        <Icon icon="wpf:create-new" />
        {{ t('landing.feature.import.title') }}
      </Button>

      <div class="border-b border-primary py-4 w-full">
        <h3 class="text-lg font-medium">{{ t('landing.feature.recent.title') }}</h3>
        <!-- <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ t('landing.feature.recent.desc') }}</p> -->

        <ul class="mt-4 space-y-2 h-56">
          <li v-for="f in recentForms" :key="f.id">
            <button @click="openForm(f)" class="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">{{ f.name }}</button>
          </li>
          <li v-if="!recentForms.length" class="text-sm text-gray-500">{{ t('landing.feature.recent.empty') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
