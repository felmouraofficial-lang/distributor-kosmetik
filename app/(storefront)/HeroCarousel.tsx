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
      <div className="relative min-h-[430px] overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#fff4fa_0%,#ffe6f1_48%,#ffffff_100%)] px-6 py-8 shadow-xl shadow-[#FF4F9A]/10 sm:min-h-[500px] sm:px-10 lg:px-14">
        <div className="relative z-10 flex min-h-[360px] max-w-xl flex-col justify-center sm:min-h-[430px]">
          {slide.subtitle ? <p className="w-fit rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#FF4F9A] shadow-sm">{slide.subtitle}</p> : null}
          <h1 className="mt-5 text-4xl font-bold leading-tight text-[#222222] sm:text-6xl">{slide.title}</h1>
          {slide.description ? <p className="mt-5 max-w-lg text-base leading-7 text-[#222222]/65 sm:text-lg">{slide.description}</p> : null}
          <Link href={slide.ctaHref ?? "/products"} className="mt-8 inline-flex h-12 w-fit items-center justify-center rounded-full bg-[#FF4F9A] px-8 text-sm font-bold text-white shadow-lg shadow-[#FF4F9A]/25 transition hover:bg-[#e94288]">
            {slide.ctaLabel ?? "Belanja Sekarang"}
          </Link>
        </div>

        <div className="absolute bottom-0 right-0 h-64 w-64 sm:h-96 sm:w-96 lg:right-12 lg:h-[430px] lg:w-[430px]">
          <Image src={slide.imageUrl ?? "/logo.png.png"} alt={slide.title} fill sizes="(max-width: 768px) 260px, 430px" className="object-contain object-bottom drop-shadow-2xl" priority />
        </div>

        <button onClick={() => goTo(active - 1)} className="absolute left-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#222222] shadow-md transition hover:text-[#FF4F9A] sm:flex" aria-label="Banner sebelumnya">
          <ChevronLeft className="size-5" />
        </button>
        <button onClick={() => goTo(active + 1)} className="absolute right-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#222222] shadow-md transition hover:text-[#FF4F9A] sm:flex" aria-label="Banner berikutnya">
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((item, index) => (
            <button key={item.slug} onClick={() => goTo(index)} className={`h-2 rounded-full transition ${active === index ? "w-8 bg-[#FF4F9A]" : "w-2 bg-white/80"}`} aria-label={`Lihat banner ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
