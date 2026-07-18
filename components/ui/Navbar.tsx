"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navItems = [
  { label: "Skincare", href: "/products?category=skincare" },
  { label: "Makeup", href: "/products?category=makeup" },
  { label: "Bodycare", href: "/products?category=bodycare" },
  { label: "Haircare", href: "/products?category=haircare" },
  { label: "Brand", href: "/brands" },
  { label: "Promo", href: "/products?sort=featured" },
]

type SearchProduct = {
  name: string
  slug: string
  price: number
  brand: { name: string }
  images: { url: string; alt: string | null }[]
}

function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Distributor Kosmetik home">
      <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border border-[#FF4F9A]/15 bg-white">
        <Image src="/logo.png.png" alt="Distributor Kosmetik" fill sizes="44px" className="object-contain p-1" priority />
      </span>
      <span className="hidden text-base font-semibold text-[#222222] sm:block">Distributor Kosmetik</span>
    </Link>
  )
}

function SearchAutocomplete() {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<SearchProduct[]>([])

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(async () => {
      if (query.trim().length < 2) {
        setProducts([])
        return
      }

      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      const data = (await response.json()) as { products: SearchProduct[] }
      setProducts(data.products)
    }, 220)

    return () => {
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  return (
    <form action="/products" className="relative hidden flex-1 md:block">
      <div className="flex items-center rounded-full border border-[#222222]/12 bg-white px-4 shadow-sm">
        <Search className="size-5 text-[#222222]/45" aria-hidden="true" />
        <Input
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Cari produk kosmetik"
          placeholder="Cari serum, sunscreen, lip cream, brand..."
          className="h-12 border-0 px-3 text-sm shadow-none focus-visible:ring-0"
          autoComplete="off"
        />
      </div>
      {products.length ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-lg border border-[#222222]/8 bg-white p-2 shadow-xl shadow-[#222222]/10">
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="flex items-center gap-3 rounded-md p-2 hover:bg-[#FF4F9A]/8">
              <span className="relative size-12 overflow-hidden rounded-md bg-[#FAFAFA]">
                <Image src={product.images[0]?.url ?? "/logo.png.png"} alt={product.images[0]?.alt ?? product.name} fill sizes="48px" className="object-contain p-1" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-[#222222]">{product.name}</span>
                <span className="text-xs text-[#222222]/50">{product.brand.name}</span>
              </span>
              <span className="text-sm font-semibold text-[#FF4F9A]">Rp {product.price.toLocaleString("id-ID")}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </form>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#222222]/8 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/88">
      <div className="bg-[#FF4F9A] px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        Gratis konsultasi stok reseller dan promo grosir minggu ini
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo />
        <SearchAutocomplete />
        <div className="ml-auto hidden items-center gap-1 md:flex lg:ml-0">
          <Button variant="ghost" size="icon-lg" aria-label="Wishlist" className="rounded-full"><Heart className="size-5" /></Button>
          <Button variant="ghost" size="icon-lg" aria-label="Cart" className="rounded-full"><ShoppingBag className="size-5" /></Button>
          <Button variant="ghost" size="icon-lg" aria-label="Akun" className="rounded-full"><User className="size-5" /></Button>
          <Button className="h-10 rounded-full bg-[#FF4F9A] px-5 text-white hover:bg-[#e94288]">Register</Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="ml-auto rounded-full md:hidden" aria-label="Buka menu" />}><Menu className="size-5" /></SheetTrigger>
          <SheetContent side="right" className="w-[88vw] bg-white">
            <SheetHeader><SheetTitle>Belanja Kosmetik</SheetTitle></SheetHeader>
            <div className="px-4">
              <form action="/products" className="mb-5 flex items-center rounded-full border border-[#222222]/12 px-3">
                <Search className="size-4 text-[#222222]/45" aria-hidden="true" />
                <Input name="q" aria-label="Cari produk mobile" placeholder="Cari produk" className="h-11 border-0 focus-visible:ring-0" />
              </form>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-sm font-medium text-[#222222] hover:bg-[#FF4F9A]/8">{item.label}</Link>)}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <nav className="hidden border-t border-[#222222]/6 bg-white lg:block" aria-label="Category navigation">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-8 py-3">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-[#222222]/76 transition hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">{item.label}</Link>)}
        </div>
      </nav>
    </header>
  )
}
