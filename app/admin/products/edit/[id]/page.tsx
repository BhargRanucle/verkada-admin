import { ProductForm } from "@/components/products/form";
import { PageTitle } from "@/components/page-title"
import { getUserById } from "@/lib/data"
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
  description: "Edit Product",
  generator: "verkada",
};

export default async function EditPage({ params }: { params: { id: string } }) {
  // const user = await getUserById(params.id);
  // console.log("params?.id", params?.id);

  const data = {
    id: "1",
    name: "CD32 Indoor Dome Camera by Verkada Inc",
    product_category: "Indoor Dome Series",
    product_line: "28_20_00_video_surveillance_gateways_connector_25_1",
    content: `<ol><li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>CD32 Indoor Dome Camera by Verkada Inc.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Onboard Storage: <strong style="background-color: rgb(255, 255, 255); color: rgb(9, 9, 11);">#STORAGE</strong></li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Sensor Resolution: 3MP (2048 x 1536 pixels)</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Lens Type: Fixed</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Image Sensor: 1/2.8” Progressive CMOS</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Focal Length: 2.8mm</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Iris: Fixed</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Aperture: F1.6</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Lens Distortion Correction (LDC): LDC crops the sensor field of view to deliver a rectified, undistorted output image.</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Field of View (FoV after LDC):</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Horizontal: 97° (78°)</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Vertical: 71° (63°)</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Diagonal: 128° (91°)</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>IR Range: 15m / 50ft in low light</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Audio: Yes</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Resistance Ratings:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>IK08</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>FCC</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>IEC60950-1</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Dimensions:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>With Mount Plate:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Length: 146mm / 5.75in</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Width: 146mm / 5.75in</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Height: 104.3mm / 4.11in</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Without Mount Plate:</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Length: 146mm / 5.75in</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Width: 146mm / 5.75in</li><li data-list="ordered" class="ql-indent-3"><span class="ql-ui" contenteditable="false"></span>Height: 99.8mm / 3.93in</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Weight:</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>With Mount Plate: 748g / 26.38oz</li><li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>Without Mount Plate: 608g / 21.45oz</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Operating Power: 11W (IEEE 802.3af PoE)</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Operating Temperature: -10°C to 50°C / 14°F to 122°F</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Operating Humidity: 0% to 90%</li><li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>Connectivity: Ethernet 10/100Mbps RJ-45 cable connector for Network/PoE connection</li></ol>`,
    createdAt: "2023-01-15T09:24:45",
  };
  
  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: "Edit Product", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Product" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <ProductForm product={data}  />
      </div>
    </div>
  )
}
