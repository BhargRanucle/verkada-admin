import { ProfileForm } from "@/components/profile/profile-form"
import { PageTitle } from "@/components/page-title"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Profile Settings",
  generator: "verkada",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Profile Settings" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <ProfileForm />
      </div>
    </div>
  )
}
