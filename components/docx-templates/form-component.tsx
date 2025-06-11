"use client";
import {
  Formik,
  Form as FormikForm,
  FieldArray,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Package, Zap } from "lucide-react";
import GeneralSection from "@/components/docx-templates/general-section";
import ProductSection from "@/components/docx-templates/product-section";
import ExecutionSection from "@/components/docx-templates/execution-section";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Specification } from "../manage-specifications/table";
import { Label } from "@/components/ui/label";
import TextEditorField from "../text-editor/TextEditorField";

// Define product types and their associated products
const productOptions = {
  "Door Controllers": [
    "AC12 1-Door Controller by Verkada Inc",
    "AC41 4-Door Controller by Verkada Inc",
    "AC42 4-Door Controller by Verkada Inc",
    "AC62 16-Door Controller by Verkada Inc",
  ],
  "IO Controllers": [
    "AX11 IO Controller by Verkada Inc",
    "Integrated Card Reader Door Locks",
    "AX12 IO Controller by Verkada Inc",
    "AX21 IO Controller by Verkada Inc",
  ],
};

const validationSchema = Yup.object().shape({
  generalSections: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"),
      })
    )
    .min(1, "At least one general section is required"),

  selectedProducts: Yup.array()
    .of(Yup.string())
    .min(1, "At least one product must be selected"),

  executionSections: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().required("Content is required"),
      })
    )
    .min(1, "At least one execution section is required"),
});

// Initial form values

interface SpecificationProps {
  specification?: Specification;
}

