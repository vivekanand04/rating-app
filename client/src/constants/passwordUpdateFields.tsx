import { Input } from "@/components/ui/input";
import type { BaseFormField } from "@/types";

interface PassqwordUpdateField extends BaseFormField {
  name: "password" | "confirmPassword";
}

export const passwordUpdateFields: PassqwordUpdateField[] = [
  {
    name: "password",
    label: "Password",
    component: Input,
    props: {
      type: "password",
    },
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    component: Input,
    props: {
      type: "password",
    },
  },
];
