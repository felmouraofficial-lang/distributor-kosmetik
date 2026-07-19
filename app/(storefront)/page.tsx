/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"
import { Brush, Droplets, HeartPulse, Sparkles, SprayCan, WandSparkles } from "lucide-react"

import { HeroCarousel } from "./HeroCarousel"
import { ProductCard } from "./products/ProductCard"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

function emptyHomeData() {
  return {
    categories: [],
    brands: [],
    flashSale: [],
    bestSellers: [],
    newArrivals: [],
    recommended: [],
    banners: [],
    articles: [],
  }
}

async function getHomeData() {
  try {
    const { prisma } = await import("../prisma")
    const [categories, brands, flashSale, bestSellers, newArrivals, recommended, banners, articles] = await Promise.all([
      prisma.category.findMany({ orderBy: { name: "asc" }, take: 8, include: { _count: { select: { products: true } } } }),
      prisma.brand.findMany({ orderBy: { name: "asc" }, take: 10, include: { _count: { select: { products: true } } } }),
      prisma.product.findMany({ where: { isPublished: true, isFlashSale: true }, take: 10, include: productInclude(), orderBy: { updatedAt: "desc" } }),
      prisma.product.findMany({ where: { isPublished: true, isBestSeller: true }, take: 10, include: productInclude(), orderBy: { updatedAt: "desc" } }),
      prisma.product.findMany({ where: { isPublished: true, isNewArrival: true }, take: 10, include: productInclude(), orderBy: { createdAt: "desc" } }),
      prisma.product.findMany({ where: { isPublished: true }, take: 12, include: productInclude(), orderBy: [{ isFeatured: "desc" }, { updatedAt: "desc" }] }),
      prisma.banner.findMany({ where: { isActive: true, placement: "homepage" }, take: 6, orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] }),
      prisma.article.findMany({ where: { isPublished: true }, take: 4, orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }] }),
    ])

    return { categories, brands, flashSale, bestSellers, newArrivals, recommended, banners, articles }
  } catch (error) {
    console.error("Homepage data failed", error)
    return emptyHomeData()
  }
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
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-[#7C3FB3]">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold text-[#222222] sm:text-2xl">{title}</h2>
      </div>
      <Link href={href} className="text-sm font-semibold text-[#7C3FB3] hover:text-[#69319b]">Lihat Semua</Link>
    </div>
  )
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-[#222222]/8 bg-[#FAFAFA] p-8 text-center text-sm text-[#222222]/58">{children}</div>
}

function ProductSection({ eyebrow, title, products, href }: { eyebrow: string; title: string; products: any[]; href?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={eyebrow} title={title} href={href} />
      {products.length ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product: any) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : <EmptyState>Produk belum tersedia.</EmptyState>}
    </section>
  )
}

function categoryIcon(name: string) {
  const lower = name.toLowerCase()
  if (lower.includes("makeup")) return Brush
  if (lower.includes("body") || lower.includes("hair")) return Sparkles
  if (lower.includes("sun") || lower.includes("fragrance")) return SprayCan
  if (lower.includes("tools")) return WandSparkles
  if (lower.includes("baby")) return HeartPulse
  return Droplets
}

