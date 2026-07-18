"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Search, Star } from "lucide-react"

import { formatRupiah } from "../format"
import { ProductCard } from "../ProductCard"

type ProductDetail = {
  id: string
  name: string
  slug: string
  sku: string
  shortDescription: string | null
  description: string | null
  price: unknown
  compareAtPrice: unknown | null
  stock: number
  minOrder: number
  brand: { name: string; slug: string }
  category: { name: string; slug: string }
  images: { url: string; alt: string | null }[]
  reviews: { id: string; name: string; rating: number; comment: string | null; createdAt: Date }[]
}

type RelatedProduct = Parameters<typeof ProductCard>[0]["product"]

function useLocalList(key: string, value: string) {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const stored = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[]
    const next = [value, ...stored.filter((item) => item !== value)].slice(0, 8)
    window.localStorage.setItem(key, JSON.stringify(next))
    window.setTimeout(() => setItems(next), 0)
  }, [key, value])

  return items
}

export function ProductDetailClient({ product, relatedProducts }: { product: ProductDetail; relatedProducts: RelatedProduct[] }) {
  const [activeImage, setActiveImage] = useState(product.images[0]?.url ?? "/logo.png.png")
  const [isZoomed, setIsZoomed] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const recentlyViewed = useLocalList("recently-viewed-products", product.slug)
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null
  const averageRating = product.reviews.length
    ? (product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1)
    : "Baru"

  useEffect(() => {
    const stored = JSON.parse(window.localStorage.getItem("wishlist-products") ?? "[]") as string[]
    window.setTimeout(() => setWishlisted(stored.includes(product.slug)), 0)
  }, [product.slug])

  function toggleWishlist() {
    const stored = JSON.parse(window.localStorage.getItem("wishlist-products") ?? "[]") as string[]
    const next = stored.includes(product.slug)
      ? stored.filter((item) => item !== product.slug)
      : [product.slug, ...stored]
    window.localStorage.setItem("wishlist-products", JSON.stringify(next))
    setWishlisted(next.includes(product.slug))
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-sm text-[#222222]/50">
          <Link href="/products" className="hover:text-[#FF4F9A]">Produk</Link> / {product.category.name} / {product.name}
        </div>

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-4 sm:grid-cols-[88px_1fr]">
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {(product.images.length ? product.images : [{ url: "/logo.png.png", alt: product.name }]).map((image) => (
                <button key={image.url} onClick={() => setActiveImage(image.url)} className={`relative size-20 overflow-hidden rounded-lg border bg-[#FAFAFA] ${activeImage === image.url ? "border-[#FF4F9A]" : "border-[#222222]/8"}`}>
                  <Image src={image.url} alt={image.alt ?? product.name} fill sizes="80px" className="object-contain p-2" />
                </button>
              ))}
            </div>
            <button onClick={() => setIsZoomed(true)} className="group relative order-1 aspect-square overflow-hidden rounded-lg border border-[#222222]/8 bg-[#FAFAFA] sm:order-2" aria-label="Zoom foto produk">
              <Image src={activeImage} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-10 transition duration-300 group-hover:scale-105" priority />
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#222222] shadow-sm">
                <Search className="size-4" /> Zoom
              </span>
            </button>
          </div>

          <div>
            <Link href={`/brands/${product.brand.slug}`} className="text-sm font-semibold text-[#FF4F9A]">{product.brand.name}</Link>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#222222] sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#222222]/55">
              <span>SKU {product.sku}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1"><Star className="size-4 fill-[#FF4F9A] text-[#FF4F9A]" /> {averageRating} ({product.reviews.length} review)</span>
              <span>•</span>
              <Link href={`/categories/${product.category.slug}`} className="hover:text-[#FF4F9A]">{product.category.name}</Link>
            </div>
            <div className="mt-7 rounded-lg border border-[#222222]/8 bg-white p-5">
              <div className="flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-[#FF4F9A]">{formatRupiah(Number(product.price))}</p>
                {compareAtPrice ? <p className="pb-1 text-sm text-[#222222]/38 line-through">{formatRupiah(compareAtPrice)}</p> : null}
              </div>
              <p className="mt-3 text-sm text-[#222222]/58">Minimum order {product.minOrder} pcs • Stok {product.stock} pcs</p>
            </div>
            <p className="mt-6 leading-7 text-[#222222]/68">{product.shortDescription ?? product.description ?? "Produk kosmetik original untuk kebutuhan reseller dan toko kosmetik."}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_52px]">
              <button className="h-12 rounded-full bg-[#FF4F9A] text-sm font-semibold text-white hover:bg-[#e94288]">
                Tambah ke Keranjang
              </button>
              <button onClick={toggleWishlist} className={`flex h-12 items-center justify-center rounded-full border ${wishlisted ? "border-[#FF4F9A] text-[#FF4F9A]" : "border-[#222222]/12 text-[#222222]/65"}`} aria-label="Wishlist">
                <Heart className={wishlisted ? "size-5 fill-[#FF4F9A]" : "size-5"} />
              </button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Original", "Harga Grosir", "Admin Editable"].map((item) => (
                <div key={item} className="rounded-lg border border-[#222222]/8 p-4 text-sm font-semibold text-[#222222]">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-2xl font-semibold text-[#222222]">Detail Produk</h2>
            <p className="mt-4 leading-8 text-[#222222]/65">{product.description ?? product.shortDescription ?? "Deskripsi produk dapat dikelola dari dashboard admin pada tahap berikutnya."}</p>
          </div>
          <div className="rounded-lg border border-[#222222]/8 p-5">
            <h2 className="text-lg font-semibold text-[#222222]">Recently Viewed</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {recentlyViewed.map((slug) => (
                <span key={slug} className="rounded-full bg-[#FF4F9A]/8 px-3 py-1 text-xs font-semibold text-[#FF4F9A]">{slug}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-[#222222]">Review Produk</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {product.reviews.length ? product.reviews.map((review) => (
              <article key={review.id} className="rounded-lg border border-[#222222]/8 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-[#222222]">{review.name}</p>
                  <p className="text-sm font-semibold text-[#FF4F9A]">{review.rating}/5</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#222222]/62">{review.comment}</p>
              </article>
            )) : (
              <p className="rounded-lg border border-[#222222]/8 p-5 text-sm text-[#222222]/58">Belum ada review untuk produk ini.</p>
            )}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#FF4F9A]">Related Product</p>
              <h2 className="text-2xl font-semibold text-[#222222]">Produk terkait</h2>
            </div>
            <Link href={`/categories/${product.category.slug}`} className="text-sm font-semibold text-[#FF4F9A]">Lihat kategori</Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {relatedProducts.map((item) => <ProductCard key={item.slug} product={item} />)}
          </div>
        </section>
      </div>

      {isZoomed ? (
        <div className="fixed inset-0 z-[80] bg-white/96 p-4" role="dialog" aria-modal="true">
          <button onClick={() => setIsZoomed(false)} className="absolute right-6 top-6 rounded-full bg-[#222222] px-5 py-2 text-sm font-semibold text-white">Tutup</button>
          <div className="relative mx-auto h-full max-w-5xl">
            <Image src={activeImage} alt={`${product.name} zoom`} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </main>
  )
}

