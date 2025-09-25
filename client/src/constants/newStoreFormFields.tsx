import StoreOwnerSelector from "@/components/Store/StoreOwnerSelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BaseFormField } from "@/types";

interface NewStoreFormFields extends BaseFormField {
  name: "name" | "email" | "address" | "ownerId";
}

export const newStoreFormFields: NewStoreFormFields[] = [
  {
    name: "name",
    label: "Name",
    component: Input,
    props: {
      type: "text",
    },
  },
  {
    name: "email",
    label: "Email",
    component: Input,
    props: {
      type: "email",
    },
  },
  {
    name: "address",
    label: "Address",
    component: Textarea,
  },
  {
    name: "ownerId",
    label: "Select Owner",
    component: StoreOwnerSelector,
  },
];
