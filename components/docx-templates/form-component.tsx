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
    general: `<p><strong>PART 1 - GENERAL</strong></p><p><strong>1.01 SUMMARY</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Section Includes:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Verkada cloud-based video surveillance solution including:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Verkada Command cloud-based management platform</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Edge-based video analytics</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Indoor Dome Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Outdoor Dome Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Mini Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Bullet Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Fisheye Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Multisensor Series cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Pan-Tilt-Zoom (PTZ) cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>FIPS-Validated cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Command Connector</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Viewing Station</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>PoE Injectors</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Camera mounts, adapters, and accessories</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Cellular Gateways</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Wi-Fi Gateways</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada Camera Selector User Guide for assistance selecting the appropriate camera for field of view, form factor, zoom, resolution, video retention, and other selection factors.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for Occupancy Trends for more information regarding the deployment of the Occupancy Trends People Analytics feature.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for License Plate Recognition (LPR) for more information regarding camera selection as well as camera placement, installation, and setup for LPR use cases.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for People Analytics for more information regarding key features, optimizing performance, camera selection and placement, lighting, privacy, and other selection factors.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Refer to the Verkada User Guide for Camera Setup Best Practices for more information regarding the following camera networking best practices:</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Related Sections</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 10 00 – Access Control</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 15 23 – Intercom Entry Systems</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 17 11 – Visitor Management Systems</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 30 00 – Environmental Sensor</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>28 31 00 – Intrusion Detection</li></ol><p><strong>1.02 REFERENCES</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Published specifications, standards, tests, Codes, or recommended standards of trade, industry, or governmental organizations apply to work in these Sections, including:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ADA – Americans with Disabilities Act</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ANSI – American National Standards Institute</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ASCII – American Standard Code for Information Interchange</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ASTM – American Society for Testing and Materials</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>IBC – International Building Code</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>IEEE – Institute of Electrical and Electronics Engineers</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ISO/IEC – International Organization for Standardization / International Electrotechnical Commission</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NEC – National Electrical Code</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NEMA – National Electrical Manufacturers’ Association</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NFPA – National Fire Protection Association</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>TIA/EIA – Telecommunications Industry Association / Electronic Industries Alliance</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>UL – Underwriters Laboratories, Inc.</li></ol><p><strong>1.03 DEFINITIONS</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Abbreviations:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ACS – Access Control System</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>API – Application Programming Interface</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>CCD – Charge Coupled Device</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>CCTV – Closed Circuit Television</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>CMOS – Complementary Metal-Oxide Semiconductor</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>DHCP – Dynamic Host Configuration Protocol</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>DNS – Domain Name System</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>DPDT – Double pole, double throw</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>FPS – Frames Per Second</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>IP – Internet Protocol</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>LAN – Local Area Network</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>LPR – License Plate Recognition</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NFC – Near Field Communications</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>NVR – Network Video Recorder</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>ODBC – Open Database Connectivity</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>PoE – Power Over Ethernet</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>RAM – Random Access Memory</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>SPDT – Single pole, double throw</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>SSL – Secure Sockets Layer</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>SSO – Single sign-on</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>TCP – Transport Control Protocol</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>UPS – Uninterruptible Power Supply</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>VMS – Video Management System</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>WDR – Wide Dynamic Range</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Definitions:</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span><span style="background-color: yellow;">[Add definitions]</span></li></ol><p><strong>1.04 SYSTEM DESCRIPTION</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>A hybrid cloud video surveillance system with storage and image processing on edge devices managed through the Verkada Command cloud platform.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Verkada Command Management Software</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Access and management for all cameras and users across all sites. Command management functions include:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Set up new cameras</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Create and manage sites at scale</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>One-click device install:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Add devices without assigning a site or configuring the device upfront.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>New devices will be added to and “Unassigned Devices” list</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Immediately check if device is online and see live data</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Manage camera device and system settings.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Access live and archived footage</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Manage users</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Security and Permissions:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>SAML/OAuth support for single sign-on</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>2-factor authentication options</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>User permissions can be controlled at camera, site, and organization levels</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Remote Access</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Web app access</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Native apps for iOS, Android, and the Verkada VX52 Viewing Station</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Archiving and Sharing:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Command licenses include unlimited cloud archiving.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Export footage in MP4 format.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Create and share Live Links via text or email.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Extended Cloud Backup (ECB)</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Flexible Structure:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Extend cloud backup in 30-day increments (“packs”)</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Packs can be stacked per device</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Self-Service Portal:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Simple License Claiming: Admins can claim ECB licenses directly through the self-service portal.</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Seamless License Management: Easily track usage, and support compliance with retention requirements – all from one central dashboard.</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Automatic Co-Terming: Eliminate the need to manually calculate renewal dates for ECB licenses. ECB licenses will now co-terminate with all other Command product licenses.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Analytics:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>People Analytics:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Intelligent edge-based video processing to identify individuals in a scene.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Filter identified individuals by attributes, including:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Date</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Time</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Appearance</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Clothing color</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Backpack detection</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Facial matches</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>AI-Powered Search:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Use freeform text queries to search for people and vehicles.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Reverse Image Analytics:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Upload a photo of a person, vehicle, or object to obtain relevant search results.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>History Player Search: Instantaneously find footage and construct a chronological timeline of where an individual appeared on multiple cameras across wide areas.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Face Search: Quickly search for matching people by selecting an existing face from organizational records uploaded image.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Face Blur:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Live Face Blur:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Blur faces of individuals detected in camera live streams for privacy.</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Admins can enable Live Face Blur by default for all cameras while also giving users the option to unblur faces in case of an incident.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Selective Face Blur:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Choose which archived faces to blur to support the privacy of individuals stored in an archive.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person History:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Browse through snapshots of people detected in frame.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Save snapshots or access associated full-resolution video.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Occupancy Trends:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Estimate how many people cross a designated line in a camera field of view.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Cross-Camera Tracking:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Search video from different cameras of the same identified individual.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person Line Crossing: trigger an alarm if a person crosses a predetermined digital line in a specified direction.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span><span style="color: black;">Direction of Travel: trigger an alarm by specified direction of travel detection.</span></li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span><span style="color: black;">Person Line Crossing: </span>trigger an alarm if a person crosses a predetermined digital line in a specified direction.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person or Vehicle Loitering: trigger an alarm if a person or vehicle is continuously detected in a pre-selected region beyond a certain time threshold.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Person of Interest (POI) and License Plate of Interest (LPOI):</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Receive real-time POI alerts on the live feed when viewing a single camera page.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>POI alerts display associated LPOI and vice versa.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Vehicle Analytics:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Intelligent edge-based video processing to identify vehicles in a scene.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Filter identified vehicles by attributes, including:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Date.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Time.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Vehicle make.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Color.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Vehicle body type.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle History:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Browse through snapshots of vehicles detected in-frame.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Save snapshots or associated full-resolution video</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Cross-Camera Tracking:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Search video from different cameras of the same identified vehicle.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle Number Tracking: draw a digital line on the video feed and get an estimate of how many vehicles crossed that line.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle Line Crossing: trigger an alarm if a vehicle crosses a predetermined digital line in a specified direction.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Vehicle Loitering: trigger an alarm if a vehicle is continuously detected in a pre-selected region beyond a certain time threshold.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>License Plate Recognition:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>LPR coverage, monitoring, and search by plate number.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Generate License Plate of Interest Alerts via SMS or email with an image or link to review the associated footage.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>License Plate Recognition Unlock:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>LPR unlock utilizes a peer-to-peer communication protocol to facilitate secure device-to-device interactions between LPR-enabled CB52 and CB62 bullet cameras and Verkada’s AC42 and AC62 door controllers.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>LPR camera results can be used as an input method for a gate, unlocking that gate anytime an authorized license plate is verified by the access controller.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>License plates can be added to any access user profile. All unlock events from a license plate are attributed to an access user.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Unified Alerts:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Set up and configure alerts for access control, cameras, alarms, and environmental sensors from the Alerts page in Command.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Configure real-time alerts via SMS, email, Microsoft Teams, and Slack.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Search Alert Inbox for alert names, filter across all alerts, star alerts, and create custom sections for related alerts.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Enhanced Sensor Alerts:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>All sensors paired with a context camera to display:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>People detection thumbnails show all people detected before, during, and after a sensor alert.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>People activity overlay on the sensor alert graph to mark people's activity.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Third-Party VMS Integrations for Air Quality Sensor Events:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Send sensor event alerts to the following third-party video management systems: Milestone XProtect, Wisenet WAVE, exacqVision.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>AI-Powered Alerts:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Use freeform language to set up alerts on events of interest.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Create alerts based on AI-powered search queries.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Shortcuts Navigation Tool:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Available for both live streams and historic views:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Instantly jump between neighboring camera feeds to quickly track moving subjects during live investigations.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Trace a subject’s movements from camera to camera to review and archive a subject's path in historic views.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Adaptive Quality with Variable Bitrates: Cameras use variable bitrates for both SQ and HQ video allowing for video to be recorded at a lower bitrate during less complex scenes and a higher bitrate during more complex scenes.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>PTZ Sentry Mode:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Patrol multiple scenes when a live operator is not available.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Select up to 25 preset views.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Configure how long Sentry Mode dwells on each scene (30 seconds to 24 hours).</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Verkada Verify:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Browser-based tool that allows anyone in possession of footage from a Verkada camera to verify its authenticity.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Verify recorded footage by uploading the file at <a href="https://command.verkada.com/verify" rel="noopener noreferrer" target="_blank">verkada.com/verify</a>.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Enterprise Bandwidth Manager (EBM):</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Set bandwidth limits for all camera upload traffic, including video archiving, cloud backup, and timelapse.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Monitor real-time bandwidth usage and selectively terminate active video streams to free up bandwidth.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Application Programming Interface:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Streaming API: Stream both live and historical footage from cameras; ingest footage into third-party Global Security Operations Center (GSOC) software for live monitoring or into customized analytics software for operational insights.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Occupancy Trend Data API: extract foot or vehicle traffic data for further analysis.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Access Events Webhooks: integrate real-time system insights into third-party applications.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>AWS GovCloud:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Optional for US government deployments.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Continuous monitoring of the system.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>FIPS encryption in transit and at rest.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Strengthened session and identity management capabilities.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Data Hosting:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Option to process and store data, including image and video data, locally in Verkada data centers in the United States, European Union, or Australia.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Customize image and video storage location on an org-wide or camera-by-camera basis.</li></ol><p><strong>1.05 SUBMITTALS</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide the following submittals for review and approval:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Product Data and Shop Drawings</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>System Programming</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Operation and Maintenance Manuals (O&amp;M’s)</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>“As-Built” Record Drawings</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit Product Data and Shop Drawings submittals for review and approval prior to commencement of work:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Manufacturer's name, brand name, exact part number, options, accessories, and catalog cutsheet references for all equipment supplied including cabling. Include manufacturer’s published installation instructions. Indicate UL listings for system components.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Complete wiring diagrams for all components, including cable types and quantities, routings, floor plans indicating device locations, conduit sizes, and point-to-point termination and riser diagrams.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Device legend on the shop drawings that identifies the symbols used for all devices including mounting heights, back box requirements, part and model numbers, operating voltages (if applicable), wire and cabling requirements, label text, and panel termination points.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Fully dimensioned shop drawings including floorplans, enlarged plans, elevations, and installation details of all security devices, equipment rooms and closets, consoles, controllers, racks, enclosures, and fabricated equipment, showing locations of all major components including mounting details. Indicate UL system and rating listings for penetration firestop systems through rated partitions and floors.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Bill of Materials.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Material Safety Data Sheets (MSDS) for fire stopping materials and sealants.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit System Programming submittals for review and approval prior to commencement of work:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Proposed programming, including nomenclature conventions, device names and text descriptions, timings, camera call-up trigger alarms with associated cameras, and sequence of operations.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Approved device names and text descriptions as programmed into the security systems shall be reflected on the “As-Built” Record Drawings as well as on device and cable labels.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit Operation and Maintenance Manuals (O&amp;M’s) submittals for review and approval prior to the completion of the project:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Updated product data and shop drawings submittals reflecting the final conditions.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Warranty letter with start and end date.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Warranty service and maintenance contact information: including names, address, phone number, and website address. Provide specific instructions or forms as required to initiate a trouble ticket or work order request.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Letter indicating that all software and licensing is the sole property of the Owner.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Troubleshooting checklist information.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Replacement parts and consumables ordering information including the contact information for local sources.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Provide an updated System Programming submittal including:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Final listing of doors, locations, and normal status in CSV format.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>System administration and management operating instructions.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Setting up Users, User Groups, Access Levels, Doors, Door Schedules, and Exceptions</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Assigning Access Groups to all Users.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Monitoring system activity.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Running standard reports.</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Setting up logins and permissions.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit “As-Built” Record Drawings submittals for review and approval prior to the completion of the project:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain a complete set of “As-Built” Record Drawings at the project site updated with mark-ups of the actual installation conditions.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Prior to the completion of the project transfer all installation conditions mark-ups to electronic drawings and submit to the Owner in CAD and PDF formats.</li></ol><p><strong>1.06 QUALITY ASSURANCE</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Equipment shall be tested and found to comply with the limits for a Class A or B digital device, pursuant to part 15 of the FCC rules.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Security technology devices shall be mounted using compatible Verkada accessories.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Security technology devices shall be of the latest technology. No discontinued models or products are acceptable.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Installation technicians shall successfully complete the Verkada Certified Engineer (VCE) program prior to starting work. For more information, visit <a href="http://www.verkada.com/partners/trainings" rel="noopener noreferrer" target="_blank">http://www.verkada.com/partners/trainings</a>.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Contractor qualifications:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Minimum of two years of system design, engineering supervision, and installation experience in the access control industry.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain a local office, with a service center staffed by trained technicians and must be adequately equipped to provide emergency phone service within 24 hours on a 24-hour, 365 days per year basis, whether or not the Owner purchases a maintenance contract with the Contractor.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain an inventory of spare parts and other items critical to system operation, as necessary to meet the emergency service requirements.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Maintain an in-house engineering and project management capability consistent with the requirements of this project.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Provide a project manager who is actively engaged in the project. This person shall be the same individual throughout the course of the project and shall be the person responsible for the scheduling of the system programming, preparation of the submittals and project close-out documentation, training programs, system testing and report documentation, and the coordination of all subcontract labor. The Owner reserves the right to approve the Contractor’s project manager.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Abide by and adhere to all Drug Free School Zone laws and participate in a drug-free workplace program.</li></ol><p><strong>1.07 DELIVERY, STORAGE AND HANDLING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Ship equipment in original packaging to prevent damage. All handling shall be in accordance with manufacturer recommendations. Inspect all products and materials for any damage immediately upon delivery to the project site.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide protective covering during construction.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Replace equipment and products damaged during shipping, handling, distribution, storage, installation, or construction with new equipment and products.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Equipment and products stored at the project site or at an off-site location shall be protected from dust, dirt, and foreign matter. Protect equipment and products from water, damage, dents, bumps, and scratches.</li></ol><p><strong>1.08 SCHEDULING</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Submit proposed construction schedule detailing the task milestones, durations, and sequences for the project for review and approval prior to commencement of work.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>When work is performed in a sensitive area or in an area occupied with ongoing business activities coordinate with the Owner and the affected department’s representative to determine the best time to perform the work required.</li></ol><p><strong>1.09 WARRANTY</strong></p><ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide one-year parts and labor project warranty. Parts and labor shall be guaranteed against defects in materials and workmanship for one year from written notification of acceptance.</li><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>All Verkada hardware purchases are backed by a 10-year limited warranty. For more information, visit <a href="verkada.com/support/terms-of-sale" rel="noopener noreferrer" target="_blank">verkada.com/support/terms-of-sale</a>.</li></ol>`,
    execution: "",
    installers: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Installation shall be performed by technicians that have successfully completed the Verkada Certified Engineer (VCE) program. For more information, visit www.verkada.com/partners/trainings.&nbsp;</span></p>`,
    examination: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Installation surfaces shall be clean and free from dust, dirt, and obstructions. </span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Examine pathway elements intended for cables. Check raceways, cable trays, and other elements for compliance with space allocations, installation tolerances, hazards to cable installation, and other conditions affecting installation. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Examine rough-in for LAN and control cable conduit systems to server, PCs, controllers, cameras, and other cable-connected devices to verify actual locations of conduit and back boxes before device installation. </span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Proceed with installation only after unsatisfactory conditions have been corrected.</span></p>`,
    preparation: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Refer to the Verkada Quick Start Guide applicable to each product.</span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Pre-Installation Conference: Prior to installation arrange conference between supplier, Owner, and related trades to review materials, procedures, and coordinating related work. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Furnish or coordinate any inserts required for building into concrete, masonry, and other work, to support and attach work of this Section. Furnish or coordinate in ample time to comply with schedule of work into which inserts are built. </span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Verify that power and outlets are in correct locations. </span></p><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Verify that building structure is properly prepared for mounting, attachment, and support of equipment. </span></p><p><span style="color: rgb(0, 0, 0);">F.&nbsp;Prior to installation of systems components and devices, verify all required preparations have been properly performed and that substrates are acceptable for </span></p><ol><li>Verify all rough-ins and field dimensions.</li></ol><p><span style="color: rgb(0, 0, 0);">G.&nbsp;Report in writing to the Owner’s representative any prevailing conditions that will adversely affect satisfactory execution of work in this Section. </span></p><ol><li>Owner or their representative reserves the right to review proposed methods of construction and installation, reject proposed methods, and have the installation done in a satisfactory method at the Contractor's cost.</li></ol>`,
    installation: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Refer to the Verkada Quick Start Guide applicable to each product.</span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;For support, proceed to www.verkada.com/support.</span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Sequencing:&nbsp;The work shall be performed in the following sequence, unless directed otherwise by Owner or their representative:&nbsp;</span></p><ol><li>Installation of cables and network.&nbsp;</li><li>Installation of new cameras.</li><li>Installation of front-end equipment.</li><li>Commissioning of the new system components.</li><li>End User training</li></ol><p>D. Install work in accordance with manufacturer's recommendations and instructions as well as final shop drawings. All components should be installed so as to allow easy access for service in the future.&nbsp;</p><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Anchor components securely in place, plumb, level, and accurately aligned. </span></p><p><span style="color: rgb(0, 0, 0);">F.&nbsp;For solution products located in equipment traffic areas, and that are exposed to damage due to collision or impact from forklifts, or manually moved carts, carriers, or other equipment used by the Owner, provide protective bollards, railings, coverings etc. to ensure that all products installed are properly protected from such damage.&nbsp;</span></p><p><span style="color: rgb(0, 0, 0);">G.&nbsp;Provide fastenings, plates, and other incidental items required for complete and operational installation. </span></p><p><span style="color: rgb(0, 0, 0);">H.&nbsp;Provide required electrical work in accordance with Code requirements.</span></p><p><span style="color: rgb(0, 0, 0);">I.&nbsp;Security and protection:&nbsp;</span></p><ol><li>Maintain strict security during the installation of equipment and software. Rooms housing the control station, and workstations that have been powered up shall be locked and secured during periods when a qualified operator in the employ of Contractor is not present.</li><li>Equipment protection: Provide protective covers, fenders, and barriers as necessary to maintain work of this Section in same condition as installed until time of substantial completion.</li></ol><p>J. Cable requirements:</p><ol><li>Twisted, shielded, plenum-rated type cable shall be used.&nbsp;</li><li>All exposed cables shall be in rigid conduit, electrical metallic tubing (EMT) raceway, or wire mold as approved by the Owner.</li><li>All concealed cables routed in j-hook pathways shall be fastened to the structure at least every four feet.</li></ol>`,
    labeling: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Equipment and product labels shall be printed on self-adhesive labels. Handwritten labels or writing directly on the equipment enclosures is not acceptable.</span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Label equipment and products with the device address as programmed into the security systems and as reflected on the “As-Built” Record Drawings. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Label networked equipment enclosures with the IP address.</span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Cables shall be individually labeled at origin and termination.</span></p>`,
    programming: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Complete all Verkada Command configuration programming. </span></p><p><span style="color: rgb(0, 0, 0);">B.&nbsp;Add all Verkada Cameras to Command via serial number. </span></p><p><span style="color: rgb(0, 0, 0);">C.&nbsp;Contract will coordinate with the Owner to ensure that new components have appropriate network connections. </span></p><p><span style="color: rgb(0, 0, 0);">D.&nbsp;Coordinate with the Owner to ensure that new components will be properly programmed into the system.</span></p><p><span style="color: rgb(0, 0, 0);">E.&nbsp;Change default passwords to new custom secure passwords as directed by the Owner.</span></p>`,
    acceptance_testing: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;Final Test and Acceptance Plan</span></p><ol><li>Develop a final test and acceptance plan to identify each new system component, intent of test, test method, and expected results.</li><li>Each component listed in the plan shall include space for test part signatures, brief comments, time of test and pass/fail check boxes.</li><li>Test all equipment, products, and devices in accordance with the plan to ensure completely operational and fully functional security systems. Submit a written final test and acceptance report for review and approval.</li><li>The report shall be submitted to the Owner’s representative at least 30 days prior to the scheduled system acceptance test.&nbsp;</li><li>System acceptance of the access control system shall be conditioned upon successful completion and operational demonstration of all system functions and components as documented in the final test and acceptance report.</li></ol><p><span style="color: rgb(0, 0, 0);">B.&nbsp;System Acceptance&nbsp;</span></p><ol><li>System acceptance shall not occur until after the following activities have been successfully completed:&nbsp;</li></ol><ul><li><span style="color: rgb(0, 0, 0);">a.&nbsp;Correction of all deficiencies and punch list items noted on the final test and acceptance report.</span></li><li><span style="color: rgb(0, 0, 0);">b.&nbsp;Acceptance of final test and acceptance report.</span></li><li><span style="color: rgb(0, 0, 0);">c.&nbsp;Acceptance of all project close-out submittals.</span></li><li><span style="color: rgb(0, 0, 0);">d.&nbsp;Delivery of final project close-out documentation.</span></li><li><span style="color: rgb(0, 0, 0);">e.&nbsp;Successful training and demonstration, including operation of systems, systems administration, and system management.</span></li><li><span style="color: rgb(0, 0, 0);">f.&nbsp;Purging of Contractor user privileges and return of all credentials.</span></li></ul>`,
    owner_personnel_training: `<p><span style="color: rgb(0, 0, 0);">A.&nbsp;On-site operator training:&nbsp;</span></p><ol><li><span style="color: rgb(0, 0, 0);">Instruct operating staff in proper operation, including hands-on training.&nbsp;</span></li><li>Minimum of two, four-hour sessions covering the operations for each system installed.&nbsp;</li><li>Training sessions shall be provided to supervisors, end-user staff, security staff, maintenance personnel, IT personnel, and any other personnel designated by the Owner.&nbsp;</li><li>Provide training sessions on all work shifts, including day, evening, and night shifts.</li></ol><p><span style="color: rgb(0, 0, 0);">B.&nbsp;On-site administrator training:&nbsp;</span></p><ol><li>Minimum of two, four-hour sessions covering the operations for each system installed.</li><li>Training shall cover all administrative and management functions, including features and controls, for each system.</li></ol>`,
    documentation: `<ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>Provide owner with system component installation, configuration, and programming documentation, including but not limited to:</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Components:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>model name</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>model number</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>manufacturer</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>serial number</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>installation location</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>installation network port name</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>installation network port location</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>network address(es)</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Network port configurations</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Verkada Command users:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Usernames</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Passwords</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>User groups</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>User group permissions</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Alarms Configurations:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Schedules</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Holidays</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Event logic</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Alarm logic</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Alarms users:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Groups</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Group permissions</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Individual</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Individual permissions</li></ol>`,
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
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-tr from-white to-blue-50">
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
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-tr from-white to-blue-50">
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
              <Card className="border-2 border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-tr from-white to-blue-50">
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
                                8 sections
                                
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

                          <CardContent className=" space-y-2 p-0">
                              <div className="">
                                <Label
                                  htmlFor={`installers`}
                                  className="font-semibold text-sm text-[#000000] ms-1"
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

                              <div className="">
                                <Label
                                  htmlFor={`examination`}
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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
                                  className="font-semibold text-sm text-[#000000] ms-1"
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

                          {/* <div
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
                          </div> */}
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
