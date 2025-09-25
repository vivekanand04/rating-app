import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BaseFormField } from "@/types";

interface SignUpFormField extends BaseFormField {
  name: "name" | "email" | "address" | "password" | "confirmPassword";
}

export const signupFormFields: SignUpFormField[] = [
  {
    name: "name",
    label: "Full Name",
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
