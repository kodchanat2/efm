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
  type: string
  description?: string
  placeholder?: string
  rules?: string[]
  builder: {
    type: string
  }
  layout: string
  props?: any
  default?: any
  visible?: [string, string, string][]
  enable?: [string, string, string][]
}
