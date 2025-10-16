import type { FieldItem, Schema } from "@/types";
import { defineStore } from "pinia";

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    schema: null as Schema | null,
    oldSchema: null as Schema | null,
  }),
  getters: {
    hasUnsavedChanges: (state) => {
      return JSON.stringify(state.schema) !== JSON.stringify(state.oldSchema);
    },
    items: (state) => state.schema?.items || [],
  },
  actions: {
    loadSchema(id?: string) {
      console.log('init');
      if(id) { // Fetch from backend

      } else { // Initialize new schema
        this.schema = { items: [] };
      }
    },
    updateMeta(key: keyof Schema, value: any) {
      if (!this.schema) return;
      this.schema[key] = value
    },
    addItem(item: FieldItem) {
      if (!this.schema) return;
      this.schema.items.push(item);
    },
    saveSchema() {
      this.oldSchema = JSON.parse(JSON.stringify(this.schema));
      console.log(this.oldSchema);
    }
  }
});