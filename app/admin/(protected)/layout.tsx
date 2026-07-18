import Link from "next/link"
import { redirect } from "next/navigation"
import { BarChart3, Boxes, ImageIcon, LayoutDashboard, Newspaper, Palette, Settings, Tags } from "lucide-react"

import { requireAdmin, logoutAdmin } from "../auth"
import { AdminStatusToast } from "./AdminStatusToast"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Boxes },
  { label: "Brand", href: "/admin/brands", icon: Tags },
  { label: "Kategori", href: "/admin/categories", icon: BarChart3 },
  { label: "Banner", href: "/admin/banners", icon: Palette },
  { label: "Artikel", href: "/admin/articles", icon: Newspaper },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Pengaturan", href: "/admin/settings", icon: Settings },
]

async function logoutAction() {
  "use server"
  await logoutAdmin()
  redirect("/admin/login")
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#202124]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-black/10 bg-white lg:block">
        <div className="border-b border-black/10 px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#FF4F9A]">Admin CMS</p>
          <h1 className="mt-1 text-xl font-semibold">Distributor Kosmetik</h1>
        </div>
        <nav className="space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-black/68 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-black/10 bg-white/90 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#FF4F9A]">Dashboard</p>
              <p className="text-sm text-black/55">Kelola konten storefront dari database.</p>
            </div>
            <form action={logoutAction}>
              <button className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:border-[#FF4F9A]/40 hover:text-[#FF4F9A]">Logout</button>
            </form>
          </div>
          <nav className="flex gap-2 overflow-x-auto border-t border-black/5 px-4 py-2 lg:hidden">
            {navItems.map((item) => <Link key={item.href} href={item.href} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-black/60 hover:bg-[#FF4F9A]/8">{item.label}</Link>)}
          </nav>
        </header>
        <AdminStatusToast />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

