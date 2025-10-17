<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FieldItem } from '@/types';
import { ref, watch } from 'vue';

const props = defineProps<FieldItem>();
const value = ref<string | null>(null);

const emits = defineEmits<{
  (e: 'update', value: any ): void;
}>();

const onInput = (value: string | null) => {
  emits('update', value);
};

watch(value, (newVal) => {
  onInput(newVal);
});

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
            <Select v-bind="componentField" v-model="value">
              <SelectTrigger class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="value in props.props.options" :key="value" :value="value.key">
                    {{ value.value }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
  </Card>
</template>
