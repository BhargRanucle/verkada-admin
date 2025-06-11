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
import { use, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Specification } from "../manage-specifications/table";
import { Label } from "@/components/ui/label";
import TextEditorField from "../text-editor/TextEditorField";
import axios from "axios";

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

const validationSchema = Yup.object().shape({});

// Initial form values

interface SpecificationProps {
  specification?: any;
}

export default function FormComponent({ specification }: SpecificationProps) {
  const formikRef = useRef(null) as any;
  const router = useRouter();

  const initialValues = {
    status: specification?.status || "Active",
    general_sections: specification?.general_sections || "",
    product_sections: specification?.product_sections || "",
    execution: specification?.execution || "",
    title: specification?.title || "",
  };

  const [loading, setLoading] = useState(false);

  const generateDocx = async () => {
    try {
      setLoading(true);
      const values = formikRef.current.values;
      const response = await axios.post(
        `${process.env.API_URL}/sections/generate-docx/${specification?.flag}`,
        values,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "My_Document.docx";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Form values:", values);
          try {
            const response = await axios.put(
              `${process.env.API_URL}/sections/${specification?.flag}`,
              values
            );
            console.log("API Response:", response.data);
            alert("Data updated successfully!");
            router.push("/admin/manage-specifications-sections");
          } catch (error) {
            console.error("Error updating data:", error);
            alert("Failed to update data. Please try again.");
          } finally {
            setSubmitting(false);
          }
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
            <div className="grid gap-6 md:grid-cols-1">
              <div className="form-item">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Title
                </label>
                <Field
                  as={Input}
                  className="rounded-lg"
                  name="title"
                  onChange={(e: any) => {
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  disabled
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 manage-spacification-section">
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
                            </div>
                          </div>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-4">
                          <div
                            key={`general-section`}
                            className=" hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 rounded-[17px]"
                          >
                            <div className="">
                              <Field name={`general_sections`}>
                                {({ field, form, meta }: any) => (
                                  <>
                                    <TextEditorField
                                      name="general_sections"
                                      toolbarId="toolbar-general"
                                      value={field.value}
                                      onChange={(value: any) =>
                                        setFieldValue(`general_sections`, value)
                                      }
                                    />

                                    <ErrorMessage
                                      name={`general_sections`}
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

              {/* Product Section */}
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-0 space-y-2">
                  <FieldArray name="productSections">
                    {({ push, remove }) => (
                      <>
                        <CardHeader className="pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="p-2 bg-gradient-to-r from-black to-gray-800 rounded-lg">
                              <Zap className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-gray-900">
                                Product Section
                              </h2>
                            </div>
                          </div>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-4">
                          <div
                            key={`product-section`}
                            className=" hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 rounded-[17px]"
                          >
                            <div className="">
                              <Field name={`product_sections`}>
                                {({ field, form, meta }: any) => (
                                  <>
                                    <TextEditorField
                                      name="product_sections"
                                      toolbarId="toolbar-product"
                                      value={field.value}
                                      onChange={(value: any) =>
                                        setFieldValue(`product_sections`, value)
                                      }
                                    />

                                    <ErrorMessage
                                      name={`product_sections`}
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
                            </div>
                          </div>
                        </CardHeader>
                        <div className="grid grid-cols-1 gap-4">
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

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
              <div>
                <Button
                  type="button"
                  onClick={generateDocx}
                  className="rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Download Docx"}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    router.push("/admin/manage-specifications-sections")
                  }
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
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
