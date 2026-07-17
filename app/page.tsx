export default function HomePage() {
  return (
    <main className="min-h-screen bg-pink-50">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-green-100"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm">
                Distributor Resmi
              </span>

              <h1 className="text-6xl font-black mt-6 leading-tight">

                Distributor
                <br />

                <span className="text-pink-600">
                  Kosmetik
                </span>

              </h1>

              <p className="mt-6 text-gray-600 text-lg">

                Supplier kosmetik original, skincare,
                bodycare, makeup dan kebutuhan
                kecantikan dengan harga grosir
                untuk reseller, dropshipper,
                toko offline dan online.

              </p>

              <div className="flex gap-4 mt-8">

                <button className="bg-pink-600 text-white px-8 py-4 rounded-xl font-bold">

                  Belanja Sekarang

                </button>

                <button className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-xl font-bold">

                  Lihat Katalog

                </button>

              </div>

            </div>

            <div>

              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900"
                className="rounded-3xl shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
