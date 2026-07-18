"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { prisma } from "@/app/prisma"

function text(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" && value.trim() ? value.trim() : null
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on"
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key))
  return Number.isFinite(value) ? value : fallback
}

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

async function fileToDataUrl(file: File | null) {
  if (!file || file.size === 0) return null
  const buffer = Buffer.from(await file.arrayBuffer())
  return `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`
}

async function imageValue(formData: FormData, fileKey: string, urlKey: string) {
  const uploaded = await fileToDataUrl(formData.get(fileKey) as File | null)
  return uploaded ?? text(formData, urlKey)
}

export async function saveBrand(formData: FormData) {
  const id = text(formData, "id")
  const name = text(formData, "name") ?? "Untitled Brand"
  const data = {
    name,
    slug: text(formData, "slug") ?? slugify(name),
    description: text(formData, "description"),
    logoUrl: await imageValue(formData, "logoFile", "logoUrl"),
    isOfficial: bool(formData, "isOfficial"),
  }

  if (id) await prisma.brand.update({ where: { id }, data })
  else await prisma.brand.create({ data })
  revalidatePath("/admin/brands")
  revalidatePath("/")
  redirect("/admin/brands")
}

export async function deleteBrand(formData: FormData) {
  const id = text(formData, "id")
  if (id) await prisma.brand.delete({ where: { id } })
  revalidatePath("/admin/brands")
  redirect("/admin/brands")
}

export async function saveCategory(formData: FormData) {
  const id = text(formData, "id")
  const name = text(formData, "name") ?? "Untitled Category"
  const parentId = text(formData, "parentId")
  const data = {
    name,
    slug: text(formData, "slug") ?? slugify(name),
    description: text(formData, "description"),
    parentId: parentId === "none" ? null : parentId,
  }

  if (id) await prisma.category.update({ where: { id }, data })
  else await prisma.category.create({ data })
  revalidatePath("/admin/categories")
  revalidatePath("/")
  redirect("/admin/categories")
}

export async function deleteCategory(formData: FormData) {
  const id = text(formData, "id")
  if (id) await prisma.category.delete({ where: { id } })
  revalidatePath("/admin/categories")
  redirect("/admin/categories")
}

export async function saveBanner(formData: FormData) {
  const id = text(formData, "id")
  const title = text(formData, "title") ?? "Untitled Banner"
  const data = {
    title,
    slug: text(formData, "slug") ?? slugify(title),
    subtitle: text(formData, "subtitle"),
    description: text(formData, "description"),
    imageUrl: await imageValue(formData, "imageFile", "imageUrl"),
    ctaLabel: text(formData, "ctaLabel"),
    ctaHref: text(formData, "ctaHref"),
    placement: text(formData, "placement") ?? "homepage",
    sortOrder: numberValue(formData, "sortOrder"),
    isActive: bool(formData, "isActive"),
  }

  if (id) await prisma.banner.update({ where: { id }, data })
  else await prisma.banner.create({ data })
  revalidatePath("/admin/banners")
  revalidatePath("/")
  redirect("/admin/banners")
}

export async function deleteBanner(formData: FormData) {
  const id = text(formData, "id")
  if (id) await prisma.banner.delete({ where: { id } })
  revalidatePath("/admin/banners")
  redirect("/admin/banners")
}

export async function saveArticle(formData: FormData) {
  const id = text(formData, "id")
  const title = text(formData, "title") ?? "Untitled Article"
  const publishedAt = text(formData, "publishedAt")
  const data = {
    title,
    slug: text(formData, "slug") ?? slugify(title),
    excerpt: text(formData, "excerpt"),
    content: text(formData, "content"),
    imageUrl: await imageValue(formData, "imageFile", "imageUrl"),
    category: text(formData, "category"),
    author: text(formData, "author"),
    isPublished: bool(formData, "isPublished"),
    publishedAt: publishedAt ? new Date(publishedAt) : null,
  }

  if (id) await prisma.article.update({ where: { id }, data })
  else await prisma.article.create({ data })
  revalidatePath("/admin/articles")
  revalidatePath("/")
  redirect("/admin/articles")
}

export async function deleteArticle(formData: FormData) {
  const id = text(formData, "id")
  if (id) await prisma.article.delete({ where: { id } })
  revalidatePath("/admin/articles")
  redirect("/admin/articles")
}

export async function saveProduct(formData: FormData) {
  const id = text(formData, "id")
  const name = text(formData, "name") ?? "Untitled Product"
  const thumbnail = await imageValue(formData, "thumbnailFile", "thumbnail")
  const data = {
    name,
    slug: text(formData, "slug") ?? slugify(name),
    sku: text(formData, "sku") ?? `SKU-${Date.now()}`,
    shortDescription: text(formData, "shortDescription"),
    description: text(formData, "description"),
    ingredients: text(formData, "ingredients"),
    howToUse: text(formData, "howToUse"),
    bpomNumber: text(formData, "bpomNumber"),
    thumbnail,
    weight: numberValue(formData, "weight"),
    price: numberValue(formData, "price"),
    compareAtPrice: text(formData, "compareAtPrice") ? numberValue(formData, "compareAtPrice") : null,
    stock: numberValue(formData, "stock"),
    minOrder: numberValue(formData, "minOrder", 1),
    isPublished: bool(formData, "isPublished"),
    isFeatured: bool(formData, "isFeatured"),
    isBestSeller: bool(formData, "isBestSeller"),
    isFlashSale: bool(formData, "isFlashSale"),
    isNewArrival: bool(formData, "isNewArrival"),
    brandId: text(formData, "brandId") ?? "",
    categoryId: text(formData, "categoryId") ?? "",
  }

  const product = id
    ? await prisma.product.update({ where: { id }, data })
    : await prisma.product.create({ data })

  const galleryUrls = [
    await imageValue(formData, "galleryFile1", "galleryUrl1"),
    await imageValue(formData, "galleryFile2", "galleryUrl2"),
  ].filter(Boolean) as string[]

  const images = galleryUrls.length ? galleryUrls : thumbnail ? [thumbnail] : []
  for (let index = 0; index < images.length; index += 1) {
    await prisma.productImage.upsert({
      where: { productId_sortOrder: { productId: product.id, sortOrder: index } },
      update: { url: images[index], alt: `${name} image ${index + 1}` },
      create: { productId: product.id, sortOrder: index, url: images[index], alt: `${name} image ${index + 1}` },
    })
  }

  revalidatePath("/admin/products")
  revalidatePath("/")
  revalidatePath("/products")
  redirect("/admin/products")
}

export async function deleteProduct(formData: FormData) {
  const id = text(formData, "id")
  if (id) await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/products")
  redirect("/admin/products")
}
