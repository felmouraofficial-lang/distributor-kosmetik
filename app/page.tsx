import Image from "next/image"

const brands = ["Wardah", "Somethinc", "Emina", "Avoskin", "Scarlett"]
const categories = ["Skincare", "Makeup", "Bodycare", "Haircare"]
const products = [
  { name: "Brightening Serum Bundle", category: "Skincare", price: "Mulai Rp 45.000" },
  { name: "Matte Lip Cream Box", category: "Makeup", price: "Mulai Rp 28.000" },
  { name: "Daily Sunscreen Pack", category: "Skincare", price: "Mulai Rp 38.000" },
]

export default function HomePage() {
  return (
    <main id="home" className="min-h-screen overflow-hidden bg-white">
      <section className="relative border-b border-[#FF4F9A]/10">
        <div className="absolute left-[-10%] top-10 size-72 rounded-full bg-[#FF4F9A]/18 blur-3xl" />
        <div className="absolute bottom-0 right-[-8%] size-80 rounded-full bg-[#2BB673]/14 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="w-fit rounded-full border border-[#FF4F9A]/20 bg-[#FF4F9A]/8 px-4 py-2 text-sm font-semibold text-[#FF4F9A]">
              Distributor resmi untuk bisnis kecantikan Indonesia
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight text-[#222222] sm:text-6xl lg:text-7xl">
              Supplier kosmetik original untuk reseller yang ingin tumbuh premium.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#222222]/68 sm:text-lg">
              Distributor Kosmetik menyediakan skincare, bodycare, makeup, dan kebutuhan kecantikan original dengan stok terkurasi, harga grosir, dan pengalaman belanja yang siap dikembangkan untuk operasional bisnis.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#produk" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FF4F9A] px-7 text-sm font-semibold text-white shadow-lg shadow-[#FF4F9A]/20 transition hover:bg-[#e94288]">
                Belanja Sekarang
              </a>
              <a href="#newsletter" className="inline-flex h-12 items-center justify-center rounded-full border border-[#2BB673]/35 bg-white px-7 text-sm font-semibold text-[#2BB673] transition hover:bg-[#2BB673]/8">
                Daftar Reseller
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] rounded-[2rem] border border-[#FF4F9A]/10 bg-gradient-to-br from-white via-[#fff6fa] to-[#f3fff9] p-6 shadow-2xl shadow-[#FF4F9A]/10">
            <div className="absolute inset-x-10 top-10 h-24 rounded-full bg-white/70 blur-2xl" />
            <div className="relative flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-white/80 bg-white/62 p-8 text-center backdrop-blur">
              <div className="relative size-44 sm:size-56">
                <Image
                  src="/logo.png.png"
                  alt="Logo Distributor Kosmetik"
                  fill
                  sizes="(max-width: 640px) 176px, 224px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
                {[
                  ["100%", "Original"],
                  ["Grosir", "Harga reseller"],
                  ["Ready", "Stok pilihan"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#222222]/8 bg-white px-4 py-4">
                    <p className="text-lg font-semibold text-[#222222]">{value}</p>
                    <p className="mt-1 text-xs text-[#222222]/55">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="brand" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-5">
          {brands.map((brand) => (
            <div key={brand} className="rounded-lg border border-[#222222]/8 bg-white px-5 py-4 text-center text-sm font-semibold text-[#222222]/70 shadow-sm">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section id="kategori" className="bg-[#FAFAFA] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-[#FF4F9A]">Kategori Produk</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#222222]">Koleksi siap jual</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#222222]/62">
              Konten ini dipisahkan sebagai data halaman sehingga siap dipindahkan ke dashboard admin pada tahap berikutnya.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <article key={category} className="rounded-lg border border-[#222222]/8 bg-white p-6 shadow-sm">
                <div className="mb-5 size-10 rounded-full bg-[#2BB673]/12" />
                <h3 className="text-lg font-semibold text-[#222222]">{category}</h3>
                <p className="mt-2 text-sm leading-6 text-[#222222]/60">Produk original terkurasi untuk kebutuhan bisnis kecantikan.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-[#FF4F9A]">Produk Terlaris</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#222222]">Pilihan utama reseller</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="rounded-lg border border-[#222222]/8 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF4F9A]/10">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2BB673]">{product.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-[#222222]">{product.name}</h3>
              <p className="mt-4 text-sm font-semibold text-[#FF4F9A]">{product.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#222222] px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[#2BB673]">Promo Banner</p>
            <h2 className="mt-2 text-3xl font-semibold">Harga grosir untuk batch reseller pilihan.</h2>
          </div>
          <a href="#newsletter" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-[#222222]">
            Konsultasi Stok
          </a>
        </div>
      </section>

      <section id="artikel" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold text-[#FF4F9A]">Artikel</p>
        <h2 className="mt-2 text-3xl font-semibold text-[#222222]">Insight bisnis kecantikan</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {["Cara memilih produk fast moving", "Checklist supplier kosmetik original"].map((title) => (
            <article key={title} className="rounded-lg border border-[#222222]/8 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#222222]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#222222]/62">Materi editorial ringkas untuk membantu reseller mengambil keputusan stok dengan lebih terukur.</p>
            </article>
          ))}
        </div>
      </section>

      <section id="newsletter" className="bg-[#FFF4F9] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#FF4F9A]">Newsletter</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#222222]">Dapatkan update katalog dan promo reseller.</h2>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input aria-label="Email reseller" type="email" placeholder="email@bisnisanda.com" className="h-12 flex-1 rounded-full border border-[#222222]/10 bg-white px-5 text-sm outline-none focus:border-[#FF4F9A]" />
            <button className="h-12 rounded-full bg-[#FF4F9A] px-7 text-sm font-semibold text-white" type="submit">
              Berlangganan
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#222222]/8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#222222]/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-[#222222]">Distributor Kosmetik</p>
          <p>© 2026 Distributor Kosmetik. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
