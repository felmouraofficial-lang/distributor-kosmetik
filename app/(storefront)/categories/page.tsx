/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function CategoriesPage() {
  let categories: any[] = []

  try {
    const { prisma } = await import("../../prisma")
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    })
  } catch (error) {
    console.error("Categories page data failed", error)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-[#7C3FB3]">Category Page</p>
      <h1 className="mt-1 text-3xl font-semibold text-[#222222]">Kategori Produk</h1>
      {categories.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category: any) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-lg border border-[#222222]/8 bg-white p-6 hover:border-[#7C3FB3]/35">
              <h2 className="font-semibold text-[#222222]">{category.name}</h2>
              <p className="mt-2 text-sm text-[#222222]/58">{category._count.products} produk</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-[#222222]/8 bg-[#FAFAFA] p-10 text-center text-sm text-[#222222]/58">Kategori belum tersedia. Tambahkan data kategori di database.</div>
      )}
    </main>
  )
}

