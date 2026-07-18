/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim()

  if (!q) return NextResponse.json({ products: [] })

  try {
    const { prisma } = await import("../../prisma")
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        name: { contains: q, mode: "insensitive" },
      },
      take: 6,
      orderBy: { isFeatured: "desc" },
      select: {
        name: true,
        slug: true,
        price: true,
        images: { orderBy: { sortOrder: "asc" }, take: 1, select: { url: true, alt: true } },
        brand: { select: { name: true } },
      },
    })

    return NextResponse.json({
      products: products.map((product: any) => ({
        ...product,
        price: Number(product.price),
      })),
    })
  } catch (error) {
    console.error("Search API failed", error)
    return NextResponse.json({ products: [] }, { status: 200 })
  }
}


