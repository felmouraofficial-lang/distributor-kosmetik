import Link from "next/link"
import { Home, LayoutGrid, ShoppingBag, Sparkles, User } from "lucide-react"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Kategori", href: "/categories", icon: LayoutGrid },
  { label: "Promo", href: "/products?sort=featured", icon: Sparkles },
  { label: "Cart", href: "/products", icon: ShoppingBag },
  { label: "Akun", href: "/products", icon: User },
]

export function BottomNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-[#222222]/8 bg-white/95 px-2 py-2 shadow-[0_-10px_30px_rgba(34,34,34,0.08)] backdrop-blur md:hidden" aria-label="Mobile bottom navigation">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] font-semibold text-[#222222]/60 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
