/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"

import { ProductCard } from "./products/ProductCard"
import { prisma } from "./products/prisma"

async function getHomeData() {
  const [categories, brands, flashSale, bestSellers, newArrivals, promos] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" }, take: 8, include: { _count: { select: { products: true } } } }),
    prisma.brand.findMany({ orderBy: { name: "asc" }, take: 6, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({ where: { isPublished: true, isFlashSale: true }, take: 4, include: productInclude(), orderBy: { updatedAt: "desc" } }),
    prisma.product.findMany({ where: { isPublished: true, isFeatured: true }, take: 4, include: productInclude(), orderBy: { updatedAt: "desc" } }),
    prisma.product.findMany({ where: { isPublished: true, isNewArrival: true }, take: 4, include: productInclude(), orderBy: { createdAt: "desc" } }),
    prisma.promo.findMany({ where: { isActive: true }, take: 2, orderBy: { updatedAt: "desc" } }),
  ])

  return { categories, brands, flashSale, bestSellers, newArrivals, promos }
}

function productInclude() {
  return {
    brand: { select: { name: true, slug: true } },
    category: { select: { name: true, slug: true } },
    images: { orderBy: { sortOrder: "asc" as const }, select: { url: true, alt: true } },
    reviews: { select: { rating: true } },
  }
}

function SectionHeader({ eyebrow, title, href = "/products" }: { eyebrow: string; title: string; href?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-[#FF4F9A]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#222222] sm:text-3xl">{title}</h2>
      </div>
      <Link href={href} className="hidden text-sm font-semibold text-[#FF4F9A] sm:block">Lihat Semua</Link>
    </div>
  )
}

function ProductSection({ eyebrow, title, products }: { eyebrow: string; title: string; products: Awaited<ReturnType<typeof getHomeData>>["flashSale"] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={eyebrow} title={title} />
      {products.length ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product: any) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div className="rounded-lg border border-[#222222]/8 bg-[#FAFAFA] p-8 text-center text-sm text-[#222222]/58">
          Produk belum tersedia. Tambahkan data produk melalui database/admin.
        </div>
      )}
    </section>
  )
}

