/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCategory, saveCategory } from "../actions"
import { AdminCard, buttonClass, dangerClass, Field, inputClass, PageHeader, textareaClass } from "../ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function CategoriesAdminPage() {
  let categories: any[] = []
  try {
    const { prisma } = await import("@/app/prisma")
    categories = await prisma.category.findMany({ orderBy: { name: "asc" } })
  } catch (error) {
    console.error("Admin categories data failed", error)
  }

  return (
    <>
      <PageHeader title="Kategori" description="Kelola struktur kategori produk." />
      <AdminCard>
        <form action={saveCategory} className="grid gap-4 md:grid-cols-2">
          <Field label="Nama"><input name="name" required className={inputClass} /></Field>
          <Field label="Slug"><input name="slug" className={inputClass} /></Field>
          <Field label="Parent"><select name="parentId" className={inputClass}><option value="none">Tanpa parent</option>{categories.map((category: any) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
          <div className="md:col-span-2"><Field label="Deskripsi"><textarea name="description" className={textareaClass} /></Field></div>
          <div><button className={buttonClass}>Simpan Kategori</button></div>
        </form>
      </AdminCard>
      <div className="mt-6 grid gap-4">
        {categories.map((category: any) => (
          <AdminCard key={category.id}>
            <form action={saveCategory} className="grid gap-3 md:grid-cols-4">
              <input type="hidden" name="id" value={category.id} />
              <input name="name" defaultValue={category.name} className={inputClass} />
              <input name="slug" defaultValue={category.slug} className={inputClass} />
              <select name="parentId" defaultValue={category.parentId ?? "none"} className={inputClass}><option value="none">Tanpa parent</option>{categories.filter((item: any) => item.id !== category.id).map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
              <button className={buttonClass}>Update</button>
              <div className="md:col-span-4"><textarea name="description" defaultValue={category.description ?? ""} className={textareaClass} /></div>
            </form>
            <form action={deleteCategory} className="mt-3"><input type="hidden" name="id" value={category.id} /><button className={dangerClass}>Delete</button></form>
          </AdminCard>
        ))}
      </div>
    </>
  )
}



