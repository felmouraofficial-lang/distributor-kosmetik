"use client"

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
  { label: "Skincare", href: "#skincare" },
  { label: "Makeup", href: "#makeup" },
  { label: "Bodycare", href: "#bodycare" },
  { label: "Haircare", href: "#haircare" },
  { label: "Brand", href: "#brand" },
  { label: "Promo", href: "#promo" },
]

const quickCategories = ["Serum", "Sunscreen", "Lip Cream", "Toner", "Cleanser", "Body Lotion"]

function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Distributor Kosmetik home">
      <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border border-[#FF4F9A]/15 bg-white">
        <Image
          src="/logo.png.png"
          alt="Distributor Kosmetik"
          fill
          sizes="44px"
          className="object-contain p-1"
          priority
        />
      </span>
      <span className="hidden text-base font-semibold text-[#222222] sm:block">
        Distributor Kosmetik
      </span>
    </Link>
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

        <div className="hidden flex-1 items-center rounded-full border border-[#222222]/12 bg-white px-4 shadow-sm md:flex">
          <Search className="size-5 text-[#222222]/45" aria-hidden="true" />
          <Input
            aria-label="Cari produk kosmetik"
            placeholder="Cari serum, sunscreen, lip cream, brand..."
            className="h-12 border-0 px-3 text-sm shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="ml-auto hidden items-center gap-1 md:flex lg:ml-0">
          <Button variant="ghost" size="icon-lg" aria-label="Wishlist" className="rounded-full">
            <Heart className="size-5" />
          </Button>
          <Button variant="ghost" size="icon-lg" aria-label="Cart" className="rounded-full">
            <ShoppingBag className="size-5" />
          </Button>
          <Button variant="ghost" size="icon-lg" aria-label="Akun" className="rounded-full">
            <User className="size-5" />
          </Button>
          <Button className="h-10 rounded-full bg-[#FF4F9A] px-5 text-white hover:bg-[#e94288]">
            Register
          </Button>
        </div>

        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="ml-auto rounded-full md:hidden" aria-label="Buka menu" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] bg-white">
            <SheetHeader>
              <SheetTitle>Belanja Kosmetik</SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <div className="mb-5 flex items-center rounded-full border border-[#222222]/12 px-3">
                <Search className="size-4 text-[#222222]/45" aria-hidden="true" />
                <Input aria-label="Cari produk mobile" placeholder="Cari produk" className="h-11 border-0 focus-visible:ring-0" />
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-sm font-medium text-[#222222] hover:bg-[#FF4F9A]/8">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden border-t border-[#222222]/6 bg-white lg:block" aria-label="Category navigation">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-8 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#222222]/76 transition hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-2 text-xs text-[#222222]/50">
            {quickCategories.map((category) => (
              <Link key={category} href="#produk" className="hover:text-[#FF4F9A]">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
