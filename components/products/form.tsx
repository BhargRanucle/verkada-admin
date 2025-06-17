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
  name: z.string().min(1, {
    message: "Product name is required.",
  }),
  product_category: z.string().nonempty("Product Category is required."),
  product_line: z.string().optional(),
  content: z
    .string()
    .min(1, { message: "Product content is required." })
    .refine((value) => value.trim() !== "<p><br></p>", {
      message: "Product content is required.",
    }),
  thirty_days_storage: z.string().optional(),
  sixty_days_storage: z.string().optional(),
  ninety_days_storage: z.string().optional(),
  one_hundred_twenty_days_storage: z.string().optional(),
  three_hundred_sixty_five_days_storage: z.string().optional(),
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
      product_line: product?.product_line || "",
      content: product?.content || "",
      thirty_days_storage: product?.thirty_days_storage || "none",
      sixty_days_storage: product?.sixty_days_storage || "none",
      ninety_days_storage: product?.ninety_days_storage || "none",
      one_hundred_twenty_days_storage:
        product?.one_hundred_twenty_days_storage || "none",
      three_hundred_sixty_five_days_storage:
        product?.three_hundred_sixty_five_days_storage || "none",
    },
  });

  // console.log('product_line value:', form.getValues('product_line'));

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

  const selectData = [
    {
      label: "28 10 00 Access Control 24.4",
      flag: "28_10_00_access_control_24_4",
      items: [
        { value: "Door Controllers", text: "Door Controllers" },
        { value: "IO Controllers", text: "IO Controllers" },
        {
          value: "Integrated Card Reader Door Locks",
          text: "Integrated Card Reader Door Locks",
        },
        {
          value: "Multi-Format Card Readers",
          text: "Multi-Format Card Readers",
        },
      ],
    },
    {
      label: "28 20 00 Video Surveillance, Gateways, Connector 25.1",
      flag: "28_20_00_video_surveillance_gateways_connector_25_1",
      items: [
        { value: "Indoor Dome Series", text: "Indoor Dome Series" },
        { value: "Outdoor Dome Series", text: "Outdoor Dome Series" },
        { value: "Mini Series", text: "Mini Series" },
        { value: "Bullet Series", text: "Bullet Series" },
      ],
    },
  ];

  const [isVideoSurveillance, setIsVideoSurveillance] = useState(false);

  useEffect(() => {
    const productLine = form.getValues("product_line");
    if (productLine === "28_20_00_video_surveillance_gateways_connector_25_1") {
      setIsVideoSurveillance(true);
    } else {
      setIsVideoSurveillance(false);
    }
  }, [form.watch("product_line")]);

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
                  <FormLabel>Name *</FormLabel>
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

            <FormField
              control={form.control}
              name="product_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product Category *</FormLabel>
                  <Select
                    onValueChange={async (value) => {
                      const parentGroup = await selectData.find((group) =>
                        group.items.some((item) => item.value === value)
                      );
                      const parentFlag = parentGroup ? parentGroup.flag : null;
                      form.setValue("product_line", parentFlag as any);
                      field.onChange(value);

                      setTimeout(() => {}, 0);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                    </FormControl>
                    {/* <SelectContent>
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
                    </SelectContent> */}

                    <SelectContent>
                      {selectData.map((group, groupIndex) => (
                        <SelectGroup key={groupIndex}>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.items.map((item, itemIndex) => (
                            <SelectItem
                              key={itemIndex}
                              className="ms-3"
                              value={item.value}
                            >
                              {item.text}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isVideoSurveillance && (
            <div className="mt-2 grid gap-6 lg:grid-cols-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="thirty_days_storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>30 Days Storage</FormLabel>
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
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="256GB">256GB</SelectItem>
                        <SelectItem value="512GB">512GB</SelectItem>
                        <SelectItem value="768GB">768GB</SelectItem>
                        <SelectItem value="1TB">1TB</SelectItem>
                        <SelectItem value="2TB">2TB</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sixty_days_storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>60 Days Storage</FormLabel>
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
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="256GB">256GB</SelectItem>
                        <SelectItem value="512GB">512GB</SelectItem>
                        <SelectItem value="768GB">768GB</SelectItem>
                        <SelectItem value="1TB">1TB</SelectItem>
                        <SelectItem value="2TB">2TB</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ninety_days_storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>90 Days Storage</FormLabel>
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
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="256GB">256GB</SelectItem>
                        <SelectItem value="512GB">512GB</SelectItem>
                        <SelectItem value="768GB">768GB</SelectItem>
                        <SelectItem value="1TB">1TB</SelectItem>
                        <SelectItem value="2TB">2TB</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="one_hundred_twenty_days_storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>120 Days Storage</FormLabel>
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
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="256GB">256GB</SelectItem>
                        <SelectItem value="512GB">512GB</SelectItem>
                        <SelectItem value="768GB">768GB</SelectItem>
                        <SelectItem value="1TB">1TB</SelectItem>
                        <SelectItem value="2TB">2TB</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="three_hundred_sixty_five_days_storage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>365 Days Storage</FormLabel>
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
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="256GB">256GB</SelectItem>
                        <SelectItem value="512GB">512GB</SelectItem>
                        <SelectItem value="768GB">768GB</SelectItem>
                        <SelectItem value="1TB">1TB</SelectItem>
                        <SelectItem value="2TB">2TB</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className={`mt-2 text-editor`}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content *</FormLabel>
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

          {isVideoSurveillance && (
            <p className="mb-0 !mt-2 text-[14px]">
              * Note:- Please use <b>#STORAGE#</b> variable to use as dynamic
              value. *
            </p>
          )}

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
