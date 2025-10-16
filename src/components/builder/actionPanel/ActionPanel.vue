<script setup lang="ts">
import AddModal from './AddModal.vue';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useBuilderStore } from '@/stores/builder';
import { Icon } from '@iconify/vue';

const $builder = useBuilderStore();
</script>

<template>
  <div class="fixed bottom-0 sm:bottom-4 left-0 right-0 z-10 sm:w-fit mx-auto p-2 flex justify-between gap-2 sm:rounded-lg shadow-md backdrop-blur-2xl bg-secondary/10">
    <div class="flex items-center gap-2">
      <AddModal>
        <Button variant="outline">
          <Icon icon="ic:outline-add-box" />
          {{ $t('builder.actionPanel.add.button') }}
        </Button>
      </AddModal>
    </div>

    <div class="flex items-center gap-2">
      <Button variant="ghost" size="sm" disabled>
        <Icon icon="mdi:export-variant" />
        <span class="hidden sm:inline">{{ $t('builder.actionPanel.export') }}</span>
      </Button>

      <Button variant="ghost" size="sm" disabled>
        <Icon icon="ic:outline-share" />
        <span class="hidden sm:inline">{{ $t('builder.actionPanel.share') }}</span>
      </Button>
      <Separator orientation="vertical" class="bg-muted-foreground" />
      <Button :disabled="!$builder.hasUnsavedChanges">
        <Icon icon="ic:baseline-save" />
        {{ $t('builder.actionPanel.save') }}
      </Button>
    </div>

  </div>
</template>
