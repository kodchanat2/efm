<script setup lang="ts">
import { Input } from '@/components/ui/input';
import type { FieldItem } from '@/types';
import Block from './Block.vue';
import { Button } from '@/components/ui/button';

const props = defineProps<FieldItem>()

const emit = defineEmits<{
  update: [value: { [key: string]: string }]
  duplicate: []
  delete: []
}>()

function changeOption(index: number, key: string, value: any) {
  const options = [...(props.props.options || [])];
  options[index] = { ...options[index], [key]: value };
  emit('update', { 'props': { ...props.props, options } });
}

function addOption(index?: number) {
  const options = [...(props.props?.options || [])];
  if (index !== undefined) {
    options.splice(index, 1);
  } else {
    options.push({ key: '', value: '' });
  }
  console.log(options);
  emit('update', { 'props': { ...props.props, options } });
}

</script>

<template>
  <Block v-bind="props" @update="emit('update', $event)" @duplicate="emit('duplicate')" @delete="emit('delete')">
    <div class="flex flex-col w-full max-w-sm">
      <div v-for="(option, index) in props.props?.options" :key="index" class="grid w-full grid-cols-[1fr_0.5fr] gap-2 mt-2">
        <Input
          type="text"
          class="ring-0! max-w-sm"
          :placeholder="$t('placeholder.value')"
          :default-value="option.value"
          @input="changeOption(index, 'value', $event.target.value)"
        />
        <Input
          type="text"
          class="ring-0! border-dashed"
          :placeholder="$t('placeholder.key')"
          :default-value="option.key"
          @input="changeOption(index, 'key', $event.target.value)"
        />
      </div>

      <Button @click="addOption()" variant="outline" class="mt-4 border-dashed">
        {{ $t('common.add') }}
      </Button>
    </div>
  </Block>
</template>
