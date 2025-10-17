<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form, useForm } from 'vee-validate'
import * as z from 'zod'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, watch, computed, ref } from 'vue'
import type { FieldItem, Schema } from '@/types'
import { CONDS, FORM_ITEMS } from '@/constants/items'
import { useFirestore } from '@/composables/useFirestore'
import { useFormStore } from '@/stores/form'
import { Button } from '@/components/ui/button'
import { checkCond, generateValidateSchema } from '@/lib/utils'

const route = useRoute()
const router = useRouter()
const form = useForm()
const validationSchema = ref<any>(null)
const $form = useFormStore()
const $db = useFirestore<Schema>('forms')

const fieldList = computed(() => ($form.schema?.items || []).filter((item: FieldItem) => {
  // Check visibility conditions
  if(!item.visible) return true;
  if (checkCond('visible', item, form.values) === 1) return true;
  return false
}))

onMounted(() => {
  const id = route.params.id
  if(id) {
    $db.getAll().then((data) => { // Ensure data is loaded
      const scm = data.find(f => f.id === id)
      if (!scm) {
        console.error('Form not found')
        router.push({ name: 'NotFound' })
        return
      }
      $form.loadSchema(scm)
    })
  } else {
    router.push({ name: 'NotFound' })
  }
})

watch(
  () => $form.schema,
  (newSchema) => {
    if (newSchema) {
      validationSchema.value = toTypedSchema(generateValidateSchema(newSchema.items))
    }
  },
  { deep: true }
)

const onChange = () => {
  // console.log('Form changed!', form.values)
  // $builder.updateMeta(form.values)
}
const getComponent = (item: FieldItem) => {
  const block = FORM_ITEMS[item.type];
  if (!block) throw new Error(`Unknown block type: ${item.type}`)
  return block
}
const onUpdateItem = (name: string, updatedItem: any) => {
  if (!$form.schema) return;
  // $form.updateData(name, updatedItem);
  form.setFieldValue(name, updatedItem);
}

const sendData = (values: Record<string, any>) => {
  // console.log('object', values, $form.data);
  // form.setValues($form.data);
  form.validate().then((result: any) => {
    if (result.valid) {
      // console.log('Form submitted successfully:', values);
      console.log(JSON.parse(JSON.stringify(values)));
    } else {
      console.log('Form validation failed:', result.errors);
    }
  }).catch((err) => {
    console.error('Error during form submission:', err);
  });
}

</script>

<template>
  <div v-if="$form.schema" class="px-4 py-10 pb-20 max-w-2xl mx-auto flex flex-col gap-4">
    <div class="text-3xl font-medium mb-4">
      {{ $form.schema.label || $t('placeholder.meta.label') }}
    </div>
    <div v-if="$form.schema.description" class="text-xl opacity-70 -mt-4 mb-4">
      {{ $form.schema.description }}
    </div>

    <Form v-auto-animate @submit="sendData" @input="onChange" :validation-schema="validationSchema" class="w-full flex flex-col gap-4" >
      <div v-for="element in fieldList" :key="element.name" class="w-full flex flex-col gap-4">
        <component 
          :is="getComponent(element)" 
          v-bind="element" 
          @update="onUpdateItem(element.name, $event)" 
        />
      </div>
      <Button 
        class="mt-6 mx-auto text-lg py-6 w-full max-w-sm" 
        size="lg" 
        type="submit"
        @click.prevent="sendData(form.values)"
      >
        {{ $t('common.submit') }}
      </Button>
    </Form>
  </div>
  <div v-else class="flex-center h-[70vh]">
    <span class="text-foreground/50">{{ $t('common.loading') }}</span>
  </div>
</template>