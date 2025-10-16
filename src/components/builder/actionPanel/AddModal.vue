<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { BuilderItem } from "@/types";
import { Icon } from "@iconify/vue";

import { ref } from "vue"

const items = ref<BuilderItem[]>([
  { name: "Text", type: "text", icon: "streamline-sharp-color:input-box"},
  { name: "Select", type: "select", icon: "streamline-plump-color:drop-down-menu-flat"},
])


function selectItem(item: BuilderItem) {
  // emit("select", item)
  console.log(item);
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t('builder.actionPanel.add.modal.title') }}</DialogTitle>
        <DialogDescription>
          {{ $t('builder.actionPanel.add.modal.description') }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <div class="grid grid-cols-2 gap-4">
          <template v-for="item in items" :key="item.type">
            <div class="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/10 hover:bg-secondary/30 transition-all hover:shadow cursor-pointer" @click="selectItem(item)">
              <div class="size-16 flex items-center justify-center">
                <Icon v-if="item.icon" :icon="item.icon!" class="text-7xl" />
              </div>
              <span class="font-medium">{{ item.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
