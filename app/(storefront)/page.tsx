/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import Link from "next/link"

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
        <p className="text-xs font-bold uppercase tracking-wide text-[#FF4F9A]">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold text-[#222222] sm:text-2xl">{title}</h2>
      </div>
      <Link href={href} className="text-sm font-semibold text-[#FF4F9A] hover:text-[#e94288]">Lihat Semua</Link>
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

export default async function HomePage() {
  const { categories, brands, flashSale, bestSellers, newArrivals, recommended, banners, articles } = await getHomeData()
  const primaryBanner = banners[0]
  const promoBanners = banners.slice(1, 4)

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-[#222222]/8 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {categories.length ? categories.map((category: any) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="shrink-0 rounded-full border border-[#222222]/10 bg-white px-4 py-2 text-sm font-semibold text-[#222222]/72 hover:border-[#FF4F9A]/40 hover:text-[#FF4F9A]">
              {category.name}
            </Link>
          )) : <p className="text-sm text-[#222222]/50">Kategori belum tersedia.</p>}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[240px_1fr_280px]">
          <aside className="hidden rounded-lg border border-[#222222]/8 bg-white p-4 lg:block">
            <p className="text-sm font-semibold text-[#222222]">Kategori Belanja</p>
            <div className="mt-3 space-y-1">
              {categories.length ? categories.map((category: any) => (
                <Link key={category.slug} href={`/categories/${category.slug}`} className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-[#222222]/70 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
                  <span>{category.name}</span>
                  <span className="text-xs text-[#222222]/38">{category._count.products}</span>
                </Link>
              )) : <p className="py-3 text-sm text-[#222222]/50">Kategori belum tersedia.</p>}
            </div>
          </aside>

          {primaryBanner ? (
            <Link href={primaryBanner.ctaHref ?? "/products"} className="relative min-h-[260px] overflow-hidden rounded-lg border border-[#FF4F9A]/14 bg-[#FFF5FA] px-6 py-7 sm:px-9">
              <div className="relative z-10 max-w-xl">
                {primaryBanner.subtitle ? <p className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#FF4F9A] shadow-sm">{primaryBanner.subtitle}</p> : null}
                <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">{primaryBanner.title}</h1>
                {primaryBanner.description ? <p className="mt-3 max-w-lg text-sm leading-6 text-[#222222]/62">{primaryBanner.description}</p> : null}
                {primaryBanner.ctaLabel ? <span className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#FF4F9A] px-6 text-sm font-semibold text-white">{primaryBanner.ctaLabel}</span> : null}
              </div>
              {primaryBanner.imageUrl ? (
                <div className="absolute bottom-0 right-4 hidden h-56 w-52 lg:block">
                  <Image src={primaryBanner.imageUrl} alt={primaryBanner.title} fill sizes="208px" className="object-contain object-bottom" priority />
                </div>
              ) : null}
            </Link>
          ) : <EmptyState>Banner homepage belum tersedia.</EmptyState>}

          <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="/products?sort=featured" className="rounded-lg border border-[#222222]/8 bg-white p-5 hover:border-[#FF4F9A]/35">
              <p className="text-sm font-semibold text-[#222222]">Best Seller</p>
              <p className="mt-2 text-3xl font-bold text-[#FF4F9A]">{bestSellers.length}</p>
              <p className="mt-2 text-sm text-[#222222]/58">Produk paling sering dibeli reseller.</p>
            </Link>
            <Link href="/products?sort=newest" className="rounded-lg border border-[#222222]/8 bg-white p-5 hover:border-[#FF4F9A]/35">
              <p className="text-sm font-semibold text-[#222222]">New Arrival</p>
              <p className="mt-2 text-3xl font-bold text-[#FF4F9A]">{newArrivals.length}</p>
              <p className="mt-2 text-sm text-[#222222]/58">Produk baru siap masuk katalog.</p>
            </Link>
          </aside>
        </div>
      </section>

      <ProductSection eyebrow="Flash Sale" title="Deal cepat untuk stok reseller" products={flashSale} href="/products?sort=featured" />

      <section className="border-y border-[#222222]/8 bg-[#FAFAFA] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Official Brand" title="Belanja dari brand populer" href="/brands" />
          {brands.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {brands.map((brand: any) => (
                <Link key={brand.slug} href={`/brands/${brand.slug}`} className="rounded-lg border border-[#222222]/8 bg-white px-4 py-5 text-center hover:border-[#FF4F9A]/35">
                  <span className="block text-sm font-semibold text-[#222222]">{brand.name}</span>
                  <span className="mt-1 block text-xs text-[#222222]/48">{brand._count.products} produk</span>
                </Link>
              ))}
            </div>
          ) : <EmptyState>Brand belum tersedia.</EmptyState>}
        </div>
      </section>

      <ProductSection eyebrow="Best Seller" title="Produk yang paling sering dibeli" products={bestSellers} />

      <section id="promo" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Promo" title="Promo untuk pembelian grosir" />
        {promoBanners.length ? (
          <div className="grid gap-3 md:grid-cols-3">
            {promoBanners.map((banner: any) => (
              <Link key={banner.slug} href={banner.ctaHref ?? "/products"} className="rounded-lg border border-[#FF4F9A]/16 bg-[#FFF4F9] p-5 hover:border-[#FF4F9A]/35">
                {banner.subtitle ? <p className="text-xs font-bold uppercase tracking-wide text-[#FF4F9A]">{banner.subtitle}</p> : null}
                <h3 className="mt-2 text-lg font-semibold leading-7 text-[#222222]">{banner.title}</h3>
                {banner.description ? <p className="mt-2 text-sm leading-6 text-[#222222]/60">{banner.description}</p> : null}
              </Link>
            ))}
          </div>
        ) : <EmptyState>Banner promo belum tersedia.</EmptyState>}
      </section>

      <ProductSection eyebrow="New Arrival" title="Produk terbaru untuk toko kamu" products={newArrivals} href="/products?sort=newest" />
      <ProductSection eyebrow="Rekomendasi" title="Pilihan katalog distributor" products={recommended} />

      <section id="artikel" className="border-t border-[#222222]/8 bg-[#FAFAFA] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Artikel" title="Insight bisnis kosmetik" />
          {articles.length ? (
            <div className="grid gap-4 md:grid-cols-4">
              {articles.map((article: any) => (
                <article key={article.slug} className="rounded-lg border border-[#222222]/8 bg-white p-5">
                  {article.category ? <p className="text-xs font-bold uppercase tracking-wide text-[#FF4F9A]">{article.category}</p> : null}
                  <h3 className="mt-3 text-base font-semibold leading-6 text-[#222222]">{article.title}</h3>
                  {article.excerpt ? <p className="mt-3 text-sm leading-6 text-[#222222]/60">{article.excerpt}</p> : null}
                </article>
              ))}
            </div>
          ) : <EmptyState>Artikel belum tersedia.</EmptyState>}
        </div>
      </section>

      <footer className="border-t border-[#222222]/8 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="relative size-12 overflow-hidden rounded-full border border-[#FF4F9A]/15">
              <Image src="/logo.png.png" alt="Logo Distributor Kosmetik" fill sizes="48px" className="object-contain p-1" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#222222]/60">Distributor kosmetik original untuk reseller, dropshipper, toko online, dan toko offline Indonesia.</p>
          </div>
          {[["Belanja", "Flash Sale", "Best Seller", "New Arrival"], ["Kategori", "Skincare", "Makeup", "Bodycare"], ["Bantuan", "Daftar Reseller", "Cek Stok", "Kontak"]].map(([title, ...items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[#222222]">{title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {items.map((item) => <Link key={item} href="/products" className="text-sm text-[#222222]/58 hover:text-[#FF4F9A]">{item}</Link>)}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-[#222222]/8 pt-6 text-sm text-[#222222]/50">&copy; 2026 Distributor Kosmetik. All rights reserved.</div>
      </footer>
    </main>
  )
}
