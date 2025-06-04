import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Edit, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CreateButton } from "@/components/create-button";
import { Table } from "@/components/manage-specifications/table";

export const metadata: Metadata = {
  title: "Manage Specifications",
  description: "Manage Specifications",
  generator: "verkada",
};

export default function DashboardPage() {
  const breadcrumbs = [
    { label: "Manage Specifications", href: "/admin/manage-specifications" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="Manage Specifications" />
        <CreateButton
          href="/admin/manage-specifications/create"
          label="Add New Specification"
        />
      </div>
      <Table />

      {/* <div className="grid grid-cols-3 gap-4">
        <div>
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <Image
                  src="/verkada-white-logo.png"
                  height={100}
                  width={100}
                  alt="verkada-logo"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-300 tracking-wider">
                    ACCESS CONTROL SYSTEM
                  </span>
                </div>
                <h1 className="text-[12px] font-bold text-white leading-tight">
                  28 10 00 Access Control 24.4
                </h1>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-slate-100 py-2">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">
                    Last Updated By
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    Jhon Doe
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <Image
                  src="/verkada-white-logo.png"
                  height={100}
                  width={100}
                  alt="verkada-logo"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-300 tracking-wider">
                    INTERCOM ENTRY SYSTEMS
                  </span>
                </div>
                <h1 className="text-[12px] font-bold text-white leading-tight">
                  28 15 23 Intercom Entry Systems 25.1
                </h1>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-slate-100 py-2">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">
                    Last Updated By
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    Jhon Doe
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <Image
                  src="/verkada-white-logo.png"
                  height={100}
                  width={100}
                  alt="verkada-logo"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-300 tracking-wider">
                    VISITOR MANAGEMENT SYSTEMS
                  </span>
                </div>
                <h1 className="text-[12px] font-bold text-white leading-tight">
                  28 17 11 Visitor Management Systems 25.1
                </h1>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-slate-100 py-2">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">
                    Last Updated By
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    Jhon Doe
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <Image
                  src="/verkada-white-logo.png"
                  height={100}
                  width={100}
                  alt="verkada-logo"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-300 tracking-wider">
                    VIDEO SURVEILLANCE, GATEWAYS, CONNECTOR
                  </span>
                </div>
                <h1 className="text-[12px] font-bold text-white leading-tight">
                  28 20 00 Video Surveillance, Gateways, Connector 25.1
                </h1>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-slate-100 py-2">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">
                    Last Updated By
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    Jhon Doe
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <Image
                  src="/verkada-white-logo.png"
                  height={100}
                  width={100}
                  alt="verkada-logo"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-300 tracking-wider">
                    ENVIRONMENTAL SENSORS
                  </span>
                </div>
                <h1 className="text-[12px] font-bold text-white leading-tight">
                  28 30 00 Environmental Sensors 25.1
                </h1>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-slate-100 py-2">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">
                    Last Updated By
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    Jhon Doe
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
              </div>

              <div className="relative z-10 flex items-center justify-between mb-4">
                <Image
                  src="/verkada-white-logo.png"
                  height={100}
                  width={100}
                  alt="verkada-logo"
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-300 tracking-wider">
                    INTRUSION DETECTION
                  </span>
                </div>
                <h1 className="text-[12px] font-bold text-white leading-tight">
                  28 31 00 Intrusion Detection 25.1
                </h1>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-slate-100 py-2">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-medium text-slate-900">
                    2 hours ago
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">
                    Last Updated By
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    Jhon Doe
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
