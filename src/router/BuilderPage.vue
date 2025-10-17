<script setup lang="ts">
import { ActionPanel } from '@/components/builder/actionPanel'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useRoute } from 'vue-router'
import { useBuilderStore } from '@/stores/builder'
import { computed, onMounted } from 'vue'
import type { FieldItem } from '@/types'
import { BUILDER_ITEMS } from '@/constants/items'
import { generateFieldName } from '@/lib/utils'
import draggable from "vuedraggable";

const route = useRoute()
const $builder = useBuilderStore()
const formSchema = toTypedSchema(z.object({
  label: z.string().max(50),
}))
const list = computed({
  get: () => $builder.items || [],
  set: (val) => {
    // console.log(val);
    $builder.setItems(val)
  }
})

onMounted(() => {
  const id = route.params.id
  $builder.loadSchema(typeof id === 'string' ? id : undefined)
})

const form = useForm({
  validationSchema: formSchema,
})

const onChange = () => {
  // console.log('Form changed!', form.values)
  $builder.updateMeta(form.values)
}

const getComponent = (item: FieldItem) => {
  const block = BUILDER_ITEMS.find(b => b.props.type === item.type)
  if (!block) throw new Error(`Unknown block type: ${item.type}`)
  return block.component
}

const onUpdateItem = (index: number, value: { [key: string]: any }) => {
  $builder.updateItem(index, value)
}
const duplicateItem = (index: number) => {
  const item = $builder.items[index]
  if (!item) return
  const name = generateFieldName($builder.items, item.type)
  $builder.addItem({ ...item, name })
}
const deleteItem = (index: number) => {
  $builder.deleteItem(index)
}

</script>

<template>
  <div class="px-4 py-10 pb-20 max-w-2xl mx-auto flex flex-col gap-4">
    <form @change="onChange" @input="onChange">
      <FormField v-slot="{ componentField }" name="label">
        <FormItem v-auto-animate>
          <FormControl>
            <Input 
              type="text" 
              class="input-header text-2xl!" 
              :placeholder="$t('placeholder.meta.label')" 
              v-bind="componentField" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </form>

    <draggable
      class="flex flex-col gap-4"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: 'sort'
      }"
      v-model="list"
      v-bind="{
        animation: 200,
        ghostClass: 'opacity-30',
      }"
      handle=".handle"
      item-key="name"
    >
      <template #item="{ element, index }">
        <component 
          :is="getComponent(element)" 
          v-bind="element" 
          @update="onUpdateItem(index, $event)" 
          @duplicate="duplicateItem(index)"
          @delete="deleteItem(index)"
        />
      </template>
    </draggable>

    <div v-if="!list.length" class="text-center text-foreground/50 italic">
      {{ $t('builder.empty') }}
    </div>

    <ActionPanel />
  </div>
</template>