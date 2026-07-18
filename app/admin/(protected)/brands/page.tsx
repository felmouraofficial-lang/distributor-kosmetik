/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteBrand, saveBrand } from "../actions"
import { AdminCard, buttonClass, Checkbox, dangerClass, Field, inputClass, PageHeader, textareaClass } from "../ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BrandsAdminPage() {
  let brands: any[] = []
  try {
    const { prisma } = await import("@/app/prisma")
    brands = await prisma.brand.findMany({ orderBy: { name: "asc" } })
  } catch (error) {
    console.error("Admin brands data failed", error)
  }

  return (
    <>
      <PageHeader title="Brand" description="Tambah, edit, dan hapus official brand." />
      <AdminCard>
        <form action={saveBrand} encType="multipart/form-data" className="grid gap-4 md:grid-cols-2">
          <Field label="Nama"><input name="name" required className={inputClass} /></Field>
          <Field label="Slug"><input name="slug" className={inputClass} /></Field>
          <Field label="Logo URL"><input name="logoUrl" className={inputClass} /></Field>
          <Field label="Upload Logo"><input name="logoFile" type="file" accept="image/*" className={inputClass} /></Field>
          <div className="md:col-span-2"><Field label="Deskripsi"><textarea name="description" className={textareaClass} /></Field></div>
          <Checkbox name="isOfficial" label="Official Brand" defaultChecked />
          <div><button className={buttonClass}>Simpan Brand</button></div>
        </form>
      </AdminCard>
      <div className="mt-6 grid gap-4">
        {brands.map((brand: any) => (
          <AdminCard key={brand.id}>
            <form action={saveBrand} encType="multipart/form-data" className="grid gap-3 md:grid-cols-5">
              <input type="hidden" name="id" value={brand.id} />
              <input name="name" defaultValue={brand.name} className={inputClass} />
              <input name="slug" defaultValue={brand.slug} className={inputClass} />
              <input name="logoUrl" defaultValue={brand.logoUrl ?? ""} className={inputClass} />
              <input name="logoFile" type="file" accept="image/*" className={inputClass} />
              <button className={buttonClass}>Update</button>
              <div className="md:col-span-4"><textarea name="description" defaultValue={brand.description ?? ""} className={textareaClass} /></div>
              <Checkbox name="isOfficial" label="Official" defaultChecked={brand.isOfficial} />
            </form>
            <form action={deleteBrand} className="mt-3"><input type="hidden" name="id" value={brand.id} /><button className={dangerClass}>Delete</button></form>
          </AdminCard>
        ))}
      </div>
    </>
  )
}



