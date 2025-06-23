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
import type { Domain } from "./table";
import { motion } from "framer-motion";

const formSchema = z.object({
  domain: z.string().min(2, {
    message: "Domian is required",
  }),
});

interface DomainFormProps {
  domain?: Domain;
}

export function DomainForm({
  domain,
}: DomainFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    domain: z
    .string()
    .min(1, { message: "Domain is required" })
    .regex(
      /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,63}$/,
      { message: "Invalid domain format" }
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: domain?.domain || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (domain) {
        toast({
          title: "Product Category updated",
          description: "The user has been updated successfully.",
        });
      } else {
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
          <div className="grid gap-6 md:grid-cols-1">
            <div>
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whitelisted Domain *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Whitelisted Domain"
                        className="rounded-lg"
                        {...field}
                      />
                    </FormControl>
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
              onClick={() => router.push("/admin/whitelisted-domains")}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-lg">
              {isLoading
                ? "Saving..."
                : domain
                ? "Update Domain"
                : "Create Domain"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
