import { useFirestore } from "@/composables/useFirestore";
import type { FieldItem, Schema } from "@/types";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
const $db = useFirestore<Schema>('forms')

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
    loadSchema(data?: Schema) {
      console.log('init');
      if(data?.id) { // Fetch from backend
        this.saved = true;
      }
      if (data) {
          this.schema = data;
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
    async saveSchema() {
      if (!this.schema) return;
      const toastId = toast.loading('saving...');
      // console.log(this.oldSchema);
      if(this.schema?.id) {
        // Update existing
        await $db.update(this.schema.id, this.schema);
      } else {
        // Create new
        const id = await $db.create(this.schema);
        this.schema.id = id;
      }
      this.oldSchema = JSON.parse(JSON.stringify(this.schema));
      window.history.replaceState({ schema: JSON.stringify(this.schema) }, '', '/builder/' + this.schema.id);
      this.saved = true;
      await $db.getAll();
      toast.update(toastId, { render: 'Saved!', type: 'success', isLoading: false, autoClose: 1000 });
    }
  }
});