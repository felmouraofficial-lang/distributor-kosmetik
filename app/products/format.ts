export function formatRupiah(value: number | string) {
  const amount = typeof value === "string" ? Number(value) : value

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function productImage(product: { images: { url: string }[] }) {
  return product.images[0]?.url ?? "/logo.png.png"
}
