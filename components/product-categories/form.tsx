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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createUser, updateUser } from "@/lib/actions";
import type { ProductCategory } from "./table";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface ProductCategoryFormProps {
  productCategory?: ProductCategory;
}

export function ProductCategoryForm({
  productCategory,
}: ProductCategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Product category name is required",
    }),
    // product_line: z.string(),
    product_line: z.string({
      required_error: "Please select a product line.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: productCategory?.name || "",
      product_line: productCategory?.product_line || "access_control",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (productCategory) {
        // Update existing user
        // await updateUser(productType.id, values)
        toast({
          title: "Product Category updated",
          description: "The user has been updated successfully.",
        });
      } else {
        // Create new user
        // await createUser(values)
        toast({
          title: "Product Category created",
          description: "The user has been created successfully.",
        });
      }

      router.push("/admin/product-categories");
      router.refresh();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg">
              <TabsTrigger value="general" className="rounded-md">
                General Information
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-md">
                Security
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-6 pt-6">
              
            </TabsContent>
            <TabsContent value="security" className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{productType ? "New Password" : "Password"}</FormLabel>
                      <FormControl>
                        <Input type="password" className="rounded-lg" {...field} />
                      </FormControl>
                      <FormDescription>{productType ? "Leave blank to keep current password." : ""}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" className="rounded-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>
          </Tabs> */}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Product Category Name"
                        className="rounded-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="product_line"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Product Line *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select a product line" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="access_control">
                          28 10 00 Access Control 24.4
                        </SelectItem>
                        <SelectItem value="intercom_entry_systems">
                          28 15 23 Intercom Entry Systems 25.1
                        </SelectItem>
                        <SelectItem value="visitor_management_systems">
                          28 17 11 Visitor Management Systems 25.1
                        </SelectItem>
                        <SelectItem value="video_surveillance">
                          28 20 00 Video Surveillance, Gateways, Connector 25.1
                        </SelectItem>
                        <SelectItem value="environmental_sensors">
                          28 30 00 Environmental Sensors 25.1
                        </SelectItem>
                        <SelectItem value="intrusion_detection">
                          28 31 00 Intrusion Detection 25.1
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/product-categories")}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-lg">
              {isLoading
                ? "Saving..."
                : productCategory
                ? "Update Product Category"
                : "Create Product Category"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
