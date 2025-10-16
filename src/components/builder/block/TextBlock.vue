<script setup lang="ts">

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { FieldItem } from '@/types';
import { Icon } from '@iconify/vue';

const props = defineProps<FieldItem>();

const emits = defineEmits<{
  (e: 'update', value: { [key: string]: string }): void;
}>();

const onInput = (key: keyof FieldItem, value: string) => {
  emits('update', { [key]: value });
};

</script>

<template>
  <Card class="w-full relative pt-2">
    <Button
      size="icon-sm"
      variant="ghost"
      class="absolute top-2 right-1"
    ><Icon icon="mdi:dots-vertical" class="size-5" /></Button>
    <CardContent class="grid gap-4">
      <Input
        type="text"
        class="input-header -ml-2"
        :placeholder="$t('placeholder.question')"
        :default-value="props.label"
        @input="onInput('label', $event.target.value)"
      />
      <Input
        type="text"
        class="text-muted-foreground ring-0!"
        :placeholder="$t('placeholder.text')"
        :default-value="props.placeholder"
        @input="onInput('placeholder', $event.target.value)"
      />
    </CardContent>
  </Card>
</template>
