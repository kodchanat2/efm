import type { FieldItem, Schema } from "@/types";
import { defineStore } from "pinia";

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    schema: null as Schema | null,
    oldSchema: null as Schema | null,
    saved: false,
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
        this.saved = true;
      } else { // Initialize new schema
        this.schema = { items: [] };
      }
    },
    updateMeta(value: any) {
      if (!this.schema) return;
      this.schema = { ...this.schema, ...value }
    },
    addItem(item: FieldItem) {
      if (!this.schema) return;
      this.schema.items.push(item);
    },
    updateItem(index: number, value: { [key: string]: any }) {
      if (!this.schema || !this.schema.items[index]) return;
      this.schema.items[index] = { ...this.schema.items[index], ...value };
    },
    deleteItem(index: number) {
      if (!this.schema || !this.schema.items[index]) return;
      this.schema.items.splice(index, 1);
    },
    setItems(items: FieldItem[]) {
      if (!this.schema) return;
      this.schema.items = items;
      console.log(this.schema.items);
    },
    saveSchema() {
      this.oldSchema = JSON.parse(JSON.stringify(this.schema));
      this.saved = true;
      console.log(this.oldSchema);
    }
  }
});