export default async function HomePage() {
  const { categories, brands, flashSale, bestSellers, newArrivals, promos } = await getHomeData()
  const primaryPromo = promos[0]

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[220px_1fr_280px]">
          <aside className="hidden rounded-lg border border-[#222222]/8 bg-white p-3 lg:block">
            <p className="px-2 pb-2 text-sm font-semibold text-[#222222]">Kategori</p>
            {categories.length ? categories.map((category: any) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-[#222222]/70 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
                <span>{category.name}</span>
                <span className="text-xs text-[#222222]/38">{category._count.products}</span>
              </Link>
            )) : <p className="px-2 py-3 text-sm text-[#222222]/50">Kategori belum tersedia.</p>}
          </aside>

          <Link href="/products" className="relative min-h-[320px] overflow-hidden rounded-lg border border-[#222222]/8 bg-[#FFF7FB] px-6 py-8 sm:px-10">
            <div className="max-w-xl">
              <p className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#FF4F9A] shadow-sm">
                {primaryPromo?.title ?? "Promo Distributor Kosmetik"}
              </p>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-[#222222] sm:text-5xl">
                Belanja stok kosmetik original untuk toko dan reseller.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-[#222222]/62 sm:text-base">
                {primaryPromo?.description ?? "Pilih produk fast moving, brand resmi, dan paket grosir dengan pengalaman belanja yang cepat dan rapi."}
              </p>
              <span className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[#FF4F9A] px-6 text-sm font-semibold text-white">
                Belanja Produk
              </span>
            </div>
            <div className="absolute bottom-0 right-6 hidden h-64 w-56 lg:block">
              <Image src={primaryPromo?.imageUrl ?? "/logo.png.png"} alt={primaryPromo?.title ?? "Distributor Kosmetik"} fill sizes="224px" className="object-contain object-bottom" priority />
            </div>
          </Link>

          <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="/products?sort=featured" className="rounded-lg border border-[#222222]/8 bg-white p-5 hover:border-[#FF4F9A]/35">
              <p className="text-sm font-semibold text-[#222222]">Best Seller</p>
              <p className="mt-2 text-2xl font-bold text-[#FF4F9A]">{bestSellers.length} Produk</p>
              <p className="mt-2 text-sm text-[#222222]/58">Produk paling sering dibeli reseller.</p>
            </Link>
            <Link href="/products?sort=newest" className="rounded-lg border border-[#222222]/8 bg-white p-5 hover:border-[#FF4F9A]/35">
              <p className="text-sm font-semibold text-[#222222]">New Arrival</p>
              <p className="mt-2 text-2xl font-bold text-[#FF4F9A]">{newArrivals.length} Baru</p>
              <p className="mt-2 text-sm text-[#222222]/58">Produk baru dari database.</p>
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#222222]/8 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-6 sm:grid-cols-4 lg:grid-cols-8 lg:px-8">
          {categories.map((category: any) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-lg px-3 py-4 text-center text-sm font-semibold text-[#222222]/72 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <ProductSection eyebrow="Flash Sale" title="Promo cepat untuk stok reseller" products={flashSale} />

      <section id="brand" className="bg-[#FAFAFA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Official Brand" title="Brand partner pilihan" href="/brands" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand: any) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="rounded-lg border border-[#222222]/8 bg-white px-5 py-6 text-center text-sm font-semibold text-[#222222]/72 hover:border-[#FF4F9A]/35 hover:text-[#FF4F9A]">
                {brand.name}
                <span className="mt-2 block text-xs font-normal text-[#222222]/45">{brand._count.products} produk</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductSection eyebrow="Best Seller" title="Produk paling sering dibeli" products={bestSellers} />

      <section id="promo" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {(promos.length ? promos : [{ title: "Promo belum tersedia", description: "Tambahkan promo dari database/admin.", slug: "products" }]).map((promo: any) => (
            <Link key={promo.slug} href="/products" className="rounded-lg border border-[#FF4F9A]/16 bg-[#FFF4F9] p-7">
              <p className="text-sm font-semibold text-[#FF4F9A]">Promo</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#222222]">{promo.title}</h2>
              <p className="mt-3 text-sm text-[#222222]/60">{promo.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductSection eyebrow="New Arrival" title="Produk terbaru minggu ini" products={newArrivals} />

      <section id="artikel" className="bg-[#FAFAFA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Artikel" title="Insight belanja dan bisnis kosmetik" />
          <div className="grid gap-4 md:grid-cols-3">
            {["Cara memilih produk fast moving untuk toko kosmetik", "Checklist supplier kosmetik original untuk reseller", "Strategi promo bundling agar stok lebih cepat berputar"].map((article) => (
              <article key={article} className="rounded-lg border border-[#222222]/8 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#FF4F9A]">Panduan Reseller</p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-[#222222]">{article}</h3>
                <p className="mt-3 text-sm leading-6 text-[#222222]/60">Konten artikel akan masuk database pada modul content/admin berikutnya.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#222222]/8 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="relative size-14 overflow-hidden rounded-full border border-[#FF4F9A]/15">
              <Image src="/logo.png.png" alt="Logo Distributor Kosmetik" fill sizes="56px" className="object-contain p-1" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#222222]/60">Distributor kosmetik original untuk kebutuhan reseller, dropshipper, toko online, dan toko offline Indonesia.</p>
          </div>
          {[ ["Belanja", "Flash Sale", "Best Seller", "New Arrival"], ["Kategori", "Skincare", "Makeup", "Bodycare"], ["Bantuan", "Daftar Reseller", "Cek Stok", "Kontak"] ].map(([title, ...items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[#222222]">{title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {items.map((item) => <Link key={item} href="/products" className="text-sm text-[#222222]/58 hover:text-[#FF4F9A]">{item}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-[#222222]/8 pt-6 text-sm text-[#222222]/50">© 2026 Distributor Kosmetik. All rights reserved.</div>
      </footer>
    </main>
  )
}


