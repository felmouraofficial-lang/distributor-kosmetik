/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"

import { FilterSidebar } from "./FilterSidebar"
import { ProductCard } from "./ProductCard"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

type ProductsPageProps = {
  searchParams: Promise<{ q?: string; brand?: string; category?: string; sort?: string }>
}

function sortOption(sort?: string) {
  if (sort === "price-low") return { price: "asc" as const }
  if (sort === "price-high") return { price: "desc" as const }
  if (sort === "newest") return { createdAt: "desc" as const }
  return { isFeatured: "desc" as const }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const { prisma } = await import("./prisma")
  const [brands, categories, products] = await Promise.all([
    prisma.brand.findMany({ orderBy: { name: "asc" }, select: { name: true, slug: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { name: true, slug: true } }),
    prisma.product.findMany({
      where: {
        isPublished: true,
        name: params.q ? { contains: params.q, mode: "insensitive" } : undefined,
        brand: params.brand ? { slug: params.brand } : undefined,
        category: params.category ? { slug: params.category } : undefined,
      },
      orderBy: sortOption(params.sort),
      include: {
        brand: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" }, select: { url: true, alt: true } },
        reviews: { select: { rating: true } },
      },
    }),
  ])

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#222222]/8 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-[#FF4F9A]">Product Listing</p>
            <h1 className="mt-1 text-3xl font-semibold text-[#222222]">Belanja Produk Kosmetik</h1>
            <p className="mt-2 text-sm text-[#222222]/58">Semua produk ditarik dari database PostgreSQL melalui Prisma.</p>
          </div>
          <form className="flex items-center gap-2" action="/products">
            {params.q ? <input type="hidden" name="q" value={params.q} /> : null}
            {params.brand ? <input type="hidden" name="brand" value={params.brand} /> : null}
            {params.category ? <input type="hidden" name="category" value={params.category} /> : null}
            <label htmlFor="sort" className="text-sm font-medium text-[#222222]/60">Sort</label>
            <select id="sort" name="sort" defaultValue={params.sort ?? "featured"} className="h-10 rounded-full border border-[#222222]/12 bg-white px-4 text-sm" aria-label="Sort produk">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Harga terendah</option>
              <option value="price-high">Harga tertinggi</option>
            </select>
            <button className="h-10 rounded-full bg-[#FF4F9A] px-5 text-sm font-semibold text-white">Terapkan</button>
          </form>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <FilterSidebar brands={brands} categories={categories} activeBrand={params.brand} activeCategory={params.category} />
          <section>
            <div className="mb-4 flex items-center justify-between text-sm text-[#222222]/55">
              <span>{products.length} produk ditemukan</span>
              <Link href="/" className="font-semibold text-[#FF4F9A]">Kembali ke beranda</Link>
            </div>
            {products.length ? (
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {products.map((product: any) => <ProductCard key={product.slug} product={product} />)}
              </div>
            ) : (
              <div className="rounded-lg border border-[#222222]/8 bg-[#FAFAFA] p-10 text-center">
                <h2 className="text-xl font-semibold text-[#222222]">Produk belum tersedia</h2>
                <p className="mt-2 text-sm text-[#222222]/60">Tambahkan produk dari database/admin agar listing tampil di halaman ini.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
