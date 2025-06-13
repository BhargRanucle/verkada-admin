"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Eye, EyeOff, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import { Metadata } from "next";
import Head from "next/head";

const formSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is required.",
      })
      .min(1, { message: "Password is required." })
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, {
        message: "Password must contain at least one number.",
      })
      .regex(/[@$!%*?&#^]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required.",
      })
      .min(1, { message: "Confirm Password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// export const generateMetadata = async (): Promise<Metadata> => {
//   return {
//     title: "Change Password",
//     description: "Change Password",
//     generator: "verkada",
//   };
// };
export default function ChangePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Change password:", { email, ...values });

      toast({
        title: "Password changed successfully",
        description:
          "Your password has been updated. You can now sign in with your new password.",
      });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <head>
        <title>Change Password</title>
        <meta name="description" content="Change Password" />
        <meta name="generator" content="verkada" />
      </head>
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-md dark:bg-background/80">
            <CardHeader className="space-y-4 text-center pb-8">
              {/* <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div> */}
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 110 19"
                  className="w-[200px]"
                >
                  <path d="M8.227 13.638 21.667.217a.739.739 0 0 1 1.045 0l4.384 4.375c.289.29.289.759 0 1.045L14.18 18.535c-.29.289-.76.289-1.049 0l-4.905-4.9v.003ZM.217 5.64a.737.737 0 0 1 0-1.045L4.6.217c.29-.29.76-.29 1.049 0L12.444 7l-5.43 5.423L.218 5.64Z"></path>
                  <path d="M36.7 2.467h2.682l4.23 11.231 4.23-11.23h2.683l-5.468 14.424h-2.89L36.7 2.467ZM58.96 15.346s-1.34 1.751-4.23 1.751c-3.301 0-5.847-2.883-5.287-6.162.434-2.532 2.726-4.4 5.298-4.346 2.83.058 4.84 2.303 4.84 5.047 0 .62-.104 1.135-.104 1.135h-7.53c.249 1.134 1.238 2.163 2.89 2.163 1.753 0 2.785-1.258 2.785-1.258l1.341 1.67h-.002ZM57 10.812c-.309-1.135-1.136-1.959-2.477-1.959-1.445 0-2.27.824-2.578 1.96H57ZM61.5 6.794h2.374v1.443h.103s1.033-1.648 2.89-1.648h.412v2.575s-.308-.103-.825-.103c-1.444 0-2.578 1.134-2.578 2.886v4.945h-2.373V6.794H61.5ZM68.768 2.467h2.373v8.76l4.022-4.43h2.89l-3.818 4.225 4.023 5.873h-2.682l-2.89-4.225-1.548 1.75v2.475h-2.373V2.467h.003ZM85.282 15.553h-.104s-.928 1.547-2.99 1.547c-2.062 0-3.302-1.34-3.302-2.886 0-1.648 1.237-2.886 2.99-3.195l3.406-.619c0-.72-.825-1.547-1.961-1.547-1.507 0-2.477 1.236-2.477 1.236l-1.445-1.443s1.445-2.06 4.023-2.06c2.578 0 4.23 1.814 4.23 4.019v6.285H85.28v-1.34l.003.003Zm0-3.298-2.373.412c-1.238.226-1.65.62-1.65 1.236s.62 1.235 1.549 1.235c1.34 0 2.477-1.134 2.477-2.575v-.308h-.003ZM97.205 15.45h-.103s-.93 1.647-3.302 1.647c-2.373 0-4.54-2.163-4.54-5.254 0-3.09 2.166-5.254 4.54-5.254 2.373 0 3.302 1.648 3.302 1.648h.103v-5.77h2.374v14.425h-2.374V15.45Zm0-3.607c0-1.648-1.237-2.886-2.785-2.886-1.549 0-2.786 1.236-2.786 2.886 0 1.65 1.237 2.886 2.786 2.886 1.548 0 2.785-1.236 2.785-2.886ZM107.629 15.553h-.103s-.929 1.547-2.991 1.547c-2.062 0-3.301-1.34-3.301-2.886 0-1.648 1.237-2.886 2.99-3.195l3.405-.619c0-.72-.824-1.547-1.96-1.547-1.505 0-2.477 1.236-2.477 1.236l-1.445-1.443s1.445-2.06 4.023-2.06c2.578 0 4.23 1.814 4.23 4.019v6.285h-2.373v-1.34l.002.003Zm0-3.298-2.373.412c-1.237.226-1.649.62-1.649 1.236s.62 1.235 1.548 1.235c1.341 0 2.477-1.134 2.477-2.575v-.308h-.003Z"></path>
                </svg>
              </div>
              <div className="space-y-2">
                {/* <CardTitle className="text-2xl font-bold gradient-text">
                Change Password
              </CardTitle> */}
                <CardDescription className="text-muted-foreground">
                  {email && (
                    <>
                      Create a new password for{" "}
                      <span className="font-medium">{email}</span>
                    </>
                  )}
                  {!email && "Create a new password for your account"}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          New Password *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              className="pl-10 pr-10 h-12 rounded-xl border-muted bg-muted/50 focus:bg-background transition-colors"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Confirm Password *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm new password"
                              className="pl-10 pr-10 h-12 rounded-xl border-muted bg-muted/50 focus:bg-background transition-colors"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium mb-1">
                          Password requirements:
                        </p>
                        <ul className="space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Contains uppercase and lowercase letters</li>
                          <li>• Contains at least one number</li>
                          <li>• Contains at least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Changing password...
                      </div>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
