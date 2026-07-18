/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"

import { prisma } from "../products/prisma"

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-[#FF4F9A]">Category Page</p>
      <h1 className="mt-1 text-3xl font-semibold text-[#222222]">Kategori Produk</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category: any) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-lg border border-[#222222]/8 bg-white p-6 hover:border-[#FF4F9A]/35">
            <h2 className="font-semibold text-[#222222]">{category.name}</h2>
            <p className="mt-2 text-sm text-[#222222]/58">{category._count.products} produk</p>
          </Link>
        ))}
      </div>
    </main>
  )
}


