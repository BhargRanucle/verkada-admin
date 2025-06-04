"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  Clock,
  User,
  Calendar as CalendarReactIcon,
  Activity,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Trash2, Edit3, Eye, History } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.core.css";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";
import TextEditorField from "../text-editor/TextEditorField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the form validation schema
const GeneralInformationSchema = Yup.object().shape({
  projectName: Yup.string().required("Project name is required"),
  consultantName: Yup.string().required("Consultant name is required"),
  issuanceDescription: Yup.string().required(
    "Issuance description is required"
  ),
  issuanceDate: Yup.date().required("Issuance date is required"),
  abbreviations: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      checked: Yup.boolean(),
    })
  ),
  definitions: Yup.string(),
  submittals: Yup.string(),
  installers: Yup.string(),
  examination: Yup.string(),
  preparation: Yup.string(),
  installation: Yup.string(),
  labeling: Yup.string(),
  programming: Yup.string(),
  acceptance_testing: Yup.string(),
  owner_personnel_training: Yup.string(),
  sales_rep_contact: Yup.string().required("Sales Rep Contact is required"),
  license_term: Yup.string().required("License Term is required"),
  system_monitoring: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      checked: Yup.boolean(),
    })
  ),
  indoor_dome_products: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      checked: Yup.boolean(),
    })
  ),
  outdoor_dome_products: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      checked: Yup.boolean(),
    })
  ),
  fips_validated_cameras: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(),
      checked: Yup.boolean(),
    })
  ),
});

// Initial form values
const initialValues = {
  projectName: "Video Surveillance",
  consultantName: "Bhart Dan Gadhvi",
  issuanceDescription: "Issuance Description",
  issuanceDate: new Date("2025-05-15"),
  abbreviations: [
    { name: "ACS", description: "Access Control System", checked: false },
    {
      name: "API",
      description: "Application Programming Interface",
      checked: false,
    },
    { name: "CCD", description: "Charge Coupled Device", checked: false },
    { name: "CCTV", description: "Closed Circuit Television", checked: false },
    {
      name: "CMOS",
      description: "Complementary Metal-Oxide Semiconductor",
      checked: false,
    },
    {
      name: "DHCP",
      description: "Dynamic Host Configuration Protocol",
      checked: false,
    },
    { name: "DNS", description: "Domain Name System", checked: false },
    { name: "DPDT", description: "Double pole, double throw", checked: false },
    { name: "FPS", description: "Frames Per Second", checked: false },
    { name: "IP", description: "Internet Protocol", checked: false },
    { name: "LAN", description: "Local Area Network", checked: false },
    { name: "LPR", description: "License Plate Recognition", checked: false },
    { name: "NFC", description: "Near Field Communications", checked: false },
    { name: "NVR", description: "Network Video Recorder", checked: false },
    { name: "ODBC", description: "Open Database Connectivity", checked: false },
    { name: "PoE", description: "Power Over Ethernet", checked: false },
    { name: "RAM", description: "Random Access Memory", checked: false },
    { name: "SPDT", description: "Single pole, double throw", checked: false },
    { name: "SSL", description: "Secure Sockets Layer", checked: false },
    { name: "SSO", description: "Single sign-on", checked: false },
    { name: "TCP", description: "Transport Control Protocol", checked: false },
    {
      name: "UPS",
      description: "Uninterruptible Power Supply",
      checked: false,
    },
    { name: "VMS", description: "Video Management System", checked: false },
    { name: "WDR", description: "Wide Dynamic Range", checked: false },
  ],
  definitions: "",
  submittals: "",
  installers: "",
  examination: "",
  preparation: "",
  installation: "",
  labeling: "",
  programming: "",
  acceptance_testing: "",
  owner_personnel_training: "",
  sales_rep_contact: "",
  license_term: "",
  system_monitoring: [
    { name: "LIC-BB Basic Alarm License", checked: false },
    { name: "LIC-B Standard Alarm License", checked: false },
    { name: "LIC-BV Premium Alarm License", checked: false },
    { name: "Custom Video Monitoring", checked: false },
  ],
   indoor_dome_products: [
    { name: "CD32 Indoor Dome Camera", checked: false },
    { name: "CD42 Indoor Dome Camera", checked: false },
    { name: "CD43 Indoor Dome Camera", checked: false },
    { name: "CD52 Indoor Dome Camera", checked: false },
    { name: "CD53 Indoor Dome Camera", checked: false },
    { name: "CD62 Indoor Dome Camera", checked: false },
    { name: "CD63 Indoor Dome Camera", checked: false },
  ],
   outdoor_dome_products: [
    { name: "CD32-E Outdoor Dome Camera", checked: false },
    { name: "CD42-E Outdoor Dome Camera", checked: false },
    { name: "CD43-E Outdoor Dome Camera", checked: false },
    { name: "CD52-E Outdoor Dome Camera", checked: false },
    { name: "CD53-E Outdoor Dome Camera", checked: false },
    { name: "CD62-E Outdoor Dome Camera", checked: false },
    { name: "CD63-E Outdoor Dome Camera", checked: false },
  ],
   fips_validated_cameras: [
    { name: "CD42-F Indoor Dome Camera", checked: false },
    { name: "CD52-F Indoor Dome Camera", checked: false },
    { name: "CD42-E-F Outdoor Dome Camera", checked: false },
    { name: "CD52-E-F Outdoor Dome Camera", checked: false },
    { name: "CF83-E-F Fisheye Camera", checked: false },
    { name: "CH52-E-F Multisensor Camera", checked: false },
    { name: "CP52-E-F PTZ Camera", checked: false },
    { name: "CP63-E-F PTZ Camera", checked: false },
  ],
};

