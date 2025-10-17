<script setup lang="ts">
import { ActionPanel } from '@/components/builder/actionPanel'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useRoute, useRouter } from 'vue-router'
import { useBuilderStore } from '@/stores/builder'
import { computed, onMounted, watch } from 'vue'
import type { FieldItem, Schema } from '@/types'
import { BUILDER_ITEMS } from '@/constants/items'
import { generateFieldName } from '@/lib/utils'
import draggable from "vuedraggable";
import { useFirestore } from '@/composables/useFirestore'

const route = useRoute()
const router = useRouter()
const $builder = useBuilderStore()
const $db = useFirestore<Schema>('forms')
const formSchema = toTypedSchema(z.object({
  label: z.string().max(50),
  description: z.string().max(200).optional().nullable(),
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
  if(id) {
    $db.getAll().then((data) => { // Ensure data is loaded
      // console.log(data);
      const form = data.find(f => f.id === id)
      if (!form) {
        console.error('Form not found')
        router.push({ name: 'builder' })
        return
      }
      $builder.loadSchema(form)
    })
  } else if (window.history.state.schema) {
    $builder.loadSchema(JSON.parse(window.history.state.schema))
  } else {
    $builder.loadSchema()
  }
})

watch(
  () => $builder.schema,
  (newSchema) => {
    if (newSchema) {
      form.setValues({
        label: newSchema.label || '',
        description: newSchema.description || '',
      })
    }
  },
  { immediate: true }
)

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
  <div v-if="$builder.schema" class="px-4 py-10 pb-20 max-w-2xl mx-auto flex flex-col gap-4">
    <form @submit="e=>e.preventDefault()" @change="onChange" @input="onChange" >
      <FormField v-slot="{ componentField }" name="label">
        <FormItem v-auto-animate>
          <FormControl>
            <Input 
              type="text" 
              class="input-header text-3xl!" 
              :placeholder="$t('placeholder.meta.label')" 
              v-bind="componentField" 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem v-auto-animate class="my-4">
          <FormControl>
            <Input 
              type="text" 
              class="input-header text-foreground/70 text-lg!" 
              :placeholder="$t('placeholder.meta.description')" 
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
  <div v-else class="flex-center h-[70vh]">
    <span class="text-foreground/50">{{ $t('common.loading') }}</span>
  </div>
</template>