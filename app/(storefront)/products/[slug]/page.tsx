import { notFound } from "next/navigation"

import { ProductDetailClient } from "./ProductDetailClient"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params
  let product = null
  let relatedProducts = []

  try {
    const { prisma } = await import("../../../prisma")
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: { select: { name: true, slug: true } },
        category: { select: { name: true, slug: true } },
        images: { orderBy: { sortOrder: "asc" }, select: { url: true, alt: true } },
        reviews: { orderBy: { createdAt: "desc" }, select: { id: true, name: true, rating: true, comment: true, createdAt: true } },
      },
    })

    if (product?.isPublished) {
      relatedProducts = await prisma.product.findMany({
        where: {
          isPublished: true,
          id: { not: product.id },
          OR: [{ categoryId: product.categoryId }, { brandId: product.brandId }],
        },
        take: 4,
        orderBy: { isFeatured: "desc" },
        include: {
          brand: { select: { name: true, slug: true } },
          category: { select: { name: true, slug: true } },
          images: { orderBy: { sortOrder: "asc" }, select: { url: true, alt: true } },
          reviews: { select: { rating: true } },
        },
      })
    }
  } catch (error) {
    console.error("Product detail data failed", error)
  }

  if (!product || !product.isPublished) notFound()

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}

