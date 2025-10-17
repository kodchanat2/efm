<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { FieldItem } from '@/types';

const props = defineProps<FieldItem>();

const emits = defineEmits<{
  (e: 'update', value: { [key: string]: any }): void;
}>();

const onInput = (value: string) => {
  emits('update', { [props.name]: value });
};

</script>

<template>
  <Card class="w-full relative">
    <CardContent class="flex flex-col gap-4 wrap-anywhere">
      <FormField v-slot="{ componentField }" :name="props.name">
        <FormItem v-auto-animate>
          <FormLabel class="text-lg">
            {{  props.label || $t('placeholder.question') }}
            <span v-if="props.rules.required" class="text-destructive">*</span>
          </FormLabel>
          <FormDescription v-if="props.description" class="-mt-2">
            {{ props.description }}
          </FormDescription>
          <FormControl>
            <Input 
              v-bind="componentField"
              type="text" 
              :placeholder="props.placeholder" 
              @input="onInput($event.target.value)"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
  </Card>
</template>
