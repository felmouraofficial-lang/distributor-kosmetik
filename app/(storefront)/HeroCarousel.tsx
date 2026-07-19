"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Banner = {
  title: string
  subtitle: string | null
  description: string | null
  imageUrl: string | null
  ctaLabel: string | null
  ctaHref: string | null
  slug: string
}

const fallbackBanners: Banner[] = [
  {
    title: "Belanja stok kosmetik original untuk reseller",
    subtitle: "Promo Distributor Kosmetik",
    description: "Pilih produk fast moving, official brand, dan paket grosir untuk toko kamu.",
    imageUrl: "/logo.png.png",
    ctaLabel: "Belanja Sekarang",
    ctaHref: "/products",
    slug: "homepage-placeholder",
  },
]

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const slides = useMemo(() => (banners.length ? banners : fallbackBanners), [banners])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 5200)
    return () => window.clearInterval(timer)
  }, [slides.length])

  const slide = slides[active]

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-white shadow-xl shadow-[#7C3FB3]/10">
        <Link href={slide.ctaHref ?? "/products"} className="relative block aspect-[16/7] min-h-[260px] sm:aspect-[16/6] lg:aspect-[16/5]" aria-label={slide.title}>
          <Image src={slide.imageUrl ?? "/logo.png.png"} alt={slide.title} fill sizes="100vw" className="object-cover" priority />
        </Link>

        <button onClick={() => goTo(active - 1)} className="absolute left-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#222222] shadow-md transition hover:text-[#7C3FB3] sm:flex" aria-label="Banner sebelumnya">
          <ChevronLeft className="size-5" />
        </button>
        <button onClick={() => goTo(active + 1)} className="absolute right-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#222222] shadow-md transition hover:text-[#7C3FB3] sm:flex" aria-label="Banner berikutnya">
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((item, index) => (
            <button key={item.slug} onClick={() => goTo(index)} className={`h-2 rounded-full transition ${active === index ? "w-8 bg-[#7C3FB3]" : "w-2 bg-white/80"}`} aria-label={`Lihat banner ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
