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

const GeneralInformationSchema = Yup.object().shape({
  rep: Yup.string().required("Please select a sales rep"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  company_name: Yup.string().required("Company name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string().required("Phone number is required"),
  project_name: Yup.string().required("Project name is required"),
  end_customer_company: Yup.string().required(
    "End customer company is required"
  ),
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
  general: Yup.string(),
  execution: Yup.string(),
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

const initialValues = {
  rep: "",
  first_name: "Richard",
  last_name: "Brysacz",
  project_role: "Engineer",
  company_name: "WSP",
  email: "rick.brysacz@wsp.com",
  phone_number: "949-751-5819",
  project_name: "3 building Civic Center Project",
  project_description: "3 building Civic Center Project",
  project_type: "Municipality / Government / Public Utility",
  project_location: "Visalia, CA",
  construction_type: "Ground Up",
  project_stage: "Preconstruction / Bidding / Procurement (Stage 5)",
  stage_four_completion_date: new Date("2024-11-27"),
  construction_start_date: new Date("2025-06-10"),
  construction_completion_date: new Date("2026-12-10"),
  budget: "12000",
  intrested_products: [
    { name: "Cameras", description: "Cameras", checked: true },
    { name: "Access Control", description: "Access Control", checked: true },
    { name: "Sensors", description: "Sensors", checked: false },
    { name: "Alarms", description: "Alarms", checked: true },
    { name: "Workplace", description: "Workplace", checked: false },
    { name: "Intercom", description: "Intercom", checked: true },
  ],
  end_customer_company: "City of Visalia",
  end_customer_contact: "",
  architect: "Darden Architects",
  mep_engineer: "WSP",
  security_consultant: "Rick Brysacz",
  property_management_company: "Griffin Structures",
  general_contractor: "",
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
  general: `<p><strong>PART 1 - GENERAL</strong></p><p><strong>1.01 SUMMARY</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Section Includes:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Verkada cloud-based video surveillance solution including:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Verkada Command cloud-based management platform</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Edge-based video analytics</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Indoor Dome Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Outdoor Dome Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Mini Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Bullet Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Fisheye Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Multisensor Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Pan-Tilt-Zoom (PTZ) cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>FIPS-Validated cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Command Connector</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Viewing Station</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>PoE Injectors</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Camera mounts, adapters, and accessories</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Cellular Gateways</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Wi-Fi Gateways</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada Camera Selector User Guide for assistance selecting the appropriate camera for field of view, form factor, zoom, resolution, video retention, and other selection factors.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for Occupancy Trends for more information regarding the deployment of the Occupancy Trends People Analytics feature.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for License Plate Recognition (LPR) for more information regarding camera selection as well as camera placement, installation, and setup for LPR use cases.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for People Analytics for more information regarding key features, optimizing performance, camera selection and placement, lighting, privacy, and other selection factors.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for Camera Setup Best Practices for more information regarding the following camera networking best practices:</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Related Sections</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 10 00 – Access Control</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 15 23 – Intercom Entry Systems</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 17 11 – Visitor Management Systems</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 30 00 – Environmental Sensor</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 31 00 – Intrusion Detection</li></ol><p><strong>1.02 REFERENCES</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Published specifications, standards, tests, Codes, or recommended standards of trade, industry, or governmental organizations apply to work in these Sections, including:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ADA – Americans with Disabilities Act</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ANSI – American National Standards Institute</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ASCII – American Standard Code for Information Interchange</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ASTM – American Society for Testing and Materials</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>IBC – International Building Code</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>IEEE – Institute of Electrical and Electronics Engineers</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ISO/IEC – International Organization for Standardization / International Electrotechnical Commission</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NEC – National Electrical Code</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NEMA – National Electrical Manufacturers’ Association</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NFPA – National Fire Protection Association</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>TIA/EIA – Telecommunications Industry Association / Electronic Industries Alliance</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>UL – Underwriters Laboratories, Inc.</li></ol><p><strong>1.03 DEFINITIONS</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><strong style="background-color: yellow;">#ABBREVIATIONS#</strong></li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Definitions:</li></ol><p><strong>1.04 SYSTEM DESCRIPTION</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>A hybrid cloud video surveillance system with storage and image processing on edge devices managed through the Verkada Command cloud platform.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Verkada Command Management Software</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Access and management for all cameras and users across all sites. Command management functions include:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Set up new cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Create and manage sites at scale</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>One-click device install:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Add devices without assigning a site or configuring the device upfront.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>New devices will be added to and “Unassigned Devices” list</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Immediately check if device is online and see live data</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Manage camera device and system settings.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Access live and archived footage</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Manage users</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Security and Permissions:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>SAML/OAuth support for single sign-on</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>2-factor authentication options</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>User permissions can be controlled at camera, site, and organization levels</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Remote Access</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Web app access</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Native apps for iOS, Android, and the Verkada VX52 Viewing Station</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Archiving and Sharing:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Command licenses include unlimited cloud archiving.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Export footage in MP4 format.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Create and share Live Links via text or email.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Extended Cloud Backup (ECB)</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Flexible Structure:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Extend cloud backup in 30-day increments (“packs”)</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Packs can be stacked per device</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Self-Service Portal:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Simple License Claiming: Admins can claim ECB licenses directly through the self-service portal.</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Seamless License Management: Easily track usage, and support compliance with retention requirements – all from one central dashboard.</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Automatic Co-Terming: Eliminate the need to manually calculate renewal dates for ECB licenses. ECB licenses will now co-terminate with all other Command product licenses.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Analytics:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>People Analytics:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Intelligent edge-based video processing to identify individuals in a scene.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Filter identified individuals by attributes, including:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Date</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Time</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Appearance</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Clothing color</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Backpack detection</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Facial matches</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>AI-Powered Search:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Use freeform text queries to search for people and vehicles.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Reverse Image Analytics:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Upload a photo of a person, vehicle, or object to obtain relevant search results.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>History Player Search: Instantaneously find footage and construct a chronological timeline of where an individual appeared on multiple cameras across wide areas.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Face Search: Quickly search for matching people by selecting an existing face from organizational records uploaded image.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Face Blur:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Live Face Blur:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Blur faces of individuals detected in camera live streams for privacy.</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Admins can enable Live Face Blur by default for all cameras while also giving users the option to unblur faces in case of an incident.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Selective Face Blur:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Choose which archived faces to blur to support the privacy of individuals stored in an archive.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person History:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Browse through snapshots of people detected in frame.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Save snapshots or access associated full-resolution video.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Occupancy Trends:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Estimate how many people cross a designated line in a camera field of view.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Cross-Camera Tracking:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Search video from different cameras of the same identified individual.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person Line Crossing: trigger an alarm if a person crosses a predetermined digital line in a specified direction.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span><span style="color: black;">Direction of Travel: trigger an alarm by specified direction of travel detection.</span></li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span><span style="color: black;">Person Line Crossing: </span>trigger an alarm if a person crosses a predetermined digital line in a specified direction.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person or Vehicle Loitering: trigger an alarm if a person or vehicle is continuously detected in a pre-selected region beyond a certain time threshold.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person of Interest (POI) and License Plate of Interest (LPOI):</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Receive real-time POI alerts on the live feed when viewing a single camera page.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>POI alerts display associated LPOI and vice versa.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Vehicle Analytics:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Intelligent edge-based video processing to identify vehicles in a scene.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Filter identified vehicles by attributes, including:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Date.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Time.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Vehicle make.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Color.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Vehicle body type.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle History:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Browse through snapshots of vehicles detected in-frame.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Save snapshots or associated full-resolution video</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Cross-Camera Tracking:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Search video from different cameras of the same identified vehicle.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle Number Tracking: draw a digital line on the video feed and get an estimate of how many vehicles crossed that line.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle Line Crossing: trigger an alarm if a vehicle crosses a predetermined digital line in a specified direction.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle Loitering: trigger an alarm if a vehicle is continuously detected in a pre-selected region beyond a certain time threshold.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>License Plate Recognition:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>LPR coverage, monitoring, and search by plate number.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Generate License Plate of Interest Alerts via SMS or email with an image or link to review the associated footage.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>License Plate Recognition Unlock:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>LPR unlock utilizes a peer-to-peer communication protocol to facilitate secure device-to-device interactions between LPR-enabled CB52 and CB62 bullet cameras and Verkada’s AC42 and AC62 door controllers.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>LPR camera results can be used as an input method for a gate, unlocking that gate anytime an authorized license plate is verified by the access controller.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>License plates can be added to any access user profile. All unlock events from a license plate are attributed to an access user.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Unified Alerts:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Set up and configure alerts for access control, cameras, alarms, and environmental sensors from the Alerts page in Command.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Configure real-time alerts via SMS, email, Microsoft Teams, and Slack.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Search Alert Inbox for alert names, filter across all alerts, star alerts, and create custom sections for related alerts.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Enhanced Sensor Alerts:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>All sensors paired with a context camera to display:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>People detection thumbnails show all people detected before, during, and after a sensor alert.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>People activity overlay on the sensor alert graph to mark people's activity.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Third-Party VMS Integrations for Air Quality Sensor Events:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Send sensor event alerts to the following third-party video management systems: Milestone XProtect, Wisenet WAVE, exacqVision.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>AI-Powered Alerts:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Use freeform language to set up alerts on events of interest.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Create alerts based on AI-powered search queries.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Shortcuts Navigation Tool:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Available for both live streams and historic views:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Instantly jump between neighboring camera feeds to quickly track moving subjects during live investigations.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Trace a subject’s movements from camera to camera to review and archive a subject's path in historic views.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Adaptive Quality with Variable Bitrates: Cameras use variable bitrates for both SQ and HQ video allowing for video to be recorded at a lower bitrate during less complex scenes and a higher bitrate during more complex scenes.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>PTZ Sentry Mode:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Patrol multiple scenes when a live operator is not available.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Select up to 25 preset views.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Configure how long Sentry Mode dwells on each scene (30 seconds to 24 hours).</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Verkada Verify:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Browser-based tool that allows anyone in possession of footage from a Verkada camera to verify its authenticity.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Verify recorded footage by uploading the file at <a href="https://command.verkada.com/verify" rel="noopener noreferrer" target="_blank">verkada.com/verify</a>.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Enterprise Bandwidth Manager (EBM):</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Set bandwidth limits for all camera upload traffic, including video archiving, cloud backup, and timelapse.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Monitor real-time bandwidth usage and selectively terminate active video streams to free up bandwidth.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Application Programming Interface:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Streaming API: Stream both live and historical footage from cameras; ingest footage into third-party Global Security Operations Center (GSOC) software for live monitoring or into customized analytics software for operational insights.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Occupancy Trend Data API: extract foot or vehicle traffic data for further analysis.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Access Events Webhooks: integrate real-time system insights into third-party applications.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>AWS GovCloud:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Optional for US government deployments.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Continuous monitoring of the system.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>FIPS encryption in transit and at rest.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Strengthened session and identity management capabilities.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Data Hosting:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Option to process and store data, including image and video data, locally in Verkada data centers in the United States, European Union, or Australia.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Customize image and video storage location on an org-wide or camera-by-camera basis.</li></ol><p><strong>1.05 SUBMITTALS</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide the following submittals for review and approval:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Product Data and Shop Drawings</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>System Programming</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Operation and Maintenance Manuals (O&amp;M’s)</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>“As-Built” Record Drawings</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit Product Data and Shop Drawings submittals for review and approval prior to commencement of work:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Manufacturer's name, brand name, exact part number, options, accessories, and catalog cutsheet references for all equipment supplied including cabling. Include manufacturer’s published installation instructions. Indicate UL listings for system components.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Complete wiring diagrams for all components, including cable types and quantities, routings, floor plans indicating device locations, conduit sizes, and point-to-point termination and riser diagrams.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Device legend on the shop drawings that identifies the symbols used for all devices including mounting heights, back box requirements, part and model numbers, operating voltages (if applicable), wire and cabling requirements, label text, and panel termination points.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Fully dimensioned shop drawings including floorplans, enlarged plans, elevations, and installation details of all security devices, equipment rooms and closets, consoles, controllers, racks, enclosures, and fabricated equipment, showing locations of all major components including mounting details. Indicate UL system and rating listings for penetration firestop systems through rated partitions and floors.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Bill of Materials.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Material Safety Data Sheets (MSDS) for fire stopping materials and sealants.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit System Programming submittals for review and approval prior to commencement of work:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Proposed programming, including nomenclature conventions, device names and text descriptions, timings, camera call-up trigger alarms with associated cameras, and sequence of operations.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Approved device names and text descriptions as programmed into the security systems shall be reflected on the “As-Built” Record Drawings as well as on device and cable labels.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit Operation and Maintenance Manuals (O&amp;M’s) submittals for review and approval prior to the completion of the project:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Updated product data and shop drawings submittals reflecting the final conditions.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Warranty letter with start and end date.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Warranty service and maintenance contact information: including names, address, phone number, and website address. Provide specific instructions or forms as required to initiate a trouble ticket or work order request.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Letter indicating that all software and licensing is the sole property of the Owner.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Troubleshooting checklist information.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Replacement parts and consumables ordering information including the contact information for local sources.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Provide an updated System Programming submittal including:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Final listing of doors, locations, and normal status in CSV format.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>System administration and management operating instructions.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Setting up Users, User Groups, Access Levels, Doors, Door Schedules, and Exceptions</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Assigning Access Groups to all Users.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Monitoring system activity.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Running standard reports.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Setting up logins and permissions.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit “As-Built” Record Drawings submittals for review and approval prior to the completion of the project:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain a complete set of “As-Built” Record Drawings at the project site updated with mark-ups of the actual installation conditions.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Prior to the completion of the project transfer all installation conditions mark-ups to electronic drawings and submit to the Owner in CAD and PDF formats.</li></ol><p><strong>1.06 QUALITY ASSURANCE</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Equipment shall be tested and found to comply with the limits for a Class A or B digital device, pursuant to part 15 of the FCC rules.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Security technology devices shall be mounted using compatible Verkada accessories.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Security technology devices shall be of the latest technology. No discontinued models or products are acceptable.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Installation technicians shall successfully complete the Verkada Certified Engineer (VCE) program prior to starting work. For more information, visit <a href="http://www.verkada.com/partners/trainings" rel="noopener noreferrer" target="_blank">http://www.verkada.com/partners/trainings</a>.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Contractor qualifications:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Minimum of two years of system design, engineering supervision, and installation experience in the access control industry.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain a local office, with a service center staffed by trained technicians and must be adequately equipped to provide emergency phone service within 24 hours on a 24-hour, 365 days per year basis, whether or not the Owner purchases a maintenance contract with the Contractor.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain an inventory of spare parts and other items critical to system operation, as necessary to meet the emergency service requirements.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain an in-house engineering and project management capability consistent with the requirements of this project.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Provide a project manager who is actively engaged in the project. This person shall be the same individual throughout the course of the project and shall be the person responsible for the scheduling of the system programming, preparation of the submittals and project close-out documentation, training programs, system testing and report documentation, and the coordination of all subcontract labor. The Owner reserves the right to approve the Contractor’s project manager.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Abide by and adhere to all Drug Free School Zone laws and participate in a drug-free workplace program.</li></ol><p><strong>1.07 DELIVERY, STORAGE AND HANDLING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Ship equipment in original packaging to prevent damage. All handling shall be in accordance with manufacturer recommendations. Inspect all products and materials for any damage immediately upon delivery to the project site.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide protective covering during construction.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Replace equipment and products damaged during shipping, handling, distribution, storage, installation, or construction with new equipment and products.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Equipment and products stored at the project site or at an off-site location shall be protected from dust, dirt, and foreign matter. Protect equipment and products from water, damage, dents, bumps, and scratches.</li></ol><p><strong>1.08 SCHEDULING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit proposed construction schedule detailing the task milestones, durations, and sequences for the project for review and approval prior to commencement of work.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>When work is performed in a sensitive area or in an area occupied with ongoing business activities coordinate with the Owner and the affected department’s representative to determine the best time to perform the work required.</li></ol><p><strong>1.09 WARRANTY</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide one-year parts and labor project warranty. Parts and labor shall be guaranteed against defects in materials and workmanship for one year from written notification of acceptance.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>All Verkada hardware purchases are backed by a 10-year limited warranty. For more information, visit <a href="verkada.com/support/terms-of-sale" rel="noopener noreferrer" target="_blank">verkada.com/support/terms-of-sale</a>.</li></ol>`,
  execution: `<p><strong>PART 3 - EXECUTION</strong></p><p><strong>3.01 INSTALLERS</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Installation shall be performed by technicians that have successfully completed the Verkada Certified Engineer (VCE) program. For more information, visit www.verkada.com/partners/trainings.</li></ol><p><strong>3.02 EXAMINATION</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Installation surfaces shall be clean and free from dust, dirt, and obstructions.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Examine pathway elements intended for cables. Check raceways, cable trays, and other elements for compliance with space allocations, installation tolerances, hazards to cable installation, and other conditions affecting installation.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Examine rough-in for LAN and control cable conduit systems to server, PCs, controllers, cameras, and other cable-connected devices to verify actual locations of conduit and back boxes before device installation.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Proceed with installation only after unsatisfactory conditions have been corrected.</li></ol><p><strong>3.03 PREPARATION</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada Quick Start Guide applicable to each product.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Pre-Installation Conference: Prior to installation arrange conference between supplier, Owner, and related trades to review materials, procedures, and coordinating related work.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Furnish or coordinate any inserts required for building into concrete, masonry, and other work, to support and attach work of this Section. Furnish or coordinate in ample time to comply with schedule of work into which inserts are built.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Verify that power and outlets are in correct locations.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Verify that building structure is properly prepared for mounting, attachment, and support of equipment.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Prior to installation of systems components and devices, verify all required preparations have been properly performed and that substrates are acceptable for installation.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Verify all rough-ins and field dimensions.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Report in writing to the Owner’s representative any prevailing conditions that will adversely affect satisfactory execution of work in this Section.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Owner or their representative reserves the right to review proposed methods of construction and installation, reject proposed methods, and have the installation done in a satisfactory method at the Contractor's cost.</li></ol><p><strong>3.04 INSTALLATION</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada Quick Start Guide applicable to each product.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>For support, proceed to www.verkada.com/support.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Sequencing: The work shall be performed in the following sequence, unless directed otherwise by Owner or their representative:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Installation of cables and network.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Installation of new cameras.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Installation of front-end equipment.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Commissioning of the new system components.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>End User training</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Install work in accordance with manufacturer's recommendations and instructions as well as final shop drawings. All components should be installed so as to allow easy access for service in the future.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Anchor components securely in place, plumb, level, and accurately aligned.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>For solution products located in equipment traffic areas, and that are exposed to damage due to collision or impact from forklifts, or manually moved carts, carriers, or other equipment used by the Owner, provide protective bollards, railings, coverings etc. to ensure that all products installed are properly protected from such damage.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide fastenings, plates, and other incidental items required for complete and operational installation.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide required electrical work in accordance with Code requirements.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Security and protection:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain strict security during the installation of equipment and software. Rooms housing the control station, and workstations that have been powered up shall be locked and secured during periods when a qualified operator in the employ of Contractor is not present.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Equipment protection: Provide protective covers, fenders, and barriers as necessary to maintain work of this Section in same condition as installed until time of substantial completion.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Cable requirements:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Twisted, shielded, plenum-rated type cable shall be used.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>All exposed cables shall be in rigid conduit, electrical metallic tubing (EMT) raceway, or wire mold as approved by the Owner.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>All concealed cables routed in j-hook pathways shall be fastened to the structure at least every four feet.</li></ol><p><strong>3.05 LABELING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Equipment and product labels shall be printed on self-adhesive labels. Handwritten labels or writing directly on the equipment enclosures is not acceptable.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Label equipment and products with the device address as programmed into the security systems and as reflected on the “As-Built” Record Drawings.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Label networked equipment enclosures with the IP address.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Cables shall be individually labeled at origin and termination.</li></ol><p><strong>3.06 PROGRAMMING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Complete all Verkada Command configuration programming.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Add all Verkada Cameras to Command via serial number.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Contract will coordinate with the Owner to ensure that new components have appropriate network connections.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Coordinate with the Owner to ensure that new components will be properly programmed into the system.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Change default passwords to new custom secure passwords as directed by the Owner.</li></ol><p><strong>3.07 ACCEPTANCE TESTING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Final Test and Acceptance Plan</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Develop a final test and acceptance plan to identify each new system component, intent of test, test method, and expected results.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Each component listed in the plan shall include space for test part signatures, brief comments, time of test and pass/fail check boxes.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Test all equipment, products, and devices in accordance with the plan to ensure completely operational and fully functional security systems. Submit a written final test and acceptance report for review and approval.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>The report shall be submitted to the Owner’s representative at least 30 days prior to the scheduled system acceptance test.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>System acceptance of the access control system shall be conditioned upon successful completion and operational demonstration of all system functions and components as documented in the final test and acceptance report.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>System Acceptance</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>System acceptance shall not occur until after the following activities have been successfully completed:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Correction of all deficiencies and punch list items noted on the final test and acceptance report.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Acceptance of final test and acceptance report.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Acceptance of all project close-out submittals.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Delivery of final project close-out documentation.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Successful training and demonstration, including operation of systems, systems administration, and system management.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Purging of Contractor user privileges and return of all credentials.</li></ol><p><strong>3.08 OWNER PERSONNEL TRAINING </strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>On-site operator training:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Instruct operating staff in proper operation, including hands-on training.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Minimum of two, four-hour sessions covering the operations for each system installed.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Training sessions shall be provided to supervisors, end-user staff, security staff, maintenance personnel, IT personnel, and any other personnel designated by the Owner.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Provide training sessions on all work shifts, including day, evening, and night shifts.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>On-site administrator training:</li></ol><p>Instruct security system administrators for each system installed, including hands-on training.</p><ol><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Minimum of two, four-hour sessions covering the operations for each system installed.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Training shall cover all administrative and management functions, including features and controls, for each system.</li></ol>`,
  definitions: "",
  submittals: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Provide the following submittals for review and approval:</span></p><ol><li><span style="color: rgb(0, 0, 0);">Product Data and Shop Drawings</span></li><li>System Programming</li><li><span style="color: rgb(0, 0, 0);">Operation and Maintenance Manuals (O&amp;M’s)</span></li><li><span style="color: rgb(0, 0, 0);">“As-Built” Record Drawings</span></li></ol><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Submit Product Data and Shop Drawings submittals for review and approval prior to commencement of work:</span></p><ol><li>Manufacturer's name, brand name, exact part number, options, accessories, and catalog cutsheet references for all equipment supplied including cabling. Include manufacturer’s published installation instructions. Indicate UL listings for system components.</li><li>Complete wiring diagrams for all components, including cable types and quantities, routings, floor plans indicating device locations, conduit sizes, and point-to-point termination and riser diagrams.</li><li>Device legend on the shop drawings that identifies the symbols used for all devices including mounting heights, back box requirements, part and model numbers, operating voltages (if applicable), wire and cabling requirements, label text, and panel termination points.</li><li>Fully dimensioned shop drawings including floorplans, enlarged plans, elevations, and installation details of all security devices, equipment rooms and closets, consoles, controllers, racks, enclosures, and fabricated equipment, showing locations of all major components including mounting details. Indicate UL system and rating listings for penetration firestop systems through rated partitions and floors.</li><li>Bill of Materials.</li><li>Material Safety Data Sheets (MSDS) for fire stopping materials and sealants.</li></ol><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Submit System Programming submittals for review and approval prior to commencement of work:&nbsp;</span></p><ol><li>Proposed programming, including nomenclature conventions, device names and text descriptions, timings, camera call-up trigger alarms with associated cameras, and sequence of operations.</li><li>Approved device names and text descriptions as programmed into the security systems shall be reflected on the “As-Built” Record Drawings as well as on device and cable labels.</li></ol><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Submit Operation and Maintenance Manuals (O&amp;M’s) submittals for review and approval prior to the completion of the project:</span></p><ol><li>Updated product data and shop drawings submittals reflecting the final conditions.</li><li>Warranty letter with start and end date.</li><li>Warranty service and maintenance contact information: including names, address, phone number, and website address. Provide specific instructions or forms as required to initiate a trouble ticket or work order request.</li><li>Letter indicating that all software and licensing is the sole property of the Owner.</li><li>Troubleshooting checklist information.</li><li>Replacement parts and consumables ordering information including the contact information for local sources.</li><li>Provide an updated System Programming submittal including:</li></ol><ul><li><span style="color: rgb(0, 0, 0);">a.&nbsp;Final listing of doors, locations, and normal status in CSV format.</span></li><li><span style="color: rgb(0, 0, 0);">b.&nbsp;System administration and management operating instructions.&nbsp;</span></li><li><span style="color: rgb(0, 0, 0);">c.&nbsp;Setting up Users, User Groups, Access Levels, Doors, Door Schedules, and Exceptions.</span></li><li><span style="color: rgb(0, 0, 0);">d.&nbsp;Assigning Access Groups to all Users.</span></li><li><span style="color: rgb(0, 0, 0);">e.&nbsp;Monitoring system activity.</span></li><li><span style="color: rgb(0, 0, 0);">f.&nbsp;Running standard reports.</span></li><li><span style="color: rgb(0, 0, 0);">g.&nbsp;Setting up logins and permissions.</span></li></ul><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Submit “As-Built” Record Drawings submittals for review and approval prior to the completion of the project:</span></p><ol><li>Maintain a complete set of “As-Built” Record Drawings at the project site updated with mark-ups of the actual installation conditions.</li><li>Prior to the completion of the project transfer all installation conditions mark-ups to electronic drawings and submit to the Owner in CAD and PDF formats.</li></ol>`,
  installers: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Installation shall be performed by technicians that have successfully completed the Verkada Certified Engineer (VCE) program. For more information, visit www.verkada.com/partners/trainings.&nbsp;</span></p>`,
  examination: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Installation surfaces shall be clean and free from dust, dirt, and obstructions. </span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Examine pathway elements intended for cables. Check raceways, cable trays, and other elements for compliance with space allocations, installation tolerances, hazards to cable installation, and other conditions affecting installation. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Examine rough-in for LAN and control cable conduit systems to server, PCs, controllers, cameras, and other cable-connected devices to verify actual locations of conduit and back boxes before device installation. </span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Proceed with installation only after unsatisfactory conditions have been corrected.</span></p>`,
  preparation: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Refer to the Verkada Quick Start Guide applicable to each product.</span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Pre-Installation Conference: Prior to installation arrange conference between supplier, Owner, and related trades to review materials, procedures, and coordinating related work. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Furnish or coordinate any inserts required for building into concrete, masonry, and other work, to support and attach work of this Section. Furnish or coordinate in ample time to comply with schedule of work into which inserts are built. </span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Verify that power and outlets are in correct locations. </span></p><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Verify that building structure is properly prepared for mounting, attachment, and support of equipment. </span></p><p><span style="color: rgb(0, 0, 0);">F.&nbsp;Prior to installation of systems components and devices, verify all required preparations have been properly performed and that substrates are acceptable for </span></p><ol><li>Verify all rough-ins and field dimensions.</li></ol><p><span style="color: rgb(0, 0, 0);">G.&nbsp;Report in writing to the Owner’s representative any prevailing conditions that will adversely affect satisfactory execution of work in this Section. </span></p><ol><li>Owner or their representative reserves the right to review proposed methods of construction and installation, reject proposed methods, and have the installation done in a satisfactory method at the Contractor's cost.</li></ol>`,
  installation: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Refer to the Verkada Quick Start Guide applicable to each product.</span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;For support, proceed to www.verkada.com/support.</span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Sequencing:&nbsp;The work shall be performed in the following sequence, unless directed otherwise by Owner or their representative:&nbsp;</span></p><ol><li>Installation of cables and network.&nbsp;</li><li>Installation of new cameras.</li><li>Installation of front-end equipment.</li><li>Commissioning of the new system components.</li><li>End User training</li></ol><p>D. Install work in accordance with manufacturer's recommendations and instructions as well as final shop drawings. All components should be installed so as to allow easy access for service in the future.&nbsp;</p><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Anchor components securely in place, plumb, level, and accurately aligned. </span></p><p><span style="color: rgb(0, 0, 0);">F.&nbsp;For solution products located in equipment traffic areas, and that are exposed to damage due to collision or impact from forklifts, or manually moved carts, carriers, or other equipment used by the Owner, provide protective bollards, railings, coverings etc. to ensure that all products installed are properly protected from such damage.&nbsp;</span></p><p><span style="color: rgb(0, 0, 0);">G.&nbsp;Provide fastenings, plates, and other incidental items required for complete and operational installation. </span></p><p><span style="color: rgb(0, 0, 0);">H.&nbsp;Provide required electrical work in accordance with Code requirements.</span></p><p><span style="color: rgb(0, 0, 0);">I.&nbsp;Security and protection:&nbsp;</span></p><ol><li>Maintain strict security during the installation of equipment and software. Rooms housing the control station, and workstations that have been powered up shall be locked and secured during periods when a qualified operator in the employ of Contractor is not present.</li><li>Equipment protection: Provide protective covers, fenders, and barriers as necessary to maintain work of this Section in same condition as installed until time of substantial completion.</li></ol><p>J. Cable requirements:</p><ol><li>Twisted, shielded, plenum-rated type cable shall be used.&nbsp;</li><li>All exposed cables shall be in rigid conduit, electrical metallic tubing (EMT) raceway, or wire mold as approved by the Owner.</li><li>All concealed cables routed in j-hook pathways shall be fastened to the structure at least every four feet.</li></ol>`,
  labeling: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Equipment and product labels shall be printed on self-adhesive labels. Handwritten labels or writing directly on the equipment enclosures is not acceptable.</span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Label equipment and products with the device address as programmed into the security systems and as reflected on the “As-Built” Record Drawings. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Label networked equipment enclosures with the IP address.</span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Cables shall be individually labeled at origin and termination.</span></p>`,
  programming: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Complete all Verkada Command configuration programming. </span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Add all Verkada Cameras to Command via serial number. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Contract will coordinate with the Owner to ensure that new components have appropriate network connections. </span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Coordinate with the Owner to ensure that new components will be properly programmed into the system.</span></p><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Change default passwords to new custom secure passwords as directed by the Owner.</span></p>`,
  acceptance_testing: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Final Test and Acceptance Plan</span></p><ol><li>Develop a final test and acceptance plan to identify each new system component, intent of test, test method, and expected results.</li><li>Each component listed in the plan shall include space for test part signatures, brief comments, time of test and pass/fail check boxes.</li><li>Test all equipment, products, and devices in accordance with the plan to ensure completely operational and fully functional security systems. Submit a written final test and acceptance report for review and approval.</li><li>The report shall be submitted to the Owner’s representative at least 30 days prior to the scheduled system acceptance test.&nbsp;</li><li>System acceptance of the access control system shall be conditioned upon successful completion and operational demonstration of all system functions and components as documented in the final test and acceptance report.</li></ol><p><span style="color: rgb(0, 0, 0);">B.&nbsp;System Acceptance&nbsp;</span></p><ol><li>System acceptance shall not occur until after the following activities have been successfully completed:&nbsp;</li></ol><ul><li><span style="color: rgb(0, 0, 0);">a.&nbsp;Correction of all deficiencies and punch list items noted on the final test and acceptance report.</span></li><li><span style="color: rgb(0, 0, 0);">b.&nbsp;Acceptance of final test and acceptance report.</span></li><li><span style="color: rgb(0, 0, 0);">c.&nbsp;Acceptance of all project close-out submittals.</span></li><li><span style="color: rgb(0, 0, 0);">d.&nbsp;Delivery of final project close-out documentation.</span></li><li><span style="color: rgb(0, 0, 0);">e.&nbsp;Successful training and demonstration, including operation of systems, systems administration, and system management.</span></li><li><span style="color: rgb(0, 0, 0);">f.&nbsp;Purging of Contractor user privileges and return of all credentials.</span></li></ul>`,
  owner_personnel_training: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;On-site operator training:&nbsp;</span></p><ol><li><span style="color: rgb(0, 0, 0);">Instruct operating staff in proper operation, including hands-on training.&nbsp;</span></li><li>Minimum of two, four-hour sessions covering the operations for each system installed.&nbsp;</li><li>Training sessions shall be provided to supervisors, end-user staff, security staff, maintenance personnel, IT personnel, and any other personnel designated by the Owner.&nbsp;</li><li>Provide training sessions on all work shifts, including day, evening, and night shifts.</li></ol><p><span style="color: rgb(0, 0, 0);">B.&nbsp;On-site administrator training:&nbsp;</span></p><ol><li>Minimum of two, four-hour sessions covering the operations for each system installed.</li><li>Training shall cover all administrative and management functions, including features and controls, for each system.</li></ol>`,
  sales_rep_contact: "",
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
  const reps = [
    { label: "Dan Bettencourt", value: "dan.bettencourt@verkada.com" },
    { label: "CJ Corry", value: "cj.corry@verkada.com" },
    { label: "Eric Talley", value: "eric.talley@verkada.com" },
    { label: "Ashley Ott", value: "ashley.ott@verkada.com" },
    { label: "Miles Anderson", value: "miles.anderson@verkada.com" },
    { label: "Chad Cooper", value: "chad.cooper@verkada.com" },
  ];
  return (
    <div className="min-h-screen">
      <div className="">
        <Tabs
          defaultValue="edit"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
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
                          Project Details
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Lead Information
                          </h3>
                          <div className="border-t-[1px] border-[#c2c2c2] mx-[-15px]"></div>
                          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="rep"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                A&E Rep *
                              </Label>
                              {/* <Select
                                onValueChange={(value) =>
                                  setFieldValue("rep", value)
                                }
                                value={values.rep}
                              >
                                <SelectTrigger className="rounded-lg text-left">
                                  <SelectValue placeholder="Select a Rep" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value="dan.bettencourt@verkada.com"
                                    className="text-left"
                                  >
                                    Dan Bettencourt
                                  </SelectItem>
                                  <SelectItem value="CJ Corry">
                                    CJ Corry
                                  </SelectItem>
                                  <SelectItem value="Eric Talley">
                                    Eric Talley
                                  </SelectItem>
                                  <SelectItem value="Ashley Ott">
                                    Ashley Ott
                                  </SelectItem>
                                  <SelectItem value="Miles Anderson">
                                    Miles Anderson
                                  </SelectItem>
                                  <SelectItem value="Chad Cooper">
                                    Chad Cooper
                                  </SelectItem>
                                </SelectContent>
                              </Select> */}

                              <Select
                                onValueChange={(value) =>
                                  setFieldValue("rep", value)
                                }
                                value={values.rep}
                              >
                                <SelectTrigger className="rounded-lg text-left">
                                  <SelectValue placeholder="Select a Rep" />
                                </SelectTrigger>
                                <SelectContent>
                                  {reps.map((rep) => (
                                    <SelectItem
                                      key={rep.value}
                                      value={rep.value}
                                      className="text-left"
                                    >
                                      {rep.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.rep && touched.rep && (
                                <p className="text-red-500 text-xs">
                                  {errors.rep}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="first_name"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                First Name *
                              </Label>
                              <Field
                                as={Input}
                                id="first_name"
                                name="first_name"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.first_name && touched.first_name
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.first_name && touched.first_name && (
                                <p className="text-red-500 text-xs">
                                  {errors.first_name}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="last_name"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Last Name *
                              </Label>
                              <Field
                                as={Input}
                                id="last_name"
                                name="last_name"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.last_name && touched.last_name
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.last_name && touched.last_name && (
                                <p className="text-red-500 text-xs">
                                  {errors.last_name}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="project_role"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Title & Role in the Project
                              </Label>
                              <Field
                                as={Input}
                                id="project_role"
                                name="project_role"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.project_role && touched.project_role
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.project_role && touched.project_role && (
                                <p className="text-red-500 text-xs">
                                  {errors.project_role}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="company_name"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Company *
                              </Label>
                              <Field
                                as={Input}
                                id="company_name"
                                name="company_name"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.company_name && touched.company_name
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.company_name && touched.company_name && (
                                <p className="text-red-500 text-xs">
                                  {errors.company_name}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="email"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Email *
                              </Label>
                              <Field
                                as={Input}
                                id="email"
                                name="email"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.email && touched.email ? "" : ""
                                )}
                              />
                              {errors.email && touched.email && (
                                <p className="text-red-500 text-xs">
                                  {errors.email}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="phone_number"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Phone Number *
                              </Label>
                              <Field
                                as={Input}
                                id="phone_number"
                                name="phone_number"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.phone_number && touched.phone_number
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.phone_number && touched.phone_number && (
                                <p className="text-red-500 text-xs">
                                  {errors.phone_number}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Project Information
                          </h3>
                          <div className="border-t-[1px] border-[#c2c2c2] mx-[-15px]"></div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="project_name"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Project Name *
                              </Label>
                              <Field
                                as={Input}
                                id="project_name"
                                name="project_name"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.project_name && touched.project_name
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.project_name && touched.project_name && (
                                <p className="text-red-500 text-xs">
                                  {errors.project_name}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="project_description"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Project Description
                              </Label>
                              <Field
                                as={Input}
                                id="project_description"
                                name="project_description"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.project_description &&
                                    touched.project_description
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.project_description &&
                                touched.project_description && (
                                  <p className="text-red-500 text-xs">
                                    {errors.project_description}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="project_type"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Project Type
                              </Label>
                              <Select
                                onValueChange={(value) =>
                                  setFieldValue("project_type", value)
                                }
                                value={values.project_type}
                              >
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select a Project Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Education (K-12 or Higher Ed)">
                                    {`Education (K-12 or Higher Ed)`}
                                  </SelectItem>
                                  <SelectItem value="Residential / Multi-family/ Senior Care/ Student Housing">
                                    Residential / Multi-family/ Senior Care/
                                    Student Housing
                                  </SelectItem>
                                  <SelectItem value="Mixed Use Commercial">
                                    Mixed Use Commercial
                                  </SelectItem>
                                  <SelectItem value="Hospitality">
                                    Hospitality
                                  </SelectItem>
                                  <SelectItem value="Industrial / Manufacturing">
                                    Industrial / Manufacturing
                                  </SelectItem>
                                  <SelectItem value="Master Planned Community">
                                    Master Planned Community
                                  </SelectItem>
                                  <SelectItem value="Healthcare / Biotech">
                                    Healthcare / Biotech
                                  </SelectItem>
                                  <SelectItem value="Entertainment / Arts / Sports">
                                    Entertainment / Arts / Sports
                                  </SelectItem>
                                  <SelectItem value="Municipality / Government / Public Utility">
                                    Municipality / Government / Public Utility
                                  </SelectItem>
                                  <SelectItem value="Transportation / Aviation / Aerospace">
                                    Transportation / Aviation / Aerospace
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.project_type && touched.project_type && (
                                <p className="text-red-500 text-xs">
                                  {errors.project_type}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="project_location"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Project Location (City, State/province,
                                Country):
                              </Label>
                              <Field
                                as={Input}
                                id="project_location"
                                name="project_location"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.project_location &&
                                    touched.project_location
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.project_location &&
                                touched.project_location && (
                                  <p className="text-red-500 text-xs">
                                    {errors.project_location}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="construction_type"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Construction Type
                              </Label>
                              <Select
                                onValueChange={(value) =>
                                  setFieldValue("construction_type", value)
                                }
                                value={values.construction_type}
                              >
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select a Construction Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Ground Up">
                                    Ground Up
                                  </SelectItem>
                                  <SelectItem value="1st Generation Buildout">
                                    1st Generation Buildout
                                  </SelectItem>
                                  <SelectItem value="2nd Generation Buildout">
                                    2nd Generation Buildout
                                  </SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.construction_type &&
                                touched.construction_type && (
                                  <p className="text-red-500 text-xs">
                                    {errors.construction_type}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="project_stage"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                What stage is the project in?:
                              </Label>
                              <Select
                                onValueChange={(value) =>
                                  setFieldValue("project_stage", value)
                                }
                                value={values.project_stage}
                              >
                                <SelectTrigger className="rounded-lg">
                                  <SelectValue placeholder="Select a Project Stage" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Programming / Planning (Stage 1)">
                                    {`Programming / Planning (Stage 1)`}
                                  </SelectItem>
                                  <SelectItem value="Schematic Design (Stage 2)">
                                    {`Schematic Design (Stage 2)`}
                                  </SelectItem>
                                  <SelectItem value="Design Development (Stage 3)">
                                    {`Design Development (Stage 3)`}
                                  </SelectItem>
                                  <SelectItem value="Construction Documents (Stage 4)">
                                    {`Construction Documents (Stage 4)`}
                                  </SelectItem>
                                  <SelectItem value="Permitting">
                                    {`Permitting`}
                                  </SelectItem>
                                  <SelectItem value="Preconstruction / Bidding / Procurement (Stage 5)">
                                    {`Preconstruction / Bidding / Procurement (Stage 5)`}
                                  </SelectItem>
                                  <SelectItem value="Core & Shell Construction">
                                    {`Core & Shell Construction`}
                                  </SelectItem>
                                  <SelectItem value="Interior Buildout">
                                    {`Interior Buildout`}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.project_stage &&
                                touched.project_stage && (
                                  <p className="text-red-500 text-xs">
                                    {errors.project_stage}
                                  </p>
                                )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="stage_four_completion_date"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Construction Documents (Stage 4) Completion
                                Date:
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal  dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600",
                                      !values.stage_four_completion_date &&
                                        "text-muted-foreground",
                                      errors.stage_four_completion_date &&
                                        touched.stage_four_completion_date
                                        ? ""
                                        : ""
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {values.stage_four_completion_date ? (
                                      format(
                                        values.stage_four_completion_date,
                                        "PPP"
                                      )
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                  <Calendar
                                    mode="single"
                                    selected={
                                      values.stage_four_completion_date as any
                                    }
                                    onSelect={(date) =>
                                      setFieldValue(
                                        "stage_four_completion_date",
                                        date
                                      )
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              {errors.stage_four_completion_date &&
                                touched.stage_four_completion_date && (
                                  <p className="text-red-500 text-xs">
                                    {errors.stage_four_completion_date as any}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="construction_start_date"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Construction Start Date (target):
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal  dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600",
                                      !values.construction_start_date &&
                                        "text-muted-foreground",
                                      errors.construction_start_date &&
                                        touched.construction_start_date
                                        ? ""
                                        : ""
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {values.construction_start_date ? (
                                      format(
                                        values.construction_start_date,
                                        "PPP"
                                      )
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                  <Calendar
                                    mode="single"
                                    selected={
                                      values.construction_start_date as any
                                    }
                                    onSelect={(date) =>
                                      setFieldValue(
                                        "construction_start_date",
                                        date
                                      )
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              {errors.construction_start_date &&
                                touched.construction_start_date && (
                                  <p className="text-red-500 text-xs">
                                    {errors.construction_start_date as any}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="construction_completion_date"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Construction Completion Date (target):
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal  dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600",
                                      !values.construction_completion_date &&
                                        "text-muted-foreground",
                                      errors.construction_completion_date &&
                                        touched.construction_completion_date
                                        ? ""
                                        : ""
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {values.construction_completion_date ? (
                                      format(
                                        values.construction_completion_date,
                                        "PPP"
                                      )
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                  <Calendar
                                    mode="single"
                                    selected={
                                      values.construction_completion_date as any
                                    }
                                    onSelect={(date) =>
                                      setFieldValue(
                                        "construction_completion_date",
                                        date
                                      )
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              {errors.construction_completion_date &&
                                touched.construction_completion_date && (
                                  <p className="text-red-500 text-xs">
                                    {errors.construction_completion_date as any}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="budget"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Estimated Total Security Budget:
                              </Label>
                              <Field
                                as={Input}
                                id="budget"
                                name="budget"
                                className={cn(
                                  "dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.budget && touched.budget ? "" : ""
                                )}
                              />
                              {errors.budget && touched.budget && (
                                <p className="text-red-500 text-xs">
                                  {errors.budget}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-12 gap-4 mt-3">
                            <div className="col-span-12 lg:col-span-12 space-y-1.5">
                              <Label
                                htmlFor="budget"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                What products are you interested in including:
                              </Label>

                              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-2">
                                <FieldArray name="intrested_products">
                                  {() => (
                                    <>
                                      {values.intrested_products.map(
                                        (intrested_product, index) => {
                                          const id = `intrested_product-${index}`;
                                          const isChecked =
                                            values.intrested_products[index]
                                              .checked;

                                          return (
                                            <div
                                              key={index}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setFieldValue(
                                                  `intrested_products[${index}].checked`,
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
                                                {intrested_product.description}
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
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                            Project Team
                          </h3>
                          <div className="border-t-[1px] border-[#c2c2c2] mx-[-15px]"></div>
                          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="end_customer_company"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                End Customer Company * :
                              </Label>
                              <Field
                                as={Input}
                                id="end_customer_company"
                                name="end_customer_company"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.end_customer_company &&
                                    touched.end_customer_company
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.end_customer_company &&
                                touched.end_customer_company && (
                                  <p className="text-red-500 text-xs">
                                    {errors.end_customer_company}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="end_customer_contact"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                End Customer Contact:
                              </Label>
                              <Field
                                as={Input}
                                id="end_customer_contact"
                                name="end_customer_contact"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.end_customer_contact &&
                                    touched.end_customer_contact
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.end_customer_contact &&
                                touched.end_customer_contact && (
                                  <p className="text-red-500 text-xs">
                                    {errors.end_customer_contact}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="architect"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Architect:
                              </Label>
                              <Field
                                as={Input}
                                id="architect"
                                name="architect"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.architect && touched.architect
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.architect && touched.architect && (
                                <p className="text-red-500 text-xs">
                                  {errors.architect}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="mep_engineer"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                MEP Engineer:
                              </Label>
                              <Field
                                as={Input}
                                id="mep_engineer"
                                name="mep_engineer"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.mep_engineer && touched.mep_engineer
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.mep_engineer && touched.mep_engineer && (
                                <p className="text-red-500 text-xs">
                                  {errors.mep_engineer}
                                </p>
                              )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="security_consultant"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Security / Technology Consultant:
                              </Label>
                              <Field
                                as={Input}
                                id="security_consultant"
                                name="security_consultant"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.security_consultant &&
                                    touched.security_consultant
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.security_consultant &&
                                touched.security_consultant && (
                                  <p className="text-red-500 text-xs">
                                    {errors.security_consultant}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="property_management_company"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Property Management Company:
                              </Label>
                              <Field
                                as={Input}
                                id="property_management_company"
                                name="property_management_company"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.property_management_company &&
                                    touched.property_management_company
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.property_management_company &&
                                touched.property_management_company && (
                                  <p className="text-red-500 text-xs">
                                    {errors.property_management_company}
                                  </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                              <Label
                                htmlFor="general_contractor"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                General Contractor (if known):
                              </Label>
                              <Field
                                as={Input}
                                id="general_contractor"
                                name="general_contractor"
                                className={cn(
                                  " dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-slate-400 dark:focus:border-slate-400",
                                  errors.general_contractor &&
                                    touched.general_contractor
                                    ? ""
                                    : ""
                                )}
                              />
                              {errors.general_contractor &&
                                touched.general_contractor && (
                                  <p className="text-red-500 text-xs">
                                    {errors.general_contractor}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="my-1 mt-7 text-black text-[20px] font-semibold">
                          General - Part 1
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
                          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-2 pb-3 space-y-3 mt-3">
                            <Label
                              htmlFor="issuanceDescription"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Issuance Description *
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

                          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-2 pb-3 space-y-3 mt-3">
                            <Label
                              htmlFor="issuanceDate"
                              className="text-sm font-medium text-slate-700 dark:text-slate-300"
                            >
                              Issuance Date *
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
                                {errors.issuanceDate as any}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-3">
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`general`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
                                </div>
                              )}
                            </Field>
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
                      </div>

                      <div>
                        <h4 className="my-1 mt-7 text-black text-[20px] font-semibold">
                          Products - Part 2
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>

                        
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-2 space-y-3 mt-3">
                              <Label
                                htmlFor="sales_rep_contact"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Sales Rep Contact:-
                              </Label>
                              {values?.rep ? (
                                <p className="font-meduim text-[15px]">
                                  {reps.find((rep) => rep.value === values?.rep)
                                    ?.label || "Unknown Rep"}{" "}
                                  - {values?.rep}
                                </p>
                              ) : (
                                <p className="font-meduim text-[15px]">
                                  Not Selected
                                </p>
                              )}
                              {/* <Select
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
                            </Select> */}
                              {errors.sales_rep_contact &&
                                touched.sales_rep_contact && (
                                  <p className="text-red-500 text-xs">
                                    {errors.sales_rep_contact}
                                  </p>
                                )}
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-2 pb-3 space-y-3 mt-3">
                              <Label
                                htmlFor="license_term"
                                className="text-sm font-medium text-slate-700 dark:text-slate-300"
                              >
                                Select Licence Term *
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
                                  <SelectItem value="10-year">
                                    10-year
                                  </SelectItem>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            <FieldArray name="indoor_dome_products">
                              {() => (
                                <>
                                  {values.indoor_dome_products.map(
                                    (data, index) => {
                                      const id = `indoor_dome_products-${index}`;
                                      const isChecked =
                                        values.indoor_dome_products[index]
                                          .checked;

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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            <FieldArray name="outdoor_dome_products">
                              {() => (
                                <>
                                  {values.outdoor_dome_products.map(
                                    (data, index) => {
                                      const id = `outdoor_dome_products-${index}`;
                                      const isChecked =
                                        values.outdoor_dome_products[index]
                                          .checked;

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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            <FieldArray name="fips_validated_cameras">
                              {() => (
                                <>
                                  {values.fips_validated_cameras.map(
                                    (data, index) => {
                                      const id = `fips_validated_cameras-${index}`;
                                      const isChecked =
                                        values.fips_validated_cameras[index]
                                          .checked;

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
                          Execution - Part 3
                        </h4>
                        <div className="border-t-[1px] border-[black]"></div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 space-y-3 mt-4">
                          <div className="bg-white text-editor rounded-[17px]">
                            <Field name={`execution`} className="">
                              {({ field, form, meta }: any) => (
                                <div>
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
        </Tabs>
      </div>
    </div>
  );
}
