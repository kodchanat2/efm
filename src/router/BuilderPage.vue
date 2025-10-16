<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
const formSchema = toTypedSchema(z.object({
  label: z.string().max(50),
}))
const form = useForm({
  validationSchema: formSchema,
})

const onChange = () => {
  console.log('Form changed!', form.values)
}

</script>

<template>
  <form @change="onChange" @input="onChange" class="px-4 py-10 max-w-2xl mx-auto flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="label">
      <FormItem v-auto-animate>
        <FormControl>
          <Input 
            type="text" 
            class="rounded-b-none border-0 border-b text-2xl! font-medium ring-0!" 
            :placeholder="$t('placeholder.meta.label')" 
            v-bind="componentField" 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>