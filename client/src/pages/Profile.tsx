import { DashBoardPageWrapper } from "@/components/Dashboard/DashBoardPageWrapper";
import { GenericCard } from "@/components/Generics/GenericCard";
import { LoadingSpinner } from "@/components/Generics/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { passwordUpdateFields } from "@/constants/passwordUpdateFields";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Profile = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { authUser } = useAuth();

  const signupValidationSchema = z
    .object({
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

  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidationSchema>) {
    if (isLoading) return;
    try {
      setLoading(true);
      if (!authUser?.id) {
        toast.error("User ID is missing. Cannot update password.");
        return;
      }
      const response = await User.patch(authUser.id, {
        password: values.password,
      });
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashBoardPageWrapper pageTitle="Profile">
      <GenericCard
        cardContent={
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              Name: <span className="font-thin ml-2">{authUser?.name}</span>
            </p>
            <p className="font-bold">
              Email: <span className="font-thin ml-2">{authUser?.email}</span>{" "}
            </p>
            <p className="font-bold">
              Role :
              <span className="font-thin ml-2 capitalize">
                {authUser?.role.toLowerCase().replace("_", " ")}
              </span>
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {passwordUpdateFields.map((item, i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <item.component {...item.props} {...field} />
                        </FormControl>
                        {item.description && (
                          <FormDescription>{item.description}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        }
      />
    </DashBoardPageWrapper>
  );
};
