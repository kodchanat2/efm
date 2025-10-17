import * as Block from "@/components/builder/block";
import * as Field from "@/components/form/field";
import type { BuilderItem, FieldType } from "@/types";

export type BuilderType = "simple_input" | "simple_choice" | "simple_select"

const simple_input: BuilderItem = {
  type: "simple_input",
  icon: "streamline-sharp-color:input-box",
  component: Block.TextBlock,
  props: {
    type: "Text",
  },
};

const simple_choice: BuilderItem = {
  type: "simple_choice",
  icon: "streamline-color:bullet-list-flat",
  component: Block.TextBlock,
  props: {
    type: "Radio",
  },
};

const simple_select: BuilderItem = {
  type: "simple_select",
  icon: "streamline-plump-color:drop-down-menu-flat",
  component: Block.TextBlock,
  props: {
    type: "Select",
  },
};

export const BUILDER_ITEMS: BuilderItem[] = [
  simple_input,
  simple_choice,
  simple_select
];

export const FORM_ITEMS: Partial<Record<FieldType, any>> = {
  "Text": Field.TextField,
}
