/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"

import { deleteBanner, saveBanner } from "../actions"
import { AdminCard, buttonClass, Checkbox, dangerClass, Field, inputClass, PageHeader, textareaClass } from "../ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function BannersAdminPage() {
  let banners: any[] = []
  try {
    const { prisma } = await import("@/app/prisma")
    banners = await prisma.banner.findMany({ orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] })
  } catch (error) {
    console.error("Admin banners data failed", error)
  }

  return (
    <>
      <PageHeader title="Head Banner" description="Kelola banner slide utama homepage, promo, gambar, CTA, dan urutan tampil." />
      <AdminCard>
        <form action={saveBanner} encType="multipart/form-data" className="grid gap-4 md:grid-cols-2">
          <Field label="Title"><input name="title" required className={inputClass} /></Field>
          <Field label="Slug"><input name="slug" className={inputClass} /></Field>
          <Field label="Subtitle"><input name="subtitle" className={inputClass} /></Field>
          <Field label="Placement"><select name="placement" defaultValue="homepage" className={inputClass}><option value="homepage">Homepage Head Banner</option><option value="promo">Promo Section</option></select></Field>
          <Field label="CTA Label"><input name="ctaLabel" className={inputClass} /></Field>
          <Field label="CTA URL"><input name="ctaHref" className={inputClass} /></Field>
          <Field label="Head Banner Image URL"><input name="imageUrl" placeholder="URL gambar banner 16:9" className={inputClass} /></Field>
          <Field label="Upload Head Banner"><input name="imageFile" type="file" accept="image/*" className={inputClass} /></Field>
          <Field label="Sort Order"><input name="sortOrder" type="number" defaultValue="0" className={inputClass} /></Field>
          <Checkbox name="isActive" label="Active" defaultChecked />
          <div className="md:col-span-2"><Field label="Description"><textarea name="description" className={textareaClass} /></Field></div>
          <div><button className={buttonClass}>Simpan Banner</button></div>
        </form>
      </AdminCard>
      <div className="mt-6 grid gap-4">
        {banners.map((banner: any) => (
          <AdminCard key={banner.id}>
            {banner.imageUrl ? (
              <div className="relative mb-4 aspect-[16/5] overflow-hidden rounded-xl border border-black/10 bg-[#f7f7f8]">
                <Image src={banner.imageUrl} alt={banner.title} fill sizes="100vw" className="object-cover" />
              </div>
            ) : null}
            <form action={saveBanner} encType="multipart/form-data" className="grid gap-3 md:grid-cols-4">
              <input type="hidden" name="id" value={banner.id} />
              <input name="title" defaultValue={banner.title} className={inputClass} />
              <input name="slug" defaultValue={banner.slug} className={inputClass} />
              <input name="subtitle" defaultValue={banner.subtitle ?? ""} className={inputClass} />
              <button className={buttonClass}>Update</button>
              <select name="placement" defaultValue={banner.placement} className={inputClass}><option value="homepage">Homepage Head Banner</option><option value="promo">Promo Section</option></select>
              <input name="sortOrder" type="number" defaultValue={banner.sortOrder} className={inputClass} />
              <input name="ctaLabel" defaultValue={banner.ctaLabel ?? ""} className={inputClass} />
              <input name="ctaHref" defaultValue={banner.ctaHref ?? ""} className={inputClass} />
              <input name="imageUrl" defaultValue={banner.imageUrl ?? ""} placeholder="Head banner image URL" className={inputClass} />
              <input name="imageFile" type="file" accept="image/*" className={inputClass} />
              <Checkbox name="isActive" label="Active" defaultChecked={banner.isActive} />
              <div className="md:col-span-4"><textarea name="description" defaultValue={banner.description ?? ""} className={textareaClass} /></div>
            </form>
            <form action={deleteBanner} className="mt-3"><input type="hidden" name="id" value={banner.id} /><button className={dangerClass}>Delete</button></form>
          </AdminCard>
        ))}
      </div>
    </>
  )
}



