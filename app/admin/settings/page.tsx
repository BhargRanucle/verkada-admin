import { SettingsForm } from "@/components/settings/settings-form"
import { PageTitle } from "@/components/page-title"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Settings" subtitle="Manage your application settings" />
      <div className="rounded-xl border-none bg-white p-6 shadow-lg dark:bg-background">
        <SettingsForm />
      </div>
    </div>
  )
}
