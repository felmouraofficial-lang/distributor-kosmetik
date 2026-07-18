/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation"

import { ProductCard } from "../../products/ProductCard"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

type BrandPageProps = { params: Promise<{ slug: string }> }

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  let brand: any = null

  try {
    const { prisma } = await import("../../products/prisma")
    brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isPublished: true },
          include: {
            brand: { select: { name: true, slug: true } },
            category: { select: { name: true, slug: true } },
            images: { orderBy: { sortOrder: "asc" }, select: { url: true, alt: true } },
            reviews: { select: { rating: true } },
          },
        },
      },
    })
  } catch (error) {
    console.error("Brand detail data failed", error)
  }

  if (!brand) notFound()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-[#FF4F9A]">Official Brand</p>
      <h1 className="mt-1 text-3xl font-semibold text-[#222222]">{brand.name}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#222222]/60">{brand.description ?? "Brand resmi dengan produk kosmetik original untuk reseller."}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {brand.products.map((product: any) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </main>
  )
}
