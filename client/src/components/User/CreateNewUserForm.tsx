import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signupFormFields } from "@/constants/signUpFormFields";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { User } from "@/services";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingSpinner } from "@/components/Generics/LoadingSpinner";
import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import { GenericSelect } from "../Generics/GenericSelect";
import type { BaseFormField, GenericSelectOption } from "@/types";

interface CreateNewUserFormProps {
  closeUserModal: () => void;
}

export const CreateNewUserForm: React.FC<CreateNewUserFormProps> = ({
  closeUserModal,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  interface NewUserFormField extends BaseFormField {
    name:
      | "name"
      | "email"
      | "address"
      | "password"
      | "confirmPassword"
      | "role";
  }

  const newUserFields: NewUserFormField[] = [
    ...signupFormFields,
    {
      name: "role",
      label: "Role",
      component: GenericSelect,
      props: {
        options: [
          { label: "Admin", value: "ADMIN" },
          { label: "Store Owner", value: "STORE_OWNER" },
          { label: "Normal User", value: "USER" },
        ],
        placeholder: "Select Role",
      },
    },
  ];

  const newUserValidationSchema = z
    .object({
      name: z
        .string()
        .trim()
        .min(20, "Name must be at least 20 characters.")
        .max(60, "Name must be at most 60 characters."),

      email: z.string().trim().email("Email must be a valid email address."),

      address: z
        .string()
        .trim()
        .min(1, "Address is required.")
        .max(400, "Address must be at most 400 characters."),

      role: z.enum(["ADMIN", "STORE_OWNER", "USER"], {
        required_error: "Role is required.",
        invalid_type_error: "Invalid role selected.",
      }),

      password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(16, "Password must be at most 16 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character."
        ),

      confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof newUserValidationSchema>>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
  });

  const createNewUser = async (
    values: z.infer<typeof newUserValidationSchema>
  ) => {
    if (isLoading) return;
    try {
      setLoading(true);
      const response = await User.post(values);
      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: createNewUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey.includes("UPDATE_ON_USER"),
      });
      toast.success(data?.message);
      closeUserModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof newUserValidationSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {newUserFields.map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item.name}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{item.label}</FormLabel>
                <FormControl className="w-full">
                  {item.component === GenericSelect ? (
                    <GenericSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={item.props?.options as GenericSelectOption[]}
                      placeholder={item.props?.placeholder as string}
                    />
                  ) : (
                    <item.component {...field} {...item.props} />
                  )}
                </FormControl>
                {item.description && (
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || isPending}
        >
          {isLoading ? <LoadingSpinner size="small" /> : "Add New User"}
        </Button>
      </form>
    </Form>
  );
};
