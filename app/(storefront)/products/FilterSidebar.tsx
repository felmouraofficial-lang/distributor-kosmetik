import Link from "next/link"

export function FilterSidebar({
  brands,
  categories,
  activeBrand,
  activeCategory,
}: {
  brands: { name: string; slug: string }[]
  categories: { name: string; slug: string }[]
  activeBrand?: string
  activeCategory?: string
}) {
  return (
    <aside className="rounded-lg border border-[#222222]/8 bg-white p-4">
      <div className="border-b border-[#222222]/8 pb-4">
        <h2 className="text-sm font-semibold text-[#222222]">Filter Produk</h2>
        <Link href="/products" className="mt-2 inline-block text-xs font-semibold text-[#7C3FB3]">
          Reset filter
        </Link>
      </div>
      <div className="border-b border-[#222222]/8 py-4">
        <h3 className="text-sm font-semibold text-[#222222]">Brand</h3>
        <div className="mt-3 flex flex-col gap-2">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/products?brand=${brand.slug}`} className={`rounded-md px-2 py-2 text-sm ${activeBrand === brand.slug ? "bg-[#7C3FB3]/8 text-[#7C3FB3]" : "text-[#222222]/65 hover:bg-[#7C3FB3]/8"}`}>
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="py-4">
        <h3 className="text-sm font-semibold text-[#222222]">Kategori</h3>
        <div className="mt-3 flex flex-col gap-2">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className={`rounded-md px-2 py-2 text-sm ${activeCategory === category.slug ? "bg-[#7C3FB3]/8 text-[#7C3FB3]" : "text-[#222222]/65 hover:bg-[#7C3FB3]/8"}`}>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
