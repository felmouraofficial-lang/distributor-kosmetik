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

  return (
    <article className="group rounded-lg border border-[#222222]/8 bg-white p-3 transition hover:border-[#FF4F9A]/30 hover:shadow-xl hover:shadow-[#FF4F9A]/8">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-md bg-[#FAFAFA]">
          {product.stock > 0 ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#2BB673] px-2.5 py-1 text-xs font-semibold text-white">
              Ready
            </span>
          ) : (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#222222]/70 px-2.5 py-1 text-xs font-semibold text-white">
              Habis
            </span>
          )}
          <Image
            src={image}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-6 transition duration-300 group-hover:scale-105"
          />
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#222222]/45">{product.brand.name}</p>
        <h3 className="mt-1 min-h-12 text-sm font-semibold leading-6 text-[#222222]">{product.name}</h3>
        <div className="mt-2 flex items-center gap-1 text-xs text-[#222222]/55">
          <Star className="size-3.5 fill-[#FF4F9A] text-[#FF4F9A]" />
          <span>{averageRating(product.reviews)}</span>
          <span>•</span>
          <span>{product.category.name}</span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="text-base font-bold text-[#FF4F9A]">{formatRupiah(Number(product.price))}</p>
          {compareAtPrice ? <p className="text-xs text-[#222222]/38 line-through">{formatRupiah(compareAtPrice)}</p> : null}
        </div>
      </Link>
      <div className="mt-4 grid grid-cols-[1fr_40px] gap-2">
        <button className="h-10 rounded-full bg-[#FF4F9A] text-sm font-semibold text-white transition hover:bg-[#e94288]">
          <ShoppingBag className="mr-1 inline size-4" /> Keranjang
        </button>
        <button className="flex h-10 items-center justify-center rounded-full border border-[#222222]/10 text-[#222222]/70 hover:border-[#FF4F9A]/35 hover:text-[#FF4F9A]" aria-label={`Tambah ${product.name} ke wishlist`}>
          <Heart className="size-4" />
        </button>
      </div>
    </article>
  )
}
