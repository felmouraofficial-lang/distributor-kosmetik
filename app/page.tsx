import Image from "next/image"

const categories = [
  "Skincare",
  "Makeup",
  "Bodycare",
  "Haircare",
  "Sunscreen",
  "Lip Care",
  "Cleanser",
  "Serum",
]

const brands = ["Wardah", "Somethinc", "Emina", "Avoskin", "Scarlett", "Azarine"]

const flashSaleProducts = [
  { name: "Brightening Serum 20ml", category: "Serum", price: "Rp 42.000", oldPrice: "Rp 58.000", badge: "-28%" },
  { name: "Daily UV Sunscreen SPF 50", category: "Sunscreen", price: "Rp 36.000", oldPrice: "Rp 49.000", badge: "-27%" },
  { name: "Matte Lip Cream Nude Set", category: "Makeup", price: "Rp 29.000", oldPrice: "Rp 39.000", badge: "-26%" },
  { name: "Hydrating Toner 100ml", category: "Toner", price: "Rp 33.000", oldPrice: "Rp 45.000", badge: "-27%" },
]

const bestSellers = [
  { name: "Niacinamide Serum Bundle", category: "Skincare", price: "Rp 88.000", badge: "Best Seller" },
  { name: "Oil Control Powder", category: "Makeup", price: "Rp 31.000", badge: "Ready" },
  { name: "Body Lotion Bright Pack", category: "Bodycare", price: "Rp 52.000", badge: "Grosir" },
  { name: "Gentle Facial Wash", category: "Cleanser", price: "Rp 27.000", badge: "Stok aman" },
]

const newArrivals = [
  { name: "Cica Barrier Moisturizer", category: "Moisturizer", price: "Rp 47.000", badge: "New" },
  { name: "Glossy Lip Tint", category: "Lip Care", price: "Rp 25.000", badge: "New" },
  { name: "Hair Tonic Daily Care", category: "Haircare", price: "Rp 39.000", badge: "New" },
  { name: "Retinol Night Serum", category: "Treatment", price: "Rp 61.000", badge: "New" },
]

type Product = { name: string; category: string; price: string; oldPrice?: string; badge: string }

const articles = [
  "Cara memilih produk fast moving untuk toko kosmetik",
  "Checklist supplier kosmetik original untuk reseller",
  "Strategi promo bundling agar stok lebih cepat berputar",
]

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-[#FF4F9A]">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold text-[#222222] sm:text-3xl">{title}</h2>
      </div>
      <a href="#produk" className="hidden text-sm font-semibold text-[#FF4F9A] sm:block">
        Lihat Semua
      </a>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-lg border border-[#222222]/8 bg-white p-4 transition hover:border-[#FF4F9A]/30 hover:shadow-lg hover:shadow-[#FF4F9A]/8">
      <div className="relative aspect-square overflow-hidden rounded-md bg-[#FAFAFA]">
        <div className="absolute left-3 top-3 z-10 rounded-full bg-[#2BB673] px-2.5 py-1 text-xs font-semibold text-white">
          {product.badge}
        </div>
        <div className="absolute inset-6 rounded-full bg-white" />
        <div className="absolute inset-x-8 bottom-8 h-20 rounded-t-full border border-[#FF4F9A]/16 bg-[#FFF4F9]" />
        <div className="absolute left-1/2 top-1/2 h-28 w-16 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[#222222]/8 bg-white shadow-sm" />
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#222222]/45">{product.category}</p>
      <h3 className="mt-1 min-h-12 text-sm font-semibold leading-6 text-[#222222]">{product.name}</h3>
      <div className="mt-3 flex items-center gap-2">
        <p className="text-base font-bold text-[#FF4F9A]">{product.price}</p>
        {product.oldPrice ? <p className="text-xs text-[#222222]/38 line-through">{product.oldPrice}</p> : null}
      </div>
      <button className="mt-4 h-10 w-full rounded-full border border-[#FF4F9A] text-sm font-semibold text-[#FF4F9A] transition hover:bg-[#FF4F9A] hover:text-white">
        Tambah ke Keranjang
      </button>
    </article>
  )
}

