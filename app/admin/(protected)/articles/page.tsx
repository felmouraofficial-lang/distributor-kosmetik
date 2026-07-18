/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/app/prisma"
import { deleteArticle, saveArticle } from "../actions"
import { AdminCard, buttonClass, Checkbox, dangerClass, Field, inputClass, PageHeader, textareaClass } from "../ui"

export default async function ArticlesAdminPage() {
  const articles = await prisma.article.findMany({ orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }] })

  return (
    <>
      <PageHeader title="Artikel" description="Kelola artikel dan insight homepage." />
      <AdminCard>
        <form action={saveArticle} encType="multipart/form-data" className="grid gap-4 md:grid-cols-2">
          <Field label="Judul"><input name="title" required className={inputClass} /></Field>
          <Field label="Slug"><input name="slug" className={inputClass} /></Field>
          <Field label="Kategori"><input name="category" className={inputClass} /></Field>
          <Field label="Author"><input name="author" className={inputClass} /></Field>
          <Field label="Thumbnail URL"><input name="imageUrl" className={inputClass} /></Field>
          <Field label="Upload Thumbnail"><input name="imageFile" type="file" accept="image/*" className={inputClass} /></Field>
          <Field label="Tanggal Publish"><input name="publishedAt" type="datetime-local" className={inputClass} /></Field>
          <Checkbox name="isPublished" label="Published" defaultChecked />
          <div className="md:col-span-2"><Field label="Ringkasan"><textarea name="excerpt" className={textareaClass} /></Field></div>
          <div className="md:col-span-2"><Field label="Isi"><textarea name="content" className="min-h-40 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#FF4F9A]" /></Field></div>
          <div><button className={buttonClass}>Simpan Artikel</button></div>
        </form>
      </AdminCard>
      <div className="mt-6 grid gap-4">
        {articles.map((article: any) => (
          <AdminCard key={article.id}>
            <form action={saveArticle} encType="multipart/form-data" className="grid gap-3 md:grid-cols-4">
              <input type="hidden" name="id" value={article.id} />
              <input name="title" defaultValue={article.title} className={inputClass} />
              <input name="slug" defaultValue={article.slug} className={inputClass} />
              <input name="category" defaultValue={article.category ?? ""} className={inputClass} />
              <button className={buttonClass}>Update</button>
              <input name="author" defaultValue={article.author ?? ""} className={inputClass} />
              <input name="imageUrl" defaultValue={article.imageUrl ?? ""} className={inputClass} />
              <input name="imageFile" type="file" accept="image/*" className={inputClass} />
              <Checkbox name="isPublished" label="Published" defaultChecked={article.isPublished} />
              <div className="md:col-span-4"><textarea name="excerpt" defaultValue={article.excerpt ?? ""} className={textareaClass} /></div>
              <div className="md:col-span-4"><textarea name="content" defaultValue={article.content ?? ""} className="min-h-32 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#FF4F9A]" /></div>
            </form>
            <form action={deleteArticle} className="mt-3"><input type="hidden" name="id" value={article.id} /><button className={dangerClass}>Delete</button></form>
          </AdminCard>
        ))}
      </div>
    </>
  )
}

