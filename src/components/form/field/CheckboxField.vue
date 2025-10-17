<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { FieldItem } from '@/types';
import { ref } from 'vue';

const props = defineProps<FieldItem>();
const value = ref<string[] | null>(null);

const emits = defineEmits<{
  (e: 'update', value: any ): void;
}>();

const onInput = (value: any | null) => {
  emits('update', value);
};

</script>

<template>
  <Card class="w-full relative">
    <CardContent class="flex flex-col gap-4 wrap-anywhere">
      <FormField :name="props.name" >
        <FormItem v-auto-animate>
          <FormLabel class="text-lg">
            {{  props.label || $t('placeholder.question') }}
            <span v-if="props.rules.required" class="text-destructive">*</span>
          </FormLabel>
          <FormDescription v-if="props.description" class="-mt-2">
            {{ props.description }}
          </FormDescription>

          <FormField v-for="item in props.props.options" :key="item.key" type="checkbox" :value="item.key" :unchecked-value="false" :name="props.name">
            <FormItem class="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  :model-value="(value || []).includes(item.key)"
                  @update:model-value="checked => {
                    let newValue = value ? [...value] : [];
                    if (checked) {
                      newValue.push(item.key);
                    } else {
                      newValue = newValue.filter(v => v !== item.key);
                    }
                    value = newValue;
                    onInput(newValue);
                  }"
                />
              </FormControl>
              <FormLabel class="font-normal">
                {{ item.value }}
              </FormLabel>
            </FormItem>
          </FormField>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
  </Card>
</template>
