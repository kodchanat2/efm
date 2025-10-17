<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useBuilderStore } from "@/stores/builder";
import { useClipboard } from "@vueuse/core";

const $builder = useBuilderStore();
const { copy, copied, isSupported } = useClipboard({ source: JSON.stringify($builder.schema) });
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[80dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t('builder.actionPanel.export.title') }}</DialogTitle>
        <DialogDescription>
          <div class="flex justify-between items-center">
            {{ $t('builder.actionPanel.export.description') }}
            <div v-if="isSupported">
              <Button size="sm" @click="copy(JSON.stringify($builder.schema))">
                {{ $t(`common.${copied ? 'copied' : 'copy'}`) }}
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 overflow-y-auto px-6">
        <div class="grid gap-4 border-border border p-2 rounded bg-muted/10">
          <VueJsonPretty 
            :data="$builder.schema" 
            :show-root="false" 
            :collapsedOnClickBrackets="false"
            :showLine="false"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
