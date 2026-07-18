import { AdminCard, PageHeader } from "../ui"

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Pengaturan" description="Pengaturan sistem admin dan storefront." />
      <AdminCard>
        <p className="text-sm text-black/60">Settings lanjutan seperti admin account, sitemap, dan integrasi bisa ditambahkan pada sprint berikutnya.</p>
      </AdminCard>
    </>
  )
}
