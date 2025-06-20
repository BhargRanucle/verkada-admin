"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff, Upload } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required.",
      })
      .min(1, {
        message: "Name is required.",
      }),
    email: z
      .string({
        required_error: "Email is required.",
      })
      .min(1, {
        message: "Email is required.",
      })
      .email({
        message: "Please enter a valid email address.",
      }),
    status: z.string({
      required_error: "Please select a status.",
    }),
    phone: z.string().optional(),
    password: z
      .string({
        required_error: "Password is required.",
      }).
      min(1, { message: "Password is required." })
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

const profileFormSchema = z.object({
   name: z
      .string({
        required_error: "Name is required.",
      })
      .min(1, {
        message: "Name is required.",
      }),
    email: z
      .string({
        required_error: "Email is required.",
      })
      .min(1, {
        message: "Email is required.",
      })
      .email({
        message: "Please enter a valid email address.",
      }),
  phone: z.string().optional(),
  
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required.",
    }),
    newPassword: z
      .string({
        required_error: "New Password is required.",
      }).
      min(1, { message: "New Password is required." })
      .min(8, {
        message: "New Password must be at least 8 characters.",
      })
      .regex(/[A-Z]/, {
        message: "New Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "New Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, {
        message: "New Password must contain at least one number.",
      })
      .regex(/[@$!%*?&#^]/, {
        message: "New Password must contain at least one special character.",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required.",
      })
      .min(1, { message: "Confirm Password is required." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });


export function ProfileForm() {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Bharat Dan Gadhvi",
      email: "admin@dan.com",
      phone: "+1 (555) 123-4567",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setIsProfileLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Profile update:", values);

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProfileLoading(false);
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsPasswordLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Password change:", values);

      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });

      // Reset form
      passwordForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPasswordLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
          <TabsTrigger value="profile" className="rounded-md">
            Profile Details
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-md">
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-4">
          <Card>
            <CardHeader className="px-6 pb-6">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-8"
                >
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback className="text-xl">AU</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                      <Button
                        variant="outline"
                        type="button"
                        className="rounded-lg gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Change Avatar
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-3">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              className="rounded-lg"
                              {...field}
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (555) 123-4567"
                              className="rounded-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isProfileLoading}
                      className="rounded-lg"
                    >
                      {isProfileLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 pt-4">
          <Card>
            <CardHeader className="px-6 pb-6">
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="Enter current password"
                              className="pr-10 rounded-lg"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                            >
                              {showCurrentPassword ? (
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

                  <div className="grid gap-6 lg:grid-cols-2">
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="pr-10 rounded-lg"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                              >
                                {showNewPassword ? (
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
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                className="pr-10 rounded-lg"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-transparent"
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
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">
                      Password Requirements:
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Contains uppercase and lowercase letters</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                    </ul>
                  </div>

                  {/* <Button type="submit" disabled={isPasswordLoading} className="rounded-lg">
                    {isPasswordLoading ? "Changing Password..." : "Change Password"}
                  </Button> */}

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={isPasswordLoading}
                      className="rounded-lg"
                    >
                      {isPasswordLoading
                        ? "Changing Password..."
                        : "Change Password"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