// History data
const historyData = [
  {
    id: 1,
    updatedDate: "2024-01-15",
    updatedTime: "14:30",
    updatedBy: "Sarah Johnson",
  },
  {
    id: 2,
    updatedDate: "2024-01-14",
    updatedTime: "09:15",
    updatedBy: "Michael Chen",
  },
  {
    id: 3,
    updatedDate: "2024-01-13",
    updatedTime: "16:45",
    updatedBy: "Emily Rodriguez",
  },
  {
    id: 4,
    updatedDate: "2024-01-12",
    updatedTime: "11:20",
    updatedBy: "David Kim",
  },
];

export default function GeneralInformationForm() {
  const handleDownload = (id: number, user: string) => {
    // Simulate download functionality
    console.log(`Downloading data for update by ${user} (ID: ${id})`);
  };
  const [activeTab, setActiveTab] = useState("edit");
  const { theme } = useTheme();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ReactQuill) {
      setIsLoaded(true);
    }
  }, [ReactQuill]);

  const modules = {
    toolbar: {
      container: `#toolbar`,
    },
  };

  const submittalsModules = {
    toolbar: {
      container: `#toolbar-submittals`,
    },
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <Tabs
          defaultValue="edit"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Creative Tab Navigation */}
          <div className="">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <TabsTrigger
                value="edit"
                className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger
                value="view"
                className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm"
              >
                <Eye className="h-4 w-4" />
                View
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm"
              >
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="edit" className="mt-3">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl">
              <CardContent className="pt-0">
                <Formik
                  initialValues={initialValues}
                  validationSchema={GeneralInformationSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    setFieldValue,
                    handleChange,
                  }) => (
                    <Form className="space-y-4">
                      <div>
                        <h4 className="my-1 mt-4 text-black text-[20px] font-semibold">
                          General Information
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="projectName"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Project Name
                            </Label>
                            <Field
                              as={Input}
                              id="projectName"
                              name="projectName"
                              className={cn(
                                " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                errors.projectName && touched.projectName
                                  ? ""
                                  : ""
                              )}
                            />
                            {errors.projectName && touched.projectName && (
                              <p className="text-red-500 text-xs">
                                {errors.projectName}
                              </p>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <Label
                              htmlFor="consultantName"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Consultant Name
                            </Label>
                            <Field
                              as={Input}
                              id="consultantName"
                              name="consultantName"
                              className={cn(
                                " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                errors.consultantName && touched.consultantName
                                  ? ""
                                  : ""
                              )}
                            />
                            {errors.consultantName &&
                              touched.consultantName && (
                                <p className="text-red-500 text-xs">
                                  {errors.consultantName}
                                </p>
                              )}
                          </div>

                          <div className="space-y-1.5">
                            <Label
                              htmlFor="issuanceDescription"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Issuance Description
                            </Label>
                            <Field
                              as={Input}
                              id="issuanceDescription"
                              name="issuanceDescription"
                              className={cn(
                                " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                errors.issuanceDescription &&
                                  touched.issuanceDescription
                                  ? ""
                                  : ""
                              )}
                            />
                            {errors.issuanceDescription &&
                              touched.issuanceDescription && (
                                <p className="text-red-500 text-xs">
                                  {errors.issuanceDescription}
                                </p>
                              )}
                          </div>

                          <div className="space-y-1.5">
                            <Label
                              htmlFor="issuanceDate"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Issuance Date
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal  dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600",
                                    !values.issuanceDate &&
                                      "text-muted-foreground",
                                    errors.issuanceDate && touched.issuanceDate
                                      ? ""
                                      : ""
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {values.issuanceDate ? (
                                    format(values.issuanceDate, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                <Calendar
                                  mode="single"
                                  selected={values.issuanceDate}
                                  onSelect={(date) =>
                                    setFieldValue("issuanceDate", date)
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            {errors.issuanceDate && touched.issuanceDate && (
                              <p className="text-red-500 text-xs">
                                {errors.issuanceDate}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Abbreviations
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            <FieldArray name="abbreviations">
                              {() => (
                                <>
                                  {values.abbreviations.map(
                                    (abbreviation, index) => {
                                      const id = `abbreviation-${index}`;
                                      const isChecked =
                                        values.abbreviations[index].checked;

                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setFieldValue(
                                              `abbreviations[${index}].checked`,
                                              !isChecked
                                            );
                                          }}
                                          className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            className="hidden"
                                          />
                                          <div className="flex items-center">
                                            <div
                                              className={`w-4 h-4 border mr-0 flex items-center justify-center ${
                                                isChecked
                                                  ? "bg-[black] border-[black]"
                                                  : "border-gray-400 dark:border-gray-500"
                                              }`}
                                            >
                                              {isChecked && (
                                                <svg
                                                  className="w-3 h-3 text-white"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M5 13l4 4L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                          <label
                                            htmlFor={id}
                                            className="text-xs leading-tight cursor-pointer"
                                          >
                                            <span className="font-medium">
                                              {abbreviation.name}
                                            </span>{" "}
                                            – {abbreviation.description}
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </FieldArray>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Definitions
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`definitions`} className="">
                              {({ field, form, meta }: any) => (
                                <>
                                  <TextEditorField
                                    name="definitions"
                                    toolbarId="toolbar-definitions"
                                    value={field.value}
                                    onChange={(value: any) =>
                                      setFieldValue(`definitions`, value)
                                    }
                                  />

                                  <ErrorMessage
                                    name={`definitions`}
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Submittals
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`submittals`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
                                  <TextEditorField
                                    name="submittals"
                                    toolbarId="toolbar-submittals"
                                    value={field.value}
                                    onChange={(value: any) =>
                                      setFieldValue(`submittals`, value)
                                    }
                                  />
                                  <ErrorMessage
                                    name={`submittals`}
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                  />
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="my-1 mt-7 text-black text-[20px] font-semibold">
                          Products
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="sales_rep_contact"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Sales Rep Contact
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                setFieldValue("sales_rep_contact", value)
                              }
                              value={values.sales_rep_contact}
                            >
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select a Sales Rep Contact" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="eric.talley@verkada.com">
                                  Eric Talley (North America East) -
                                  eric.talley@verkada.com
                                </SelectItem>
                                <SelectItem value="chad.cooper@verkada.com">
                                  Chad Cooper (North America West) -
                                  chad.cooper@verkada.com
                                </SelectItem>
                                <SelectItem value="dan.bettencourt@verkada.com">
                                  Dan Bettencourt (Texas, International) -
                                  dan.bettencourt@verkada.com
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.sales_rep_contact &&
                              touched.sales_rep_contact && (
                                <p className="text-red-500 text-xs">
                                  {errors.sales_rep_contact}
                                </p>
                              )}
                          </div>

                          <div className="space-y-1.5">
                            <Label
                              htmlFor="license_term"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Select Licence Term
                            </Label>
                            <Select
                              onValueChange={(value) =>
                                setFieldValue("license_term", value)
                              }
                              value={values.license_term}
                            >
                              <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select Licence Term" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-year">1-year</SelectItem>
                                <SelectItem value="3-year">3-year</SelectItem>
                                <SelectItem value="5-year">5-year</SelectItem>
                                <SelectItem value="10-year">10-year</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.license_term && touched.license_term && (
                              <p className="text-red-500 text-xs">
                                {errors.license_term}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                            Select System Monitoring License
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <FieldArray name="system_monitoring">
                              {() => (
                                <>
                                  {values.system_monitoring.map(
                                    (data, index) => {
                                      const id = `system_monitoring-${index}`;
                                      const isChecked =
                                        values.system_monitoring[index].checked;

                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setFieldValue(
                                              `system_monitoring[${index}].checked`,
                                              !isChecked
                                            );
                                          }}
                                          className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            className="hidden"
                                          />
                                          <div className="flex items-center">
                                            <div
                                              className={`w-4 h-4 border mr-0 flex items-center justify-center ${
                                                isChecked
                                                  ? "bg-[black] border-[black]"
                                                  : "border-gray-400 dark:border-gray-500"
                                              }`}
                                            >
                                              {isChecked && (
                                                <svg
                                                  className="w-3 h-3 text-white"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M5 13l4 4L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                          <label
                                            htmlFor={id}
                                            className="text-xs leading-tight cursor-pointer"
                                          >
                                            <span className="font-medium">
                                              {data.name}
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </FieldArray>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                            Indoor Dome Products
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <FieldArray name="indoor_dome_products">
                              {() => (
                                <>
                                  {values.indoor_dome_products.map(
                                    (data, index) => {
                                      const id = `indoor_dome_products-${index}`;
                                      const isChecked =
                                        values.indoor_dome_products[index].checked;

                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setFieldValue(
                                              `indoor_dome_products[${index}].checked`,
                                              !isChecked
                                            );
                                          }}
                                          className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            className="hidden"
                                          />
                                          <div className="flex items-center">
                                            <div
                                              className={`w-4 h-4 border mr-0 flex items-center justify-center ${
                                                isChecked
                                                  ? "bg-[black] border-[black]"
                                                  : "border-gray-400 dark:border-gray-500"
                                              }`}
                                            >
                                              {isChecked && (
                                                <svg
                                                  className="w-3 h-3 text-white"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M5 13l4 4L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                          <label
                                            htmlFor={id}
                                            className="text-xs leading-tight cursor-pointer"
                                          >
                                            <span className="font-medium">
                                              {data.name}
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </FieldArray>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                            Outdoor Dome Products
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <FieldArray name="outdoor_dome_products">
                              {() => (
                                <>
                                  {values.outdoor_dome_products.map(
                                    (data, index) => {
                                      const id = `outdoor_dome_products-${index}`;
                                      const isChecked =
                                        values.outdoor_dome_products[index].checked;

                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setFieldValue(
                                              `outdoor_dome_products[${index}].checked`,
                                              !isChecked
                                            );
                                          }}
                                          className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            className="hidden"
                                          />
                                          <div className="flex items-center">
                                            <div
                                              className={`w-4 h-4 border mr-0 flex items-center justify-center ${
                                                isChecked
                                                  ? "bg-[black] border-[black]"
                                                  : "border-gray-400 dark:border-gray-500"
                                              }`}
                                            >
                                              {isChecked && (
                                                <svg
                                                  className="w-3 h-3 text-white"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M5 13l4 4L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                          <label
                                            htmlFor={id}
                                            className="text-xs leading-tight cursor-pointer"
                                          >
                                            <span className="font-medium">
                                              {data.name}
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </FieldArray>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                            Fips-Validated Cameras
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                            <FieldArray name="fips_validated_cameras">
                              {() => (
                                <>
                                  {values.fips_validated_cameras.map(
                                    (data, index) => {
                                      const id = `fips_validated_cameras-${index}`;
                                      const isChecked =
                                        values.fips_validated_cameras[index].checked;

                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setFieldValue(
                                              `fips_validated_cameras[${index}].checked`,
                                              !isChecked
                                            );
                                          }}
                                          className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 cursor-pointer"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {}}
                                            className="hidden"
                                          />
                                          <div className="flex items-center">
                                            <div
                                              className={`w-4 h-4 border mr-0 flex items-center justify-center ${
                                                isChecked
                                                  ? "bg-[black] border-[black]"
                                                  : "border-gray-400 dark:border-gray-500"
                                              }`}
                                            >
                                              {isChecked && (
                                                <svg
                                                  className="w-3 h-3 text-white"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M5 13l4 4L19 7"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              )}
                                            </div>
                                          </div>
                                          <label
                                            htmlFor={id}
                                            className="text-xs leading-tight cursor-pointer"
                                          >
                                            <span className="font-medium">
                                              {data.name}
                                            </span>
                                          </label>
                                        </div>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </FieldArray>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="my-1 mt-7 text-black text-[20px] font-semibold">
                          Execution Section
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-4">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Installers
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`installers`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Examination
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`examination`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Preparation
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`preparation`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Installation
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`installation`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Labeling
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`labeling`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Programming
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`programming`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Acceptance Testing
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`acceptance_testing`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Owner Personnel Training
                          </h3>
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field
                              name={`owner_personnel_training`}
                              className=""
                            >
                              {({ field, form, meta }: any) => (
                                <div>
                                  <TextEditorField
                                    name="owner_personnel_training"
                                    toolbarId="toolbar-owner-personnel-training"
                                    value={field.value}
                                    onChange={(value: any) =>
                                      setFieldValue(
                                        `owner_personnel_training`,
                                        value
                                      )
                                    }
                                  />
                                  <ErrorMessage
                                    name={`owner_personnel_training`}
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                  />
                                </div>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <Button
                          type="submit"
                          className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 px-6"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="view" className="mt-3">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-6">
                  General Information Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Project Name
                    </h3>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {initialValues.projectName}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Consultant Name
                    </h3>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {initialValues.consultantName}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Issuance Description
                    </h3>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {initialValues.issuanceDescription}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Issuance Date
                    </h3>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                      {format(initialValues.issuanceDate, "PPP")}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    Abbreviations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {initialValues.abbreviations.map((abbreviation, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                      >
                        <span className="text-xs">
                          <span className="font-medium">
                            {abbreviation.name}
                          </span>{" "}
                          – {abbreviation.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other sections with similar styling... */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    Definitions
                  </h3>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                      {initialValues.definitions || "No definitions provided."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-3">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-6">
                  Revision History
                </CardTitle>
              </CardHeader>
              <div className="mx-6 mb-6">
                <div className="">
                  <Card className="">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b-2 border-gray-200 bg-gray-50/50">
                              <TableHead className="font-bold text-black py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <CalendarReactIcon className="h-4 w-4" />
                                  Updated Date
                                </div>
                              </TableHead>
                              <TableHead className="font-bold text-black py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  Updated By
                                </div>
                              </TableHead>
                              <TableHead className="font-bold text-black py-3 px-4 text-center">
                                Download
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {historyData.map((item, index) => (
                              <TableRow
                                key={item.id}
                                className={`
                        transition-all duration-300 hover:bg-gray-50 hover:shadow-md
                        ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}
                        border-b border-gray-100 group
                      `}
                              >
                                <TableCell className="py-3 px-4">
                                  <div className="space-y-1">
                                    <div className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                                      {item.updatedDate}
                                    </div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {item.updatedTime}
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell className="py-3 px-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                                      {item.updatedBy
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900 text-sm">
                                        {item.updatedBy}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        Admin
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>

                                <TableCell className="py-3 px-4 text-center">
                                  <Button
                                    onClick={() =>
                                      handleDownload(item.id, item.updatedBy)
                                    }
                                    className="bg-black hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                                    size="sm"
                                  >
                                    <Download className="h-3 w-3 mr-1 group-hover/btn:animate-bounce" />
                                    Download
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
