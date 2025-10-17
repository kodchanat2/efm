<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { computed, ref } from "vue";
import { Button } from "@/components/ui/button";
import type { Schema } from "@/types";
import { Input } from "@/components/ui/input";
import { useClipboard } from "@vueuse/core";
import { useRoute } from "vue-router";

const $route = useRoute();
const source = computed(() => {
  return window.location.origin + '/form/' + ($route.params.id as string);
});

const { text, copy, copied, isSupported } = useClipboard({ source });

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t('builder.actionPanel.share.title') }}</DialogTitle>
        <DialogDescription>
          {{ $t('builder.actionPanel.share.description') }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid w-full overflow-y-auto px-6 p-2 -my-2">
          <Input v-model="source" readonly />
      </div>
      <DialogFooter class="p-6 pt-0 w-full flex justify-end gap-2">
        <Button size="lg" class="w-full" @click="copy(source)" :disabled="copied">
          {{ $t(`common.${copied ? 'copied' : 'copy'}`) }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
