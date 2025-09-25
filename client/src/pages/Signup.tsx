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
import { GenericCard } from "@/components/Generics/GenericCard";
import { Auth } from "@/services";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingSpinner } from "@/components/Generics/LoadingSpinner";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
export const SignupPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { authUser } = useAuth();

  const signupValidationSchema = z
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
      name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidationSchema>) {
    if (isLoading) return;
    try {
      setLoading(true);
      const response = await Auth.signUp(values);
      if (response.success) {
        toast.success(response.message);
        navigate("/signin");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  if (authUser) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <main className="min-h-screen flex h-full w-full justify-center items-center p-4">
      <GenericCard
        cardTitle="Create an Account"
        cardDescription="Enter your details below to sign up and get started."
        cardContent={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {signupFormFields.map((item, i) => (
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
                {isLoading ? <LoadingSpinner size="small" /> : "Signup"}
              </Button>
            </form>
            <p className="text-center text-sm mt-4">
      Allready registered?{" "}
      <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
        Login
      </Link>
    </p>
          </Form>
        }
      />
    </main>
  );
};
