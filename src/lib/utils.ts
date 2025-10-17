import type { BuilderItem, FieldItem } from "@/types"
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
