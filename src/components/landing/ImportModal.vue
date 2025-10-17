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
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Schema } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter()
const open = ref(false);
const valid = ref(false);
const jsonInput = ref<Schema | null>(null);

const onInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  try {
    jsonInput.value = JSON.parse(target.value);
    if(jsonInput.value && Array.isArray(jsonInput.value.items)) {
      valid.value = true;
    } else {
      valid.value = false;
    }
  } catch (error) {
    // console.error("Invalid JSON:", error);
    valid.value = false;
  }
};
const handleImport = () => {
  if(valid.value && jsonInput.value) {
    // localStorage.setItem('ezform-schema', JSON.stringify(jsonInput.value));
    router.push({ name: 'builder', state: { schema: JSON.stringify(jsonInput.value) } });
    // open.value = false;
  }
};

</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t('landing.feature.import.title') }}</DialogTitle>
        <DialogDescription>
          {{ $t('landing.feature.import.desc') }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid w-full overflow-y-auto px-6 p-2 -my-2">
          <Textarea @input="onInput" />
      </div>
      <DialogFooter class="p-6 pt-0 w-full flex justify-end gap-2">
        <Button size="lg" class="w-full" @click="handleImport" :disabled="!valid">
          {{ $t('common.import') }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
