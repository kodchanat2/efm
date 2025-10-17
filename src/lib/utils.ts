import type { BuilderItem, FieldItem } from "@/types"
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function builderToField(item: BuilderItem, name: string): FieldItem {
  return {
    ...item.props,
    builder: {
      type: item.type
    },
    rules: {},
    name: name,
    layout: item.props?.layout || "Normal",
  }
}

export function generateFieldName(items: FieldItem[], baseName: string): string {
  let counter = 0;
  let newName = baseName;

  do {
    newName = `${baseName}_${counter}`;
    counter++;
  } while (items.find(item => item.name === newName));

  return newName;
}

export function generateValidateSchema(items: FieldItem[]) {
  const shape: Record<string, any> = {};
  items.forEach(item => {
    let rules:any = z.string();
    if (!item.rules.required) {
      rules = rules.nullable().optional();
    }
    else {
      rules = rules.min(1);
    }
    if (item.rules.min) {
      rules = rules.min(item.rules.min);
    }
    if (item.rules.max) {
      rules = rules.max(item.rules.max);
    }
    shape[item.name] = rules;
  });
  return z.object(shape);
}

export function saveRecentForm(formId: string) {
  const lastSchema = (localStorage.getItem('lastSchema') || '').split(',');
  if (lastSchema.includes(formId)) {
    lastSchema.splice(lastSchema.indexOf(formId), 1);
  }
  lastSchema.push(formId);
  localStorage.setItem('lastSchema', lastSchema.filter(id => !!id).join(','));
}