function ProductRow({ eyebrow, title, products }: { eyebrow: string; title: string; products: Product[] }) {
  return (
    <section id="produk" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[220px_1fr_280px]">
          <aside className="hidden rounded-lg border border-[#222222]/8 bg-white p-3 lg:block">
            <p className="px-2 pb-2 text-sm font-semibold text-[#222222]">Kategori</p>
            {categories.map((category) => (
              <a key={category} href="#produk" className="block rounded-md px-2 py-2 text-sm text-[#222222]/70 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
                {category}
              </a>
            ))}
          </aside>

          <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-[#222222]/8 bg-[#FFF7FB] px-6 py-8 sm:px-10">
            <div className="max-w-xl">
              <p className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#FF4F9A] shadow-sm">
                Promo Distributor Kosmetik
              </p>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-[#222222] sm:text-5xl">
                Belanja stok kosmetik original untuk toko dan reseller.
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-[#222222]/62 sm:text-base">
                Pilih produk fast moving, brand resmi, dan paket grosir dengan pengalaman belanja yang cepat dan rapi.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#flash-sale" className="inline-flex h-11 items-center justify-center rounded-full bg-[#FF4F9A] px-6 text-sm font-semibold text-white hover:bg-[#e94288]">
                  Belanja Promo
                </a>
                <a href="#brand" className="inline-flex h-11 items-center justify-center rounded-full border border-[#FF4F9A]/40 bg-white px-6 text-sm font-semibold text-[#FF4F9A]">
                  Official Brand
                </a>
              </div>
            </div>
            <div className="absolute bottom-0 right-6 hidden h-64 w-56 lg:block">
              <Image src="/logo.png.png" alt="Distributor Kosmetik" fill sizes="224px" className="object-contain object-bottom" priority />
            </div>
          </div>

          <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-lg border border-[#222222]/8 bg-white p-5">
              <p className="text-sm font-semibold text-[#222222]">Voucher Reseller</p>
              <p className="mt-2 text-2xl font-bold text-[#FF4F9A]">Diskon 15%</p>
              <p className="mt-2 text-sm text-[#222222]/58">Untuk pembelian paket stok pilihan.</p>
            </div>
            <div className="rounded-lg border border-[#222222]/8 bg-white p-5">
              <p className="text-sm font-semibold text-[#222222]">Ready Stock</p>
              <p className="mt-2 text-2xl font-bold text-[#FF4F9A]">1.200+ SKU</p>
              <p className="mt-2 text-sm text-[#222222]/58">Skincare, makeup, bodycare, dan haircare.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#222222]/8 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-6 sm:grid-cols-4 lg:grid-cols-8 lg:px-8">
          {categories.map((category) => (
            <a key={category} href="#produk" className="rounded-lg px-3 py-4 text-center text-sm font-semibold text-[#222222]/72 hover:bg-[#FF4F9A]/8 hover:text-[#FF4F9A]">
              {category}
            </a>
          ))}
        </div>
      </section>

      <ProductRow eyebrow="Flash Sale" title="Promo cepat untuk stok reseller" products={flashSaleProducts} />

      <section id="brand" className="bg-[#FAFAFA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Official Brand" title="Brand partner pilihan" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => (
              <a key={brand} href="#produk" className="rounded-lg border border-[#222222]/8 bg-white px-5 py-6 text-center text-sm font-semibold text-[#222222]/72 hover:border-[#FF4F9A]/35 hover:text-[#FF4F9A]">
                {brand}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ProductRow eyebrow="Best Seller" title="Produk paling sering dibeli" products={bestSellers} />

      <section id="promo" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <a href="#produk" className="rounded-lg border border-[#FF4F9A]/16 bg-[#FFF4F9] p-7">
            <p className="text-sm font-semibold text-[#FF4F9A]">Promo Bundling</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#222222]">Paket skincare margin sehat</h2>
            <p className="mt-3 text-sm text-[#222222]/60">Cocok untuk toko online dan offline yang ingin stok produk repeat order.</p>
          </a>
          <a href="#produk" className="rounded-lg border border-[#FF4F9A]/16 bg-white p-7">
            <p className="text-sm font-semibold text-[#FF4F9A]">Harga Grosir</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#222222]">Diskon bertingkat untuk reseller</h2>
            <p className="mt-3 text-sm text-[#222222]/60">Beli lebih banyak dengan struktur harga yang jelas dan mudah diputar.</p>
          </a>
        </div>
      </section>

      <ProductRow eyebrow="New Arrival" title="Produk terbaru minggu ini" products={newArrivals} />

      <section id="artikel" className="bg-[#FAFAFA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Artikel" title="Insight belanja dan bisnis kosmetik" />
          <div className="grid gap-4 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article} className="rounded-lg border border-[#222222]/8 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#FF4F9A]">Panduan Reseller</p>
                <h3 className="mt-3 text-lg font-semibold leading-7 text-[#222222]">{article}</h3>
                <p className="mt-3 text-sm leading-6 text-[#222222]/60">Konten edukasi singkat untuk membantu pemilihan stok dan promo toko.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#222222]/8 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="relative size-14 overflow-hidden rounded-full border border-[#FF4F9A]/15">
              <Image src="/logo.png.png" alt="Logo Distributor Kosmetik" fill sizes="56px" className="object-contain p-1" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#222222]/60">
              Distributor kosmetik original untuk kebutuhan reseller, dropshipper, toko online, dan toko offline Indonesia.
            </p>
          </div>
          {[
            ["Belanja", "Flash Sale", "Best Seller", "New Arrival"],
            ["Kategori", "Skincare", "Makeup", "Bodycare"],
            ["Bantuan", "Daftar Reseller", "Cek Stok", "Kontak"]
          ].map(([title, ...items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[#222222]">{title}</h3>
              <div className="mt-4 flex flex-col gap-3">
                {items.map((item) => (
                  <a key={item} href="#produk" className="text-sm text-[#222222]/58 hover:text-[#FF4F9A]">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-[#222222]/8 pt-6 text-sm text-[#222222]/50">
          © 2026 Distributor Kosmetik. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

