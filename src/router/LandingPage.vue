<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import ImportModal from '@/components/landing/ImportModal.vue'
import { useFirestore } from '@/composables/useFirestore'
import type { Schema } from '@/types'

const router = useRouter()
const { t } = useI18n()
const $db = useFirestore<Schema>('forms')
const recentForms = ref<{ id: string; name: string }[]>([])

onMounted(() => {
  // Load recent forms from localStorage
  try {
    const raw = localStorage.getItem('lastSchema')
    // console.log(raw);
    if (raw) {
      $db.getAll().then((data) => {
        recentForms.value = raw.split(',').map(id => {
          const form = data.find(f => f.id === id)
          return {
            id,
            name: form?.label || form?.name || `Form ${id}`
          }
        })
      })
    }
  } catch (e) {
    /* ignore */
  }
})

function createNewForm() {
  router.push({ name: 'builder' })
}

function openForm(f: { id: string }) {
  router.push({ name: 'builder', params: { id: f.id } })
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

      <ImportModal>
        <Button size="lg" variant="link" class="cursor-pointer mx-auto text-md">
          <Icon icon="wpf:create-new" />
          {{ t('landing.feature.import.title') }}
        </Button>
      </ImportModal>

      <div class="border-b border-primary py-4 w-full">
        <h3 class="text-lg font-medium">{{ t('landing.feature.recent.title') }}</h3>
        <!-- <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ t('landing.feature.recent.desc') }}</p> -->

        <ul class="mt-4 space-y-2 h-56">
          <li v-for="f in recentForms" :key="f.id">
            <Button @click="openForm(f)" variant="link" size="lg">{{ f.name }}</Button>
          </li>
          <li v-if="!recentForms.length" class="text-sm text-gray-500">{{ t('landing.feature.recent.empty') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
