import * as Block from "@/components/builder/block";
import * as Field from "@/components/form/field";
import type { BuilderItem, FieldType } from "@/types";
import z from "zod";

export type BuilderType = "simple_input" | "simple_choice" | "simple_select"

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

const simple_choice: BuilderItem = {
  type: "simple_choice",
  icon: "streamline-color:bullet-list-flat",
  component: Block.TextBlock,
  props: {
    type: "Radio",
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
  component: Block.TextBlock,
  props: {
    type: "Select",
  },
  rules: [],
  validate: {
    default: () => z.string().nullable().optional(),
    'required': () => z.string().nonempty(),
  }
};

export const BUILDER_ITEMS: BuilderItem[] = [
  simple_input,
  simple_choice,
  simple_select
];

export const FORM_ITEMS: Partial<Record<FieldType, any>> = {
  "Text": Field.TextField,
}

export const CONDS = {
  EQ: "==",
  NEQ: "!=",
  GT: ">",
  LT: "<",
  GTE: ">=",
  LTE: "<=",
}
