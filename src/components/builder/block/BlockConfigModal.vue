<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { FieldItem } from "@/types";
import { Icon } from "@iconify/vue";
import { BUILDER_ITEMS, CONDS } from "@/constants/items";
import { useBuilderStore } from "@/stores/builder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { computed, ref } from "vue";

const $builder = useBuilderStore();
const { open, props } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Object as () => FieldItem,
    required: true,
  },
});
const emit = defineEmits({
  "update:open": (value: boolean) => true,
  "update": (value: { [key: string]: any }) => true
});
const name = ref(props.name);
const rules = BUILDER_ITEMS.find(item => item.type === props.builder.type)?.rules || [];
const condKeys = ['visible'] as Partial<keyof FieldItem>[];
const fields = computed(() => {
  return $builder.items.filter(item => item.name !== props.name).map(item => item.name);
});

function toggleModal(value: boolean) {
  if(value === false){
    // validate
    emit('update', { name: name.value });
    // console.log('asd');
  }
  emit('update:open', value);
}

function setCond(key: typeof condKeys[number], del?: boolean) {
  if (!del) {
    emit('update', { [key]: ['', '', ''] });
  } else { // remove condition
    emit('update', { [key]: null });
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="toggleModal">
    <DialogContent class="sm:max-w-md grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ $t('form.settings') + ' ' + props.label }}</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4 overflow-y-auto px-6">
        <div class="grid gap-4">
          <!-- input for name -->
          <div class="flex flex-col gap-1">
            <Label for="name">{{ $t('builder.settings.name') }}</Label>
            <Input type="text" id="name" v-model="name" />
          </div>

           <!-- rules config (minLength, maxLength) -->
           <Label v-if="rules.length" class="-mb-2">{{ $t('builder.settings.rules') }}</Label>
           <div class="grid grid-cols-4 gap-2">
            <template v-for="rule in rules" :key="rule.key">
              <div class="flex flex-col gap-1">
                <Label :for="rule.key" class="font-normal text-xs">{{ $t(`builder.settings.${rule.key}`) }}</Label>
                <Input 
                  :id="rule.key" 
                  v-model="props.rules[rule.key]"
                  v-bind="rule.props"
                />
              </div>
            </template>
              <!-- <div class="flex flex-col gap-1">
                <Label for="minLength" class="font-normal">{{ $t('builder.settings.min') }}</Label>
                <Input type="number" id="minLength" v-model="props.rules.min" min="0" />
              </div>
              <div class="flex flex-col gap-1">
                <Label for="maxLength" class="font-normal">{{ $t('builder.settings.max') }}</Label>
                <Input type="number" id="maxLength" v-model="props.rules.max" min="1" />
              </div> -->
            </div>
            <!-- visible condition logic -->
             <!-- enable conditional logic -->
            <template v-if="fields.length">
            <div v-for="key in condKeys" :key="key" class="flex flex-col gap-2">
              <Label :for="key">{{ $t(`builder.settings.${key}`) }}</Label>
              <div v-if="props[key]" class="flex items-center gap-2">
                <!-- <Input 
                  type="text" 
                  v-model="cond[0]" 
                  :placeholder="$t('builder.settings.field')" 
                  class="flex-1"
                /> -->
                <div class="grid grid-cols-[1fr_0.5fr_1fr] gap-2">
                  <Select v-model="props[key][0]">
                    <SelectTrigger class="w-full">
                      <SelectValue :placeholder="$t('builder.settings.field')" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="value in fields" :key="value" :value="value">
                          {{ value }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select v-model="props[key][1]">
                    <SelectTrigger class="w-full">
                      <SelectValue :placeholder="$t('builder.settings.cond')" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="value in Object.values(CONDS)" :key="value" :value="value">
                          {{ value }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <!-- <Input 
                    type="text" 
                    v-model="cond[1]" 
                    :placeholder="$t('builder.settings.cond')" 
                    class="flex-1"
                  /> -->
                  <Input 
                    type="text" 
                    v-model="props[key][2]" 
                    :placeholder="$t('builder.settings.value')" 
                    class="flex-1"
                  />
                </div>
                <Button variant="outline" class="border-dashed" @click="setCond(key, true)">
                  <Icon icon="mdi:close" />
                </Button>
              </div>
              <Button v-else variant="outline" class="w-full border-dashed" @click="setCond(key)">
                <Icon icon="mdi:plus" />
                {{ $t('common.add') }}
              </Button>
            </div>
            </template>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
