import * as Block from "@/components/builder/block";
import * as Field from "@/components/form/field";
import type { BuilderItem, FieldType } from "@/types";
import z from "zod";

export type BuilderType = "simple_input" | "simple_number" | "simple_choice" | "simple_checkbox" | "simple_select"

const simple_input: BuilderItem = {
  type: "simple_input",
  icon: "streamline-sharp-color:input-box",
  component: Block.TextBlock,
  props: {
    type: "Text",
  },
  rules: [
    { key: 'minlen', props: {type: 'number', min: 0} },
    { key: 'maxlen', props: {type: 'number', min: 1} },
  ],
  validate: {
    default: () => z.string(),
    'required': () => z.string().nonempty(),
    'minlen': (prev: any, val: number) => z.intersection(prev, z.string().min(val)),
    'maxlen': (prev: any, val: number) => z.intersection(prev, z.string().max(val)),
  }
};

const simple_number: BuilderItem = {
  type: "simple_number",
  icon: "twemoji:input-numbers",
  component: Block.NumberBlock,
  props: {
    type: "Number",
  },
  rules: [
    { key: 'min', props: {type: 'number'} },
    { key: 'max', props: {type: 'number'} },
    { key: 'digit', props: {type: 'number', min: 0} },
  ],
  validate: {
    default: () => z.number().nullable().optional(),
    'required': () => z.number(),
    'min': (prev: any, val: number) => z.intersection(prev, z.number().gte(val)),
    'max': (prev: any, val: number) => z.intersection(prev, z.number().lte(val)),
    'digit': (prev: any, val: number) => z.intersection(prev, z.number().multipleOf(10 ** -val)),
  }
};

const simple_choice: BuilderItem = {
  type: "simple_choice",
  icon: "streamline-color:bullet-list-flat",
  component: Block.RadioBlock,
  props: {
    type: "Radio",
    props: {
      options: []
    }
  },
  rules: [],
  validate: {
    default: () => z.string().nullable().optional(),
    'required': () => z.string().nonempty(),
  }
};

const simple_select: BuilderItem = {
  type: "simple_select",
  icon: "streamline-plump-color:drop-down-menu-flat",
  component: Block.SelectBlock,
  props: {
    type: "Select",
    props: {
      options: []
    }
  },
  rules: [],
  validate: {
    default: () => z.string().nullable().optional(),
    'required': () => z.string().min(1),
  }
};

const simple_checkbox: BuilderItem = {
  type: "simple_checkbox",
  icon: "streamline-flex-color:check-square",
  component: Block.CheckboxBlock,
  props: {
    type: "Checkbox",
    props: {
      options: []
    }
  },
  rules: [],
  validate: {
    default: () => z.string().nullable().optional(),
    'required': () => z.string().nonempty(),
  }
};

export const BUILDER_ITEMS: BuilderItem[] = [
  simple_input,
  simple_number,
  simple_choice,
  simple_select,
  simple_checkbox,
];

export const FORM_ITEMS: Partial<Record<FieldType, any>> = {
  "Text": Field.TextField,
  "Number": Field.NumberField,
  "Select": Field.SelectField,
  "Radio": Field.RadioField,
  "Checkbox": Field.CheckboxField,
}

export const CONDS = {
  EQ: "==",
  NEQ: "!=",
  GT: ">",
  LT: "<",
  GTE: ">=",
  LTE: "<=",
}
