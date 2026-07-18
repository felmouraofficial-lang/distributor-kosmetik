"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

const messages: Record<string, string> = {
  brand_saved: "Brand berhasil disimpan.",
  brand_deleted: "Brand berhasil dihapus.",
  category_saved: "Kategori berhasil disimpan.",
  category_deleted: "Kategori berhasil dihapus.",
  banner_saved: "Banner berhasil disimpan.",
  banner_deleted: "Banner berhasil dihapus.",
  article_saved: "Artikel berhasil disimpan.",
  article_deleted: "Artikel berhasil dihapus.",
  product_saved: "Produk berhasil disimpan.",
  product_deleted: "Produk berhasil dihapus.",
}

export function AdminStatusToast() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const status = searchParams.get("success")

  useEffect(() => {
    if (!status || !messages[status]) return

    const cleanTimer = window.setTimeout(() => router.replace(pathname), 2800)

    return () => {
      window.clearTimeout(cleanTimer)
    }
  }, [pathname, router, status])

  if (!status || !messages[status]) return null

  return (
    <div className="fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-lg shadow-black/10">
      <CheckCircle2 className="size-5" aria-hidden="true" />
      <span>{messages[status]}</span>
    </div>
  )
}
