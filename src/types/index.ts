import type { BuilderType } from "@/constants/items"

export type Schema = {
  id?: string
  label?: string
  name?: string
  description?: string
  items: FieldItem[]
}

export type FieldItem = {
  label?: string
  name: string
  type: FieldType
  description?: string
  placeholder?: string
  rules: {
    [key: string]: any
  }
  builder: {
    type: BuilderType
  }
  layout: string
  props?: any
  default?: any
  visible?: [string, string, string]
  enable?: [string, string, string]
}

export type FieldType = "Text" | "Number" | "Email" | "Password" | "Textarea" | "Select" | "Radio" | "Checkbox" | "Date" | "Time" | "File" | "Color" | "Range" | "Switch" | "Rating" | "Slider"

export type BuilderItem = {
  type: BuilderType
  icon?: string
  img?: string
  component: any
  props: Partial<FieldItem> & { type: FieldType }
}
