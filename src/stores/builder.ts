import type { Schema } from "@/types";
import { defineStore } from "pinia";

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    schema: null as Schema | null,
    oldSchema: null as Schema | null,
  }),
  getters: {
    hasUnsavedChanges: (state) => {
      return JSON.stringify(state.schema) !== JSON.stringify(state.oldSchema);
    }
  },
  actions: {
    loadSchema(id?: string) {
      if(id) { // Fetch from backend

      } else { // Initialize new schema
        this.schema = { items: [] };
      }
    },
    updateMeta(key: keyof Schema, value: any) {
      this.schema![key] = value
    },
  }
});