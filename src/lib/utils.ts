import { CONDS } from "@/constants/items"
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
    if (item.rules.minlen) {
      rules = rules.min(item.rules.minlen);
    }
    if (item.rules.maxlen) {
      rules = rules.max(item.rules.maxlen);
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

export function checkCond(key: keyof FieldItem, item: FieldItem, data: Record<string, any>): number {
  // 1 = met, 0 = not met, -1 = no condition
  const cond = item[key]
  if (cond && Array.isArray(cond) && cond.length === 3) {
    const targetValue = data[cond[0]]
    const operator = cond[1]
    const value = cond[2]
    if(targetValue === undefined) return -1;
    if(operator == CONDS.EQ && targetValue === value) return 1;
    if(operator == CONDS.NEQ && targetValue != value) return 1;
    if(operator == CONDS.GT && targetValue > value) return 1;
    if(operator == CONDS.GTE && targetValue >= value) return 1;
    if(operator == CONDS.LT && targetValue < value) return 1;
    if(operator == CONDS.LTE && targetValue <= value) return 1;
  }
  return 0;
}