export default function FormComponent({ specification }: SpecificationProps) {
  const router = useRouter();

  const initialValues = {
    product_line: specification?.product_line || "",
    status: specification?.status || "Active",
    generalSections: [{ title: "", content: "" }],
    productSections: [],
    executionSections: [{ title: "", content: "" }],
    general: "",
    execution: ""
  };

  return (
    <div className="mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <FormikForm className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="form-item">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Product Line
                </label>
                <Field
                  as={Input}
                  // placeholder="Enter your specification title"
                  className="rounded-lg"
                  name="product_line"
                  onChange={(e: any) => {
                    handleChange(e);
                    console.log("Title changed:", e.target.value);
                  }}
                  onBlur={handleBlur}
                  disabled
                />
                <ErrorMessage
                  name="product_line"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="form-item">
                <label
                  htmlFor="status"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Status
                </label>
                <Field name="status">
                  {({ field, form }: { field: any; form: any }) => (
                    <Select
                      onValueChange={(value: any) =>
                        form.setFieldValue(field.name, value)
                      }
                      value={field.value || ""}
                    >
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
              {/* General Section */}
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-0 space-y-2">
                  <FieldArray name="generalSections">
                    {({ push, remove }) => (
                      <>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-black rounded-lg">
                              <Settings className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-gray-900">
                                General Section
                              </h2>
                              <Badge
                                variant="outline"
                                className="text-xs border-black/20 text-gray-600"
                              >
                                {values.generalSections.length} section
                                {values.generalSections.length !== 1 ? "s" : ""}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-4">
                          <div
                            key={`general-section`}
                            className=" hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 rounded-[17px]"
                          >
                                <div className="">
                                  <Field name={`general`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="general"
                                          toolbarId="toolbar-general"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`general`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`general`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              
                          </div>
                        </div>

                        {/* <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-[15%] mt-2 border-black/20 bg-black text-white transition-all duration-200"
                          onClick={() => push({ title: "", content: "" })}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Section
                        </Button> */}
                      </>
                    )}
                  </FieldArray>
                </CardContent>
              </Card>

              {/* Product Section */}
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-0 space-y-2">
                  <FieldArray name="productSections">
                    {({ push, remove }) => (
                      <>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-r from-black to-gray-700 rounded-lg">
                              <Package className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-gray-900">
                                Product Section
                              </h2>
                              {/* <Badge
                                variant="outline"
                                className="text-xs border-black/20 text-gray-600"
                              >
                                {values.productSections.length} section
                                {values.productSections.length !== 1 ? "s" : ""}
                              </Badge> */}
                              <Field name="selectedProducts">
                                {({ field }: any) => (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-black/20 text-gray-600"
                                  >
                                    {(field.value || []).length} Product
                                    {(field.value || []).length !== 1
                                      ? "s"
                                      : ""}{" "}
                                    selected
                                  </Badge>
                                )}
                              </Field>
                            </div>
                          </div>
                        </CardHeader>
                        <ProductSection productOptions={productOptions} />
                        {/* <CardContent className="pt-0">
                         
                        </CardContent> */}
                        {/* <div className="grid grid-cols-3 gap-4">
                          {values.productSections.map((section, index) => (
                            <ProductSection
                              key={index}
                              index={index}
                              remove={remove}
                              showRemove={values.productSections.length > 1}
                              productOptions={productOptions}
                            />
                          ))}
                        </div> */}

                        {/* <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-[15%] mt-2 border-black/20 bg-black text-white transition-all duration-200"
                          onClick={() =>
                            push({ productType: "", products: [] })
                          }
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Product
                        </Button> */}
                      </>
                    )}
                  </FieldArray>
                </CardContent>
              </Card>

              {/* Execution Section */}
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-0 space-y-2">
                  <FieldArray name="executionSections">
                    {({ push, remove }) => (
                      <>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-r from-black to-gray-800 rounded-lg">
                              <Zap className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-gray-900">
                                Execution Section
                              </h2>
                              <Badge
                                variant="outline"
                                className="text-xs border-black/20 text-gray-600"
                              >
                                {values.executionSections.length} section
                                {values.executionSections.length !== 1
                                  ? "s"
                                  : ""}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-4">
                          {/* {values.executionSections.map((section, index) => (
                            <ExecutionSection
                              key={index}
                              index={index}
                              remove={remove}
                              showRemove={values.executionSections.length > 1}
                            />
                          ))} */}

                          {/* <Card
                            key={`execution-section`}
                            className="border border-black/10 hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                          >
                            <CardContent className="p-3 space-y-2">
                              <div className="">
                                <Label
                                  htmlFor={`installers`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Installers
                                </Label>
                                <div className="mt-1">
                                  <Field name={`installers`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="installers"
                                          toolbarId="toolbar-installers"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`installers`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`installers`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`examination`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Examination
                                </Label>
                                <div className="mt-1">
                                  <Field name={`examination`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="examination"
                                          toolbarId="toolbar-examination"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`examination`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`examination`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`preparation`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Preparation
                                </Label>
                                <div className="mt-1">
                                  <Field name={`preparation`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="preparation"
                                          toolbarId="toolbar-preparation"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`preparation`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`preparation`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`installation`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Installation
                                </Label>
                                <div className="mt-1">
                                  <Field name={`installation`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="installation"
                                          toolbarId="toolbar-installation"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`installation`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`installation`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`labeling`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Labeling
                                </Label>
                                <div className="mt-1">
                                  <Field name={`labeling`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="labeling"
                                          toolbarId="toolbar-labeling"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`labeling`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`labeling`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`programming`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Programming
                                </Label>
                                <div className="mt-1">
                                  <Field name={`programming`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="programming"
                                          toolbarId="toolbar-programming"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`programming`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`programming`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`acceptance_testing`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Acceptance Testing
                                </Label>
                                <div className="mt-1">
                                  <Field name={`acceptance_testing`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="acceptance_testing"
                                          toolbarId="toolbar-acceptance-testing"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`acceptance_testing`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`acceptance_testing`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`owner_personnel_training`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Owner Personnel Training
                                </Label>
                                <div className="mt-1">
                                  <Field name={`owner_personnel_training`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="owner_personnel_training"
                                          toolbarId="toolbar-owner-personnel-training"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`owner_personnel_training`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`owner_personnel_training`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>

                              <div className="mt-2">
                                <Label
                                  htmlFor={`documentation`}
                                  className="font-semibold text-sm text-gray-700 ms-1"
                                >
                                  Documentation
                                </Label>
                                <div className="mt-1">
                                  <Field name={`documentation`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="documentation"
                                          toolbarId="toolbar-documentation"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`documentation`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`documentation`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              </div>
                            </CardContent>
                          </Card> */}

                          <div
                            key={`execution-section`}
                            className=" hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 rounded-[17px]"
                          >
                                <div className="">
                                  <Field name={`execution`}>
                                    {({ field, form, meta }: any) => (
                                      <>
                                        <TextEditorField
                                          name="execution"
                                          toolbarId="toolbar-execution"
                                          value={field.value}
                                          onChange={(value: any) =>
                                            setFieldValue(`execution`, value)
                                          }
                                        />

                                        <ErrorMessage
                                          name={`execution`}
                                          component="div"
                                          className="text-red-500 text-xs mt-1"
                                        />
                                      </>
                                    )}
                                  </Field>
                                </div>
                              
                          </div>
                        </div>

                       
                      </>
                    )}
                  </FieldArray>
                </CardContent>
              </Card>
            </div>

            {/* Submit Button */}
            {/* <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {isSubmitting ? "Submitting..." : "Submit Configuration"}
              </Button>
            </div> */}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/manage-specifications")}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg"
              >
                {isSubmitting
                  ? "Saving..."
                  : specification
                  ? "Update Specification"
                  : "Create Specification"}
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
