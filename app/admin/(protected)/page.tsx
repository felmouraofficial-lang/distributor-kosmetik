import Link from "next/link"

import { AdminCard, PageHeader } from "./ui"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboardPage() {
  let products = 0
  let brands = 0
  let categories = 0
  let banners = 0
  let articles = 0

  try {
    const { prisma } = await import("@/app/prisma")
    ;[products, brands, categories, banners, articles] = await Promise.all([
      prisma.product.count(),
      prisma.brand.count(),
      prisma.category.count(),
      prisma.banner.count(),
      prisma.article.count(),
    ])
  } catch (error) {
    console.error("Admin dashboard data failed", error)
  }

  const stats = [
    ["Produk", products, "/admin/products"],
    ["Brand", brands, "/admin/brands"],
    ["Kategori", categories, "/admin/categories"],
    ["Banner", banners, "/admin/banners"],
    ["Artikel", articles, "/admin/articles"],
  ]

  return (
    <>
      <PageHeader title="Dashboard" description="Ringkasan konten database Distributor Kosmetik." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(([label, value, href]) => (
          <Link key={label} href={String(href)}>
            <AdminCard>
              <p className="text-sm font-semibold text-black/55">{label}</p>
              <p className="mt-3 text-3xl font-semibold text-[#FF4F9A]">{String(value)}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </>
  )
}


