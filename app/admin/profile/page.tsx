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
      <div className="rounded-xl border-none bg-white p-6 shadow-lg dark:bg-background">
        <ProfileForm />
      </div>
    </div>
  )
}
