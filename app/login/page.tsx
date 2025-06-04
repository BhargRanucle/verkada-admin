"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Metadata } from "next";
import Head from "next/head";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().default(false),
});

// export const metadata: Metadata = {
//   title: "Login User",
//   description: "Login User",
//   generator: "verkada",
// };

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you would validate credentials here
      console.log("Login attempt:", values);

      // Redirect to dashboard on successful login
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <head>
        <title>Login User</title>
        <meta name="description" content="Login User" />
        <meta name="generator" content="verkada" />
      </head>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-3xl" />
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
              className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-primary-foreground" />
              
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
                Welcome Back
              </CardTitle> */}
                <CardDescription className="text-muted-foreground">
                  Sign in to your admin dashboard
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="admin@example.com"
                              className="pl-10 h-12 rounded-xl border-muted bg-muted/50 focus:bg-background transition-colors"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
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
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              Remember me
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/reset-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="#"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-xs text-muted-foreground"
          >
            <p>Demo credentials: admin@example.com / password123</p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
