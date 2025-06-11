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
    { name: "ACS", description: "Access Control System", checked: true },
    {
      name: "API",
      description: "Application Programming Interface",
      checked: false,
    },
    { name: "CCD", description: "Charge Coupled Device", checked: true },
    { name: "CCTV", description: "Closed Circuit Television", checked: true },
    {
      name: "CMOS",
      description: "Complementary Metal-Oxide Semiconductor",
      checked: false,
    },
    {
      name: "DHCP",
      description: "Dynamic Host Configuration Protocol",
      checked: true,
    },
    { name: "DNS", description: "Domain Name System", checked: true },
    { name: "DPDT", description: "Double pole, double throw", checked: true },
    { name: "FPS", description: "Frames Per Second", checked: false },
    { name: "IP", description: "Internet Protocol", checked: true },
    { name: "LAN", description: "Local Area Network", checked: false },
    { name: "LPR", description: "License Plate Recognition", checked: true },
    { name: "NFC", description: "Near Field Communications", checked: false },
    { name: "NVR", description: "Network Video Recorder", checked: true },
    { name: "ODBC", description: "Open Database Connectivity", checked: false },
    { name: "PoE", description: "Power Over Ethernet", checked: true },
    { name: "RAM", description: "Random Access Memory", checked: false },
    { name: "SPDT", description: "Single pole, double throw", checked: true },
    { name: "SSL", description: "Secure Sockets Layer", checked: true },
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
  sales_rep_contact: "eric.talley@verkada.com",
  license_term: "1-year",
  system_monitoring: [
    { name: "LIC-BB Basic Alarm License", checked: true },
    { name: "LIC-B Standard Alarm License", checked: true },
    { name: "LIC-BV Premium Alarm License", checked: false },
    { name: "Custom Video Monitoring", checked: true },
  ],
  indoor_dome_products: [
    { name: "CD32 Indoor Dome Camera", checked: true },
    { name: "CD42 Indoor Dome Camera", checked: false },
    { name: "CD43 Indoor Dome Camera", checked: true },
    { name: "CD52 Indoor Dome Camera", checked: true },
    { name: "CD53 Indoor Dome Camera", checked: true },
    { name: "CD62 Indoor Dome Camera", checked: false },
    { name: "CD63 Indoor Dome Camera", checked: false },
  ],
  outdoor_dome_products: [
    { name: "CD32-E Outdoor Dome Camera", checked: false },
    { name: "CD42-E Outdoor Dome Camera", checked: true },
    { name: "CD43-E Outdoor Dome Camera", checked: true },
    { name: "CD52-E Outdoor Dome Camera", checked: false },
    { name: "CD53-E Outdoor Dome Camera", checked: true },
    { name: "CD62-E Outdoor Dome Camera", checked: false },
    { name: "CD63-E Outdoor Dome Camera", checked: true },
  ],
  fips_validated_cameras: [
    { name: "CD42-F Indoor Dome Camera", checked: true },
    { name: "CD52-F Indoor Dome Camera", checked: true },
    { name: "CD42-E-F Outdoor Dome Camera", checked: true },
    { name: "CD52-E-F Outdoor Dome Camera", checked: true },
    { name: "CF83-E-F Fisheye Camera", checked: false },
    { name: "CH52-E-F Multisensor Camera", checked: true },
    { name: "CP52-E-F PTZ Camera", checked: false },
    { name: "CP63-E-F PTZ Camera", checked: true },
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

export default function ViewProject() {
  const handleDownload = (id: number, user: string) => {
    // Simulate download functionality
    console.log(`Downloading data for update by ${user} (ID: ${id})`);
  };
  const [activeTab, setActiveTab] = useState("view");
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
          defaultValue="view"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
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

          <TabsContent value="view" className="mt-3">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl">
              <CardContent className="pt-0">
                {/* Basic Info Grid */}
                <div>
                  <h4 className="my-1 mt-4 text-black text-[20px] font-semibold">
                    General Information
                  </h4>
                  <div className="border-t-[1px] border-[black]"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Abbreviations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {initialValues.abbreviations
                        .filter((abbreviation) => abbreviation.checked)
                        .map((abbreviation, index) => (
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

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Definitions
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.definitions ||
                          "No definitions provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Submittals
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.submittals || "No submittals provided."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="my-1 text-black text-[20px] font-semibold">
                    Products
                  </h4>
                  <div className="border-t-[1px] border-[black]"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Sales Rep Contact
                      </h3>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                        {initialValues.sales_rep_contact}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Licence Term
                      </h3>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mt-1">
                        {initialValues.license_term} Licence Term
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      System Monitoring License
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {initialValues.system_monitoring
                        .filter((data) => data.checked)
                        .map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                          >
                            <span className="text-xs">
                              <span className="font-medium">{data.name}</span>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Indoor Dome Products
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {initialValues.indoor_dome_products
                        .filter((data) => data.checked)
                        .map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                          >
                            <span className="text-xs">
                              <span className="font-medium">{data.name}</span>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Outdoor Dome Products
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {initialValues.outdoor_dome_products
                        .filter((data) => data.checked)
                        .map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                          >
                            <span className="text-xs">
                              <span className="font-medium">{data.name}</span>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Fips-Validated Cameras
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {initialValues.fips_validated_cameras
                        .filter((data) => data.checked)
                        .map((data, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 p-2 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-600"
                          >
                            <span className="text-xs">
                              <span className="font-medium">{data.name}</span>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="my-1 mt-4 text-black text-[20px] font-semibold">
                    Execution Section
                  </h4>
                  <div className="border-t-[1px] border-[black]"></div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Installers
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.installers || "No installers provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Examination
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.examination ||
                          "No examination provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Preparation
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.preparation ||
                          "No preparation provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Installation
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.installation ||
                          "No installation provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Labeling
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.labeling || "No labeling provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Programming
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.programming ||
                          "No programming provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Acceptance Testing
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.acceptance_testing ||
                          "No acceptance testing provided."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-4">
                    <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">
                      Owner Personnel Training
                    </h3>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded p-3">
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {initialValues.owner_personnel_training ||
                          "No owner personnel training provided."}
                      </p>
                    </div>
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
