<script setup lang="ts">
import { Input } from '@/components/ui/input';
import type { FieldItem } from '@/types';
import Block from './Block.vue';

const props = defineProps<FieldItem>()

const emit = defineEmits<{
  update: [value: { [key: string]: string }]
  duplicate: []
  delete: []
}>()

function onInput(key: string, value: any) {
  emit('update', { [key]: value })
}

</script>

<template>
  <Block v-bind="props" @update="emit('update', $event)" @duplicate="emit('duplicate')" @delete="emit('delete')">
    <Input
      type="text"
      class="text-muted-foreground ring-0! max-w-sm"
      :placeholder="$t('placeholder.text')"
      :default-value="props.placeholder"
      @input="onInput('placeholder', $event.target.value)"
    />
  </Block>
</template>
