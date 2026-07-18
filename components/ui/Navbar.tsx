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
  { label: "Beranda", href: "#home" },
  { label: "Brand", href: "#brand" },
  { label: "Kategori", href: "#kategori" },
  { label: "Produk", href: "#produk" },
  { label: "Artikel", href: "#artikel" },
]

const categories = ["Skincare", "Makeup", "Bodycare", "Haircare"]

function BrandLogo() {
  return (
    <Link href="#home" className="flex items-center gap-3" aria-label="Distributor Kosmetik home">
      <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border border-[#FF4F9A]/15 bg-white shadow-sm">
        <Image
          src="/logo.png.png"
          alt="Distributor Kosmetik"
          fill
          sizes="44px"
          className="object-contain p-1"
          priority
        />
      </span>
      <span className="hidden text-sm font-semibold tracking-wide text-[#222222] sm:block">
        Distributor Kosmetik
      </span>
    </Link>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#FF4F9A]/10 bg-white/78 backdrop-blur-xl supports-backdrop-filter:bg-white/70">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#222222]/78 transition hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]"
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-[#222222]/78 transition hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
              Dropdown Kategori
            </button>
            <div className="invisible absolute left-1/2 top-full mt-3 w-48 -translate-x-1/2 rounded-lg border border-[#FF4F9A]/10 bg-white p-2 opacity-0 shadow-xl shadow-[#FF4F9A]/10 transition group-hover:visible group-hover:opacity-100">
              {categories.map((category) => (
                <Link
                  key={category}
                  href="#kategori"
                  className="block rounded-md px-3 py-2 text-sm text-[#222222]/75 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden w-60 items-center rounded-full border border-[#222222]/10 bg-white px-3 lg:flex">
          <Search className="size-4 text-[#222222]/45" aria-hidden="true" />
          <Input
            aria-label="Cari produk"
            placeholder="Cari produk"
            className="h-10 border-0 px-2 shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex lg:ml-0">
          <Button variant="ghost" size="icon-lg" aria-label="Wishlist" className="rounded-full">
            <Heart className="size-5" />
          </Button>
          <Button variant="ghost" size="icon-lg" aria-label="Cart" className="rounded-full">
            <ShoppingBag className="size-5" />
          </Button>
          <Button variant="outline" className="h-10 rounded-full px-4 text-[#222222]">
            Login
          </Button>
          <Button className="h-10 rounded-full bg-[#FF4F9A] px-5 text-white hover:bg-[#e94288]">
            Register
          </Button>
        </div>

        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon-lg" className="ml-auto rounded-full lg:hidden" aria-label="Buka menu" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] bg-white">
            <SheetHeader>
              <SheetTitle>Distributor Kosmetik</SheetTitle>
            </SheetHeader>
            <div className="px-4">
              <div className="mb-5 flex items-center rounded-full border border-[#222222]/10 px-3">
                <Search className="size-4 text-[#222222]/45" aria-hidden="true" />
                <Input aria-label="Cari produk mobile" placeholder="Cari produk" className="h-10 border-0 focus-visible:ring-0" />
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-sm font-medium text-[#222222] hover:bg-[#FF4F9A]/8">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-10 rounded-full">
                  <User className="size-4" /> Login
                </Button>
                <Button className="h-10 rounded-full bg-[#FF4F9A] text-white hover:bg-[#e94288]">
                  Register
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
