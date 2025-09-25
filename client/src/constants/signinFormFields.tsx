import { Input } from "@/components/ui/input";
import type { BaseFormField } from "@/types";

interface SignInFormField extends BaseFormField {
  name: "email" | "password";
}

export const signinFormFields: SignInFormField[] = [
  {
    name: "email",
    label: "Email",
    component: Input,
    props: {
      type: "email",
    },
  },
  {
    name: "password",
    label: "Password",
    component: Input,
    props: {
      type: "password",
    },
  },
];
