import type { Schema } from "@/types";
import { defineStore } from "pinia";

export const useFormStore = defineStore('form', {
  state: () => ({
    schema: null as Schema | null,
    valid: false,
    data: {} as Record<string, any>,
  }),
  actions: {
    loadSchema(data: Schema) {
      this.schema = data;
    },
    updateData(fieldName: string, value: any) {
      this.data = {
        ...this.data,
        [fieldName]: value,
      };
    }
  }
});
