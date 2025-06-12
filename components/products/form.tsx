"use client";

import { useEffect, useRef, useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createUser, updateUser } from "@/lib/actions";
import type { Product } from "./table";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "react-quill-new/dist/quill.core.css";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  product_category: z.string().nonempty("Product Category is required."),
  content: z.string().optional(),
});

interface ProductFormProps {
  product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      product_category: product?.product_category || "",
      content: product?.content || "",
    },
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ReactQuill) {
      setIsLoaded(true);
    }

    // Clean up fullscreen state on unmount
    return () => {
      if (
        document.fullscreenElement &&
        editorContainerRef.current?.contains(document.fullscreenElement)
      ) {
        document.exitFullscreen();
      }
    };
  }, []);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === editorContainerRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!editorContainerRef.current) return;

    if (!document.fullscreenElement) {
      editorContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const generateModules = (id: string) => ({
    toolbar: {
      container: `#${id}`,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      if (product) {
        toast({
          title: "Product updated",
          description: "The user has been updated successfully.",
        });
      } else {
        toast({
          title: "Product created",
          description: "The user has been created successfully.",
        });
      }
      router.push("/admin/products");
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

  const modules = {
    toolbar: {
      container: `#toolbar`,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Name"
                      className="rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="product_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Door Controllers">
                        Door Controllers
                      </SelectItem>
                      <SelectItem value="IO Controllers">
                        IO Controllers
                      </SelectItem>
                      <SelectItem value="Integrated Card Reader Door Locks">
                        Integrated Card Reader Door Locks
                      </SelectItem>
                      <SelectItem value="Multi-Format Card Readers">
                        Multi-Format Card Readers
                      </SelectItem>
                      <SelectItem value="Badge Printing Software">
                        Badge Printing Software
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="product_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>28 10 00 Access Control 24.4</SelectLabel>
                        <SelectItem className="ms-3" value="Door Controllers">
                          Door Controllers
                        </SelectItem>
                        <SelectItem className="ms-3" value="IO Controllers">
                          IO Controllers
                        </SelectItem>
                        <SelectItem
                          className="ms-3"
                          value="Integrated Card Reader Door Locks"
                        >
                          Integrated Card Reader Door Locks
                        </SelectItem>
                        <SelectItem
                          className="ms-3"
                          value="Multi-Format Card Readers"
                        >
                          Multi-Format Card Readers
                        </SelectItem>
                      </SelectGroup>

                      <SelectGroup>
                        <SelectLabel>
                          28 20 00 Video Surveillance, Gateways, Connector 25.1
                        </SelectLabel>
                        <SelectItem className="ms-3" value="Indoor Dome Series">
                          Indoor Dome Series
                        </SelectItem>
                        <SelectItem
                          className="ms-3"
                          value="Outdoor Dome Series"
                        >
                          Outdoor Dome Series
                        </SelectItem>
                        <SelectItem className="ms-3" value="Mini Series">
                          Mini Series
                        </SelectItem>
                        <SelectItem className="ms-3" value="Bullet Series">
                          Bullet Series
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={`mt-2 text-editor`}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <div
                    ref={editorContainerRef}
                    className={`${isFullscreen ? "fullscreen-editor" : ""}`}
                  >
                    <div id={`toolbar`} className="flex items-center">
                      <button className="ql-bold" />
                      <button
                        className="ql-list"
                        value="bullet"
                        title="Bullet List"
                      />
                      <button
                        className="ql-list"
                        value="ordered"
                        title="Numbered List"
                      />
                      <button
                        className="ql-indent"
                        value="-1"
                        title="Indent Left"
                      />
                      <button
                        className="ql-indent"
                        value="+1"
                        title="Indent Right"
                      />

                      <button className="ql-link" title="Add Link" />

                      <button
                        className={`ql-fullscreen ml-auto ${
                          isFullscreen ? "active" : ""
                        }`}
                        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        onClick={toggleFullscreen}
                      >
                        {isFullscreen ? (
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                              fill="currentColor"
                              d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                            />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                              fill="currentColor"
                              d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <ReactQuill
                      value={field.value}
                      onChange={(content) => field.onChange(content)}
                      theme="snow"
                      modules={modules}
                      key={"content"}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="rounded-lg">
              {isLoading
                ? "Saving..."
                : product
                ? "Update Product"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
