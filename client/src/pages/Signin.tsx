import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { GenericCard } from "@/components/Generics/GenericCard";
import { Auth } from "@/services";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/Generics/LoadingSpinner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinFormFields } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types";
import { Link } from "react-router-dom";

export const SigninPage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { authUser, updateAuthUser } = useAuth();

  const signupValidationSchema = z.object({
    email: z.string().trim().email("Email must be a valid email address."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(16, "Password must be at most 16 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
  });

  const form = useForm<z.infer<typeof signupValidationSchema>>({
    resolver: zodResolver(signupValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupValidationSchema>) {
    if (isLoading) return;
    try {
      setLoading(true);
      const response = await Auth.signIn(values);
      if (response.success) {
        toast.success(response.message);
        updateAuthUser(response.data as User);
        navigate("/dashboard");
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
        cardTitle="Welcome Back"
        cardDescription="Enter your credentials to sign in to your account."
        cardContent={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {signinFormFields.map((item, i) => (
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
                {isLoading ? <LoadingSpinner size="small" /> : "Signin"}
              </Button>
            </form>
            <p className="text-center text-sm mt-4">
      Not registered?{" "}
      <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
        Signup
      </Link>
    </p>
          </Form>
        }
      />
    </main>
  );
};