export default async function HomePage() {
  const { categories, brands, flashSale, bestSellers, newArrivals, recommended, banners, articles } = await getHomeData()
  const promoBanners = banners.slice(1, 4)

  return (
    <main className="min-h-screen bg-white">
      <HeroCarousel banners={banners} />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Categories" title="Pilih kategori favorit" href="/categories" />
        {categories.length ? (
          <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category: any) => {
              const Icon = categoryIcon(category.name)
              return (
                <Link key={category.slug} href={`/categories/${category.slug}`} className="group flex min-w-28 flex-col items-center text-center">
                  <span className="flex size-20 items-center justify-center rounded-full bg-[#F2FBF9] text-[#7C3FB3] shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-[#7C3FB3]/18">
                    <Icon className="size-8" />
                  </span>
                  <span className="mt-3 text-sm font-semibold text-[#222222]">{category.name}</span>
                  <span className="mt-1 text-xs text-[#222222]/45">{category._count.products} produk</span>
                </Link>
              )
            })}
          </div>
        ) : <EmptyState>Kategori belum tersedia.</EmptyState>}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex rounded-full bg-red-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">Flash Sale</p>
            <h2 className="mt-2 text-xl font-semibold text-[#222222] sm:text-2xl">Deal cepat untuk stok reseller</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#222222] px-4 py-2 text-sm font-bold text-white">02 : 18 : 45</span>
            <Link href="/products?sort=featured" className="text-sm font-semibold text-[#7C3FB3]">Lihat Semua</Link>
          </div>
        </div>
        {flashSale.length ? (
          <div className="flex snap-x gap-4 overflow-x-auto pb-3">
            {flashSale.map((product: any) => <div key={product.slug} className="w-44 shrink-0 snap-start sm:w-56 lg:w-60"><ProductCard product={product} /></div>)}
          </div>
        ) : <EmptyState>Produk flash sale belum tersedia.</EmptyState>}
      </section>

      <section className="border-y border-[#222222]/8 bg-[#FAFAFA] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Official Brand" title="Belanja dari brand populer" href="/brands" />
          {brands.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {brands.map((brand: any) => (
                <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group rounded-2xl bg-white px-4 py-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#222222]/8">
                  <span className="relative mx-auto mb-3 flex size-16 items-center justify-center overflow-hidden rounded-full bg-[#F2FBF9] transition group-hover:scale-105">
                    <Image src={brand.logoUrl ?? "/logo.png.png"} alt={brand.name} fill sizes="64px" className="object-contain p-2" />
                  </span>
                  <span className="block text-sm font-semibold text-[#222222]">{brand.name}</span>
                  <span className="mt-1 block text-xs text-[#222222]/48">{brand._count.products} produk</span>
                </Link>
              ))}
            </div>
          ) : <EmptyState>Brand belum tersedia.</EmptyState>}
        </div>
      </section>

      <ProductSection eyebrow="Best Seller" title="Produk yang paling sering dibeli" products={bestSellers.slice(0, 8)} />

      <section id="promo" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Promo" title="Promo untuk pembelian grosir" />
        {promoBanners.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {promoBanners.map((banner: any) => (
              <Link key={banner.slug} href={banner.ctaHref ?? "/products"} className="rounded-lg border border-[#7C3FB3]/16 bg-[#F2FBF9] p-5 hover:border-[#7C3FB3]/35">
                {banner.subtitle ? <p className="text-xs font-bold uppercase tracking-wide text-[#7C3FB3]">{banner.subtitle}</p> : null}
                <h3 className="mt-2 text-lg font-semibold leading-7 text-[#222222]">{banner.title}</h3>
                {banner.description ? <p className="mt-2 text-sm leading-6 text-[#222222]/60">{banner.description}</p> : null}
              </Link>
            ))}
          </div>
        ) : <EmptyState>Banner promo belum tersedia.</EmptyState>}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="New Arrival" title="Produk terbaru untuk toko kamu" href="/products?sort=newest" />
        {newArrivals.length ? (
          <div className="flex gap-4 overflow-x-auto pb-3">
            {newArrivals.map((product: any) => <div key={product.slug} className="w-44 shrink-0 sm:w-56 lg:w-60"><ProductCard product={product} /></div>)}
          </div>
        ) : <EmptyState>Produk terbaru belum tersedia.</EmptyState>}
      </section>
      <ProductSection eyebrow="Rekomendasi" title="Pilihan katalog distributor" products={recommended} />

      <section id="artikel" className="border-t border-[#222222]/8 bg-[#FAFAFA] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Artikel" title="Insight bisnis kosmetik" />
          {articles.length ? (
            <div className="grid gap-4 md:grid-cols-4">
              {articles.map((article: any) => (
                <article key={article.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#222222]/8">
                  <div className="relative aspect-[4/3] bg-[#F2FBF9]">
                    <Image src={article.imageUrl ?? "/logo.png.png"} alt={article.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-6" />
                  </div>
                  <div className="p-5">
                  {article.category ? <p className="text-xs font-bold uppercase tracking-wide text-[#7C3FB3]">{article.category}</p> : null}
                  <h3 className="mt-3 text-base font-semibold leading-6 text-[#222222]">{article.title}</h3>
                  {article.excerpt ? <p className="mt-3 text-sm leading-6 text-[#222222]/60">{article.excerpt}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyState>Artikel belum tersedia.</EmptyState>}
        </div>
      </section>

      <footer className="border-t border-[#222222]/8 bg-white px-4 pb-24 pt-10 sm:px-6 md:pb-10 lg:px-8">
        <div className="mx-auto mb-10 grid max-w-7xl gap-4 rounded-3xl bg-[#F2FBF9] p-6 md:grid-cols-[1fr_420px] md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#7C3FB3]">Newsletter</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#222222]">Dapatkan update promo grosir dan produk baru.</h2>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input aria-label="Email newsletter" placeholder="Email toko kamu" className="h-12 flex-1 rounded-full border border-[#222222]/10 bg-white px-5 text-sm outline-none focus:border-[#7C3FB3]" />
            <button className="h-12 rounded-full bg-[#7C3FB3] px-6 text-sm font-bold text-white">Daftar</button>
          </form>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="relative size-12 overflow-hidden rounded-full border border-[#7C3FB3]/15">
              <Image src="/logo.png.png" alt="Logo Distributor Kosmetik" fill sizes="48px" className="object-contain p-1" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#222222]/60">Distributor kosmetik original untuk reseller, dropshipper, toko online, dan toko offline Indonesia.</p>
          </div>
          {[["Tentang", "Distributor Kosmetik", "Official Brand", "Harga Reseller"], ["Bantuan", "Cara Belanja", "Pengiriman", "Kontak"], ["Kategori", "Skincare", "Makeup", "Bodycare"], ["Sosial Media", "Instagram", "TikTok", "WhatsApp"]].map(([title, ...items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[#222222]">{title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {items.map((item) => <Link key={item} href="/products" className="text-sm text-[#222222]/58 hover:text-[#7C3FB3]">{item}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-[#222222]/8 pt-6 text-sm text-[#222222]/50">&copy; 2026 Distributor Kosmetik. All rights reserved.</div>
      </footer>
    </main>
  )
}
