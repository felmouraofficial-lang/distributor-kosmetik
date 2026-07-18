import { AdminCard, PageHeader } from "../ui"

export default function MediaPage() {
  return (
    <>
      <PageHeader title="Media" description="Kelola aset gambar product, banner, dan artikel." />
      <AdminCard>
        <p className="text-sm text-black/60">Upload aset media akan dikelola dari halaman produk, banner, dan artikel.</p>
      </AdminCard>
    </>
  )
}
