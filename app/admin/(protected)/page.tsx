import Link from "next/link"

import { prisma } from "@/app/prisma"
import { AdminCard, PageHeader } from "./ui"

export default async function AdminDashboardPage() {
  const [products, brands, categories, banners, articles] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.category.count(),
    prisma.banner.count(),
    prisma.article.count(),
  ])

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
