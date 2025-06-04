// "use client"

// import { Field, ErrorMessage } from "formik"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Trash2 } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Command, CommandList, CommandGroup, CommandInput, CommandItem, CommandEmpty } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Badge } from "@/components/ui/badge"
// import { Check, ChevronsUpDown, X } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { useState } from "react"

// interface ProductSectionProps {
//   index: number
//   remove: (index: number) => void
//   showRemove: boolean
//   productOptions: Record<string, string[]>
// }

// export default function ProductSection({ index, remove, showRemove, productOptions }: ProductSectionProps) {
//   const [open, setOpen] = useState(false)

//   return (
//     <Card className="border border-black/10 hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm">
//       <CardContent className="p-3 space-y-2">
//         <div className="flex justify-between items-center">
//           <Label htmlFor={`productSections.${index}.productType`} className="font-semibold text-sm">
//             Product Type
//           </Label>
//           {showRemove && (
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               onClick={() => remove(index)}
//               className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
//             >
//               <Trash2 className="h-3 w-3" />
//             </Button>
//           )}
//         </div>

//         <Field name={`productSections.${index}.productType`}>
//           {({ field, form, meta }: any) => (
//             <div>
//               <Select
//                 value={field.value}
//                 onValueChange={(value) => {
//                   form.setFieldValue(field.name, value)
//                   form.setFieldValue(`productSections.${index}.products`, [])
//                 }}
//               >
//                 <SelectTrigger
//                   className={`h-8 text-sm border-black/20 focus:ring-black/50 ${meta.touched && meta.error ? "border-red-500" : ""}`}
//                 >
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {Object.keys(productOptions).map((type) => (
//                     <SelectItem key={type} value={type} className="text-sm">
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <ErrorMessage
//                 name={`productSections.${index}.productType`}
//                 component="div"
//                 className="text-red-500 text-xs mt-1"
//               />
//             </div>
//           )}
//         </Field>

//         <div>
//           <Label htmlFor={`productSections.${index}.products`} className="font-semibold text-sm">
//             Products
//           </Label>
//           <div className="mt-1">
//             <Field name={`productSections.${index}.products`}>
//               {({ field, form, meta }: any) => {
//                 const productType = form.values.productSections[index].productType
//                 const availableProducts = productType ? productOptions[productType] : []

//                 return (
//                   <div>
//                     <Popover open={open} onOpenChange={setOpen}>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant="outline"
//                           role="combobox"
//                           aria-expanded={open}
//                           className={`w-full h-8 justify-between text-sm border-black/20 hover:bg-black/5 ${
//                             meta.touched && meta.error ? "border-red-500" : ""
//                           }`}
//                           disabled={!productType}
//                         >
//                           {field.value.length > 0 ? `${field.value.length} selected` : "Select products"}
//                           <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-full p-0">
//                         <Command>
//                           <CommandInput placeholder="Search..." className="text-sm" />
//                           <CommandList>
//                             <CommandEmpty>No products found.</CommandEmpty>
//                             <CommandGroup>
//                               {availableProducts.map((product) => (
//                                 <CommandItem
//                                   key={product}
//                                   value={product}
//                                   className="text-sm"
//                                   onSelect={() => {
//                                     const currentProducts = [...field.value]
//                                     if (currentProducts.includes(product)) {
//                                       form.setFieldValue(
//                                         field.name,
//                                         currentProducts.filter((p) => p !== product),
//                                       )
//                                     } else {
//                                       form.setFieldValue(field.name, [...currentProducts, product])
//                                     }
//                                   }}
//                                 >
//                                   <Check
//                                     className={cn(
//                                       "mr-2 h-3 w-3",
//                                       field.value.includes(product) ? "opacity-100" : "opacity-0",
//                                     )}
//                                   />
//                                   {product}
//                                 </CommandItem>
//                               ))}
//                             </CommandGroup>
//                           </CommandList>
//                         </Command>
//                       </PopoverContent>
//                     </Popover>

//                     <div className="flex flex-wrap gap-1 mt-2">
//                       {field.value.map((product: string) => (
//                         <Badge key={product} variant="outline" className="bg-black/5 text-black text-xs py-0">
//                           {product.split(" ").slice(0, 2).join(" ")}...
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
//                             onClick={() => {
//                               form.setFieldValue(
//                                 field.name,
//                                 field.value.filter((p: string) => p !== product),
//                               )
//                             }}
//                           >
//                             <X className="h-2 w-2" />
//                           </Button>
//                         </Badge>
//                       ))}
//                     </div>

//                     <ErrorMessage
//                       name={`productSections.${index}.products`}
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>
//                 )
//               }}
//             </Field>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client";

import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronRight, Search, Tag, Minus } from "lucide-react";

interface ProductSectionProps {
  productOptions: Record<string, string[]>;
}

export default function ProductSection({
  productOptions,
}: ProductSectionProps) {
  // Dynamically generate expandedCategories from productOptions
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize expandedCategories when productOptions changes
  useEffect(() => {
    const initialExpandedState = Object.keys(productOptions).reduce(
      (acc, category) => {
        acc[category] = false; // All categories collapsed by default
        return acc;
      },
      {} as Record<string, boolean>
    );
    setExpandedCategories(initialExpandedState);
  }, [productOptions]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredProductOptions = Object.entries(productOptions).reduce(
    (acc, [category, products]) => {
      if (searchTerm) {
        const filteredProducts = products.filter(
          (product) =>
            product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredProducts.length > 0) {
          acc[category] = filteredProducts;
        }
      } else {
        acc[category] = products;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="space-y-3">
      <Label className="font-semibold text-sm">Select Products</Label>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Find Item"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-8 text-sm border-gray-300 focus:border-gray-400 focus:ring-gray-400"
        />
      </div>

      <Field name="selectedProducts">
        {({ field, form, meta }: any) => {
          const handleProductChange = (product: string, checked: boolean) => {
            let newSelection = [...(field.value || [])];
            if (checked) {
              if (!newSelection.includes(product)) {
                newSelection.push(product);
              }
            } else {
              newSelection = newSelection.filter((p) => p !== product);
            }
            form.setFieldValue(field.name, newSelection);
          };

          const handleCategoryChange = (category: string, checked: boolean) => {
            const categoryProducts = filteredProductOptions[category] || [];
            let newSelection = [...(field.value || [])];

            if (checked) {
              categoryProducts.forEach((product) => {
                if (!newSelection.includes(product)) {
                  newSelection.push(product);
                }
              });
            } else {
              newSelection = newSelection.filter(
                (product) => !categoryProducts.includes(product)
              );
            }
            form.setFieldValue(field.name, newSelection);
          };

          const getCategoryState = (category: string) => {
            const categoryProducts = filteredProductOptions[category] || [];
            const selectedFromCategory = categoryProducts.filter((product) =>
              (field.value || []).includes(product)
            );

            if (selectedFromCategory.length === 0) {
              return "unchecked";
            } else if (
              selectedFromCategory.length === categoryProducts.length
            ) {
              return "checked";
            } else {
              return "indeterminate";
            }
          };

          const isCategorySelected = (category: string) => {
            return getCategoryState(category) === "checked";
          };

          const isCategoryPartiallySelected = (category: string) => {
            return getCategoryState(category) === "indeterminate";
          };

          return (
            <div className="border border-gray-300 rounded bg-white max-h-80 overflow-y-auto">
              <div className="p-2 space-y-1">
                {Object.entries(filteredProductOptions).map(
                  ([category, products]) => {
                    const categoryState = getCategoryState(category);
                    const selectedCount = products.filter((product) =>
                      (field.value || []).includes(product)
                    ).length;

                    return (
                      <div key={category}>
                        {/* Category Row */}
                        <div className="flex items-center space-x-2 py-1 hover:bg-gray-50 rounded">
                          <button
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className="p-0.5 hover:bg-gray-200 rounded"
                          >
                            {expandedCategories[category] ? (
                              <ChevronDown className="h-3 w-3 text-gray-600" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-gray-600" />
                            )}
                          </button>

                          <Tag className="h-4 w-4 text-orange-500" />

                          {/* Custom Checkbox with Indeterminate State */}
                          <div className="relative">
                            {categoryState === "indeterminate" ? (
                              <div className="h-4 w-4 bg-[#000] flex items-center justify-center mt-1">
                                <Minus className="h-3 w-3 text-white font-bold" />
                              </div>
                            ) : (
                              <div className="mt-1">
                                <Checkbox
                                  id={`category-${category}`}
                                  checked={categoryState === "checked"}
                                  onCheckedChange={(checked) =>
                                    handleCategoryChange(
                                      category,
                                      checked as boolean
                                    )
                                  }
                                  className="h-4 w-4"
                                />
                              </div>
                            )}

                            {/* Invisible checkbox for click handling when indeterminate */}
                            {categoryState === "indeterminate" && (
                              <input
                                type="checkbox"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) =>
                                  handleCategoryChange(
                                    category,
                                    e.target.checked
                                  )
                                }
                              />
                            )}
                          </div>

                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium text-gray-900 cursor-pointer flex-1"
                          >
                            {category}
                          </label>

                          {/* Selection Count Badge */}
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {selectedCount}/{products.length}
                          </span>
                        </div>

                        {/* Products List */}
                        {expandedCategories[category] && (
                          <div className="ml-6 space-y-1">
                            {products.map((product) => (
                              <div
                                key={product}
                                className="flex items-center space-x-2 py-1 hover:bg-gray-50 rounded"
                              >
                                <div className="w-3" />{" "}
                                {/* Spacer for alignment */}
                                <Tag className="h-4 w-4 text-orange-400" />
                                <Checkbox
                                  id={`product-${product}`}
                                  checked={(field.value || []).includes(
                                    product
                                  )}
                                  onCheckedChange={(checked) =>
                                    handleProductChange(
                                      product,
                                      checked as boolean
                                    )
                                  }
                                  className="h-4 w-4"
                                />
                                <label
                                  htmlFor={`product-${product}`}
                                  className="text-sm text-gray-700 cursor-pointer flex-1 leading-tight"
                                >
                                  {product}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              <ErrorMessage
                name="selectedProducts"
                component="div"
                className="text-red-500 text-xs mt-1 px-2 pb-2"
              />
            </div>
          );
        }}
      </Field>

      {/* Selected Count */}
      <Field name="selectedProducts">
        {({ field }: any) => (
          <div className="text-xs text-gray-500">
            {(field.value || []).length} item
            {(field.value || []).length !== 1 ? "s" : ""} selected
          </div>
        )}
      </Field>
    </div>
  );
}
