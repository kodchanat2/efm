<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { FieldItem } from '@/types';

const props = defineProps<FieldItem>();

const emits = defineEmits<{
  (e: 'update', value: any ): void;
}>();

const onInput = (value: string | null) => {
  emits('update', value);
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
            <RadioGroup class="flex flex-col space-y-1" v-bind="componentField">
              <FormItem 
                v-for="value in props.props.options" 
                :key="value.key" 
                class="flex items-center space-y-0 gap-x-3"
                @click="onInput(value.key)"
              >
                <FormControl>
                  <RadioGroupItem :value="value.key" />
                </FormControl>
                <FormLabel class="text-base font-normal">
                  {{ value.value }}
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
  </Card>
</template>
