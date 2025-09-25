import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingSpinner } from "@/components/Generics/LoadingSpinner";
import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import { newStoreFormFields } from "@/constants/newStoreFormFields";
import StoreOwnerSelector from "./StoreOwnerSelector";
import { Store } from "@/services";

interface CreateNewStoreFormProps {
  closeUserModal: () => void;
}

export const CreateNewStoreForm: React.FC<CreateNewStoreFormProps> = ({
  closeUserModal,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const newUserValidationSchema = z.object({
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

    ownerId: z.string().trim().uuid("Invalid owner id"),
  });

  const form = useForm<z.infer<typeof newUserValidationSchema>>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      ownerId: "",
    },
  });

  const createNewStore = async (
    values: z.infer<typeof newUserValidationSchema>
  ) => {
    if (isLoading) return;
    try {
      setLoading(true);
      const response = await Store.post(values);
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
    mutationFn: createNewStore,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query: Query) => query.queryKey.includes("UPDATE_ON_STORE"),
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
        {newStoreFormFields.map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item.name}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{item.label}</FormLabel>
                <FormControl className="w-full">
                  {item.component === StoreOwnerSelector ? (
                    <StoreOwnerSelector
                      value={field.value}
                      onChange={field.onChange}
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
