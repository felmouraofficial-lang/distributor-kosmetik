import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"

import { formatRupiah, productImage } from "./format"

type ProductCardProduct = {
  name: string
  slug: string
  price: unknown
  compareAtPrice: unknown | null
  stock: number
  minOrder: number
  isNewArrival?: boolean
  brand: { name: string; slug: string }
  category: { name: string; slug: string }
  images: { url: string; alt: string | null }[]
  reviews: { rating: number }[]
}

function averageRating(reviews: { rating: number }[]) {
  if (!reviews.length) return "Baru"
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return (total / reviews.length).toFixed(1)
}

export function ProductCard({ product }: { product: ProductCardProduct }) {
  const image = productImage(product)
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null
  const price = Number(product.price)
  const discount = compareAtPrice ? Math.max(0, Math.round(((compareAtPrice - price) / compareAtPrice) * 100)) : 0

  return (
    <article className="group rounded-lg border border-[#222222]/8 bg-white p-2.5 transition hover:border-[#7C3FB3]/30 hover:shadow-lg hover:shadow-[#222222]/8">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-md bg-[#FAFAFA]">
          {discount ? (
            <span className="absolute right-2 top-2 z-10 rounded-full bg-[#7C3FB3] px-2 py-1 text-[11px] font-bold text-white">
              -{discount}%
            </span>
          ) : null}
          {product.isNewArrival ? (
            <span className="absolute bottom-2 left-2 z-10 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#7C3FB3] shadow-sm">
              Baru
            </span>
          ) : null}
          {product.stock > 0 ? (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-[#2BB673] px-2 py-1 text-[11px] font-semibold text-white">
              Ready
            </span>
          ) : (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-[#222222]/70 px-2 py-1 text-[11px] font-semibold text-white">
              Habis
            </span>
          )}
          <Image
            src={image}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-5 transition duration-300 group-hover:scale-105"
          />
        </div>
        <p className="mt-3 truncate text-xs font-semibold uppercase text-[#7C3FB3]">{product.brand.name}</p>
        <h3 className="mt-1 min-h-10 overflow-hidden text-sm font-semibold leading-5 text-[#222222]">{product.name}</h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-[#222222]/55">
          <Star className="size-3.5 fill-[#FFB547] text-[#FFB547]" />
          <span>{averageRating(product.reviews)}</span>
          <span>•</span>
          <span>{product.reviews.length} review</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="text-base font-bold text-[#7C3FB3]">{formatRupiah(price)}</p>
          {compareAtPrice ? <p className="text-xs text-[#222222]/38 line-through">{formatRupiah(compareAtPrice)}</p> : null}
        </div>
        <p className="mt-2 text-xs text-[#222222]/48">Min. {product.minOrder} pcs • Stok {product.stock} pcs</p>
      </Link>
      <div className="mt-3 grid grid-cols-[1fr_38px] gap-2">
        <button className="h-9 rounded-full bg-[#7C3FB3] text-xs font-semibold text-white transition hover:bg-[#69319b]">
          <ShoppingBag className="mr-1 inline size-4" /> Keranjang
        </button>
        <button className="flex h-9 items-center justify-center rounded-full border border-[#222222]/10 text-[#222222]/70 hover:border-[#7C3FB3]/35 hover:text-[#7C3FB3]" aria-label={`Tambah ${product.name} ke wishlist`}>
          <Heart className="size-4" />
        </button>
      </div>
    </article>
  )
}
