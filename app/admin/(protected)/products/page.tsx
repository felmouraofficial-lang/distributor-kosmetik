/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteProduct, saveProduct } from "../actions"
import { AdminCard, buttonClass, Checkbox, dangerClass, Field, inputClass, PageHeader, textareaClass } from "../ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ProductsAdminPage() {
  let products: any[] = []
  let brands: any[] = []
  let categories: any[] = []

  try {
    const { prisma } = await import("@/app/prisma")
    ;[products, brands, categories] = await Promise.all([
      prisma.product.findMany({ include: { brand: true, category: true }, orderBy: [{ updatedAt: "desc" }] }),
      prisma.brand.findMany({ orderBy: { name: "asc" } }),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
    ])
  } catch (error) {
    console.error("Admin products data failed", error)
  }

  return (
    <>
      <PageHeader title="Produk" description="Kelola katalog produk, thumbnail, galeri, dan status promo." />
      <AdminCard>
        <form action={saveProduct} encType="multipart/form-data" className="grid gap-4 md:grid-cols-3">
          <Field label="Nama"><input name="name" required className={inputClass} /></Field>
          <Field label="Slug"><input name="slug" className={inputClass} /></Field>
          <Field label="SKU"><input name="sku" className={inputClass} /></Field>
          <Field label="Brand"><select name="brandId" required className={inputClass}>{brands.map((brand: any) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select></Field>
          <Field label="Kategori"><select name="categoryId" required className={inputClass}>{categories.map((category: any) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
          <Field label="Harga"><input name="price" type="number" className={inputClass} /></Field>
          <Field label="Harga Diskon"><input name="compareAtPrice" type="number" className={inputClass} /></Field>
          <Field label="Stock"><input name="stock" type="number" className={inputClass} /></Field>
          <Field label="Weight (gram)"><input name="weight" type="number" className={inputClass} /></Field>
          <Field label="BPOM"><input name="bpomNumber" className={inputClass} /></Field>
          <Field label="Thumbnail URL"><input name="thumbnail" className={inputClass} /></Field>
          <Field label="Upload Thumbnail"><input name="thumbnailFile" type="file" accept="image/*" className={inputClass} /></Field>
          <Field label="Gallery 1 URL"><input name="galleryUrl1" className={inputClass} /></Field>
          <Field label="Gallery 1 File"><input name="galleryFile1" type="file" accept="image/*" className={inputClass} /></Field>
          <Field label="Gallery 2 URL"><input name="galleryUrl2" className={inputClass} /></Field>
          <Field label="Gallery 2 File"><input name="galleryFile2" type="file" accept="image/*" className={inputClass} /></Field>
          <div className="md:col-span-3"><Field label="Short Description"><textarea name="shortDescription" className={textareaClass} /></Field></div>
          <div className="md:col-span-3"><Field label="Description"><textarea name="description" className={textareaClass} /></Field></div>
          <div className="md:col-span-3"><Field label="Ingredients"><textarea name="ingredients" className={textareaClass} /></Field></div>
          <div className="md:col-span-3"><Field label="How To Use"><textarea name="howToUse" className={textareaClass} /></Field></div>
          <Checkbox name="isPublished" label="Publish" defaultChecked />
          <Checkbox name="isBestSeller" label="Best Seller" />
          <Checkbox name="isFlashSale" label="Flash Sale" />
          <Checkbox name="isNewArrival" label="New Arrival" />
          <Checkbox name="isFeatured" label="Featured" />
          <div><button className={buttonClass}>Simpan Produk</button></div>
        </form>
      </AdminCard>
      <div className="mt-6 grid gap-4">
        {products.map((product: any) => (
          <AdminCard key={product.id}>
            <form action={saveProduct} encType="multipart/form-data" className="grid gap-3 md:grid-cols-4">
              <input type="hidden" name="id" value={product.id} />
              <input name="name" defaultValue={product.name} className={inputClass} />
              <input name="slug" defaultValue={product.slug} className={inputClass} />
              <input name="sku" defaultValue={product.sku} className={inputClass} />
              <button className={buttonClass}>Update</button>
              <select name="brandId" defaultValue={product.brandId} className={inputClass}>{brands.map((brand: any) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select>
              <select name="categoryId" defaultValue={product.categoryId} className={inputClass}>{categories.map((category: any) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
              <input name="price" type="number" defaultValue={Number(product.price)} className={inputClass} />
              <input name="compareAtPrice" type="number" defaultValue={product.compareAtPrice ? Number(product.compareAtPrice) : ""} className={inputClass} />
              <input name="stock" type="number" defaultValue={product.stock} className={inputClass} />
              <input name="weight" type="number" defaultValue={product.weight} className={inputClass} />
              <input name="bpomNumber" defaultValue={product.bpomNumber ?? ""} className={inputClass} />
              <input name="thumbnail" defaultValue={product.thumbnail ?? ""} className={inputClass} />
              <input name="thumbnailFile" type="file" accept="image/*" className={inputClass} />
              <input name="galleryUrl1" placeholder="Gallery 1 URL" className={inputClass} />
              <input name="galleryFile1" type="file" accept="image/*" className={inputClass} />
              <input name="galleryUrl2" placeholder="Gallery 2 URL" className={inputClass} />
              <input name="galleryFile2" type="file" accept="image/*" className={inputClass} />
              <div className="md:col-span-4"><textarea name="shortDescription" defaultValue={product.shortDescription ?? ""} className={textareaClass} /></div>
              <div className="md:col-span-4"><textarea name="description" defaultValue={product.description ?? ""} className={textareaClass} /></div>
              <div className="md:col-span-4"><textarea name="ingredients" defaultValue={product.ingredients ?? ""} className={textareaClass} /></div>
              <div className="md:col-span-4"><textarea name="howToUse" defaultValue={product.howToUse ?? ""} className={textareaClass} /></div>
              <Checkbox name="isPublished" label="Publish" defaultChecked={product.isPublished} />
              <Checkbox name="isBestSeller" label="Best Seller" defaultChecked={product.isBestSeller} />
              <Checkbox name="isFlashSale" label="Flash Sale" defaultChecked={product.isFlashSale} />
              <Checkbox name="isNewArrival" label="New Arrival" defaultChecked={product.isNewArrival} />
              <Checkbox name="isFeatured" label="Featured" defaultChecked={product.isFeatured} />
            </form>
            <form action={deleteProduct} className="mt-3"><input type="hidden" name="id" value={product.id} /><button className={dangerClass}>Delete</button></form>
            <p className="mt-3 text-sm text-black/55">{product.brand.name} - {product.category.name}</p>
          </AdminCard>
        ))}
      </div>
    </>
  )
}





