<script setup lang="ts">
import { ActionPanel } from '@/components/builder/actionPanel'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { useRoute } from 'vue-router'
import { useBuilderStore } from '@/stores/builder'
import { onMounted } from 'vue'

const route = useRoute()
const $builder = useBuilderStore()

const formSchema = toTypedSchema(z.object({
  label: z.string().max(50),
}))

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

</script>

<template>
  <div class="px-4 py-10 max-w-2xl mx-auto flex flex-col gap-4">
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

    <ActionPanel />
  </div>
</template>