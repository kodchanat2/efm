<script setup lang="ts">

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import type { FieldItem } from '@/types';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const props = defineProps<FieldItem>();

const emits = defineEmits<{
  (e: 'update', value: { [key: string]: string }): void;
  (e: 'duplicate'): void;
  (e: 'delete'): void;
}>();

const onInput = (key: keyof FieldItem, value: any) => {
  emits('update', { [key]: value });
};

</script>

<template>
  <Card class="w-full pt-2 relative">
    <Icon icon="mdi:drag" class="size-5 handle absolute left-0 top-0 h-full cursor-move hover:bg-secondary/10" />
    <CardContent class="flex flex-col gap-4">
      <Input
        type="text"
        class="input-header text-lg! pl-1"
        :placeholder="$t('placeholder.question')"
        :default-value="props.label"
        @input="onInput('label', $event.target.value)"
      />
      <Input
        type="text"
        class="input-header font-normal! pl-1 -mt-4 border-b-0!"
        :placeholder="$t('placeholder.description')"
        :default-value="props.description"
        @input="onInput('description', $event.target.value)"
      />
      <div class="flex flex-col sm:flex-row gap-2 justify-between">
        <Input
          type="text"
          class="text-muted-foreground ring-0! max-w-sm"
          :placeholder="$t('placeholder.text')"
          :default-value="props.placeholder"
          @input="onInput('placeholder', $event.target.value)"
        />

        <div class="flex items-center justify-between gap-2">
          <Separator orientation="vertical" class="hidden sm:block mr-2" />
          <div class="flex items-center gap-2">
            <Label :for="`require_${props.name}`" class="font-normal">{{ $t('form.required') }}</Label>
            <Switch 
              :id="`require_${props.name}`" 
              :model-value="!!props.rules.required"
              @update:model-value="onInput('rules', { ...props.rules, required: $event })"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                size="icon-sm"
                variant="ghost"
                 class="-mr-2"
              >
                <Icon icon="mdi:dots-vertical" class="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent :align="'end'">
              <!-- <DropdownMenuItem>
                <Icon icon="ic:outline-settings" class="size-4 mr-2" />
                {{ $t('form.settings') }}
              </DropdownMenuItem>
              <DropdownMenuSeparator /> -->
              <DropdownMenuItem @click="emits('duplicate')">
                <Icon icon="ic:round-content-copy" class="size-4 mr-2" />
                {{ $t('form.duplicate') }}
              </DropdownMenuItem>
              <DropdownMenuItem @click="emits('delete')" class="text-destructive-foreground">
                <Icon icon="ic:baseline-delete-forever" class="size-4 mr-2" />
                {{ $t('form.delete') }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
