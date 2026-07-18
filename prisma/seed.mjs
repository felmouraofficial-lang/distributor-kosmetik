import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const LOCAL_IMAGE = "/logo.png.png"

const brands = [
  ["Wardah", "wardah", "Brand kosmetik halal Indonesia dengan rangkaian skincare dan makeup yang kuat untuk pasar mass premium."],
  ["Emina", "emina", "Brand beauty playful untuk daily makeup, remaja, dan pembeli kosmetik pertama."],
  ["Somethinc", "somethinc", "Brand lokal modern dengan fokus active skincare, serum, dan complexion."],
  ["Avoskin", "avoskin", "Skincare lokal dengan positioning premium dan ingredient-focused."],
  ["Scarlett", "scarlett", "Brand bodycare dan skincare populer untuk reseller Indonesia."],
  ["Azarine", "azarine", "Brand skincare tropis yang populer untuk sunscreen dan soothing care."],
  ["Skintific", "skintific", "Brand skincare dengan fokus barrier care, moisturizer, dan treatment."],
  ["Glad2Glow", "glad2glow", "Brand skincare terjangkau dengan produk brightening dan acne care."],
  ["Implora", "implora", "Brand makeup lokal dengan harga accessible dan variasi lip product kuat."],
  ["The Originote", "the-originote", "Brand skincare terjangkau dengan permintaan tinggi untuk moisturizer dan serum."],
].map(([name, slug, description]) => ({ name, slug, description, logoUrl: LOCAL_IMAGE, isOfficial: true }))

const categories = [
  ["Skincare", "skincare", "Serum, toner, moisturizer, dan treatment wajah."],
  ["Makeup", "makeup", "Complexion, lip product, eye makeup, dan tools."],
  ["Bodycare", "bodycare", "Body lotion, body wash, scrub, dan perawatan tubuh."],
  ["Haircare", "haircare", "Shampoo, tonic, mask, dan treatment rambut."],
  ["Sunscreen", "sunscreen", "Perlindungan UV untuk kebutuhan harian reseller."],
  ["Fragrance", "fragrance", "Parfum, body mist, dan fragrance harian."],
  ["Mom & Baby", "mom-baby", "Produk perawatan ibu dan bayi yang lembut untuk pemakaian harian."],
  ["Beauty Tools", "beauty-tools", "Tools makeup, brush, sponge, dan aksesoris kecantikan."],
].map(([name, slug, description]) => ({ name, slug, description }))

const banners = [
  ["Hero Banner", "hero-banner", "Belanja stok kosmetik original untuk toko dan reseller.", "Promo Distributor Kosmetik", "Pilih brand resmi, produk fast moving, dan paket grosir untuk bisnis beauty kamu.", "/products", "Belanja Produk", 1],
  ["Flash Sale Banner", "flash-sale-banner", "Flash sale produk repeat order minggu ini", "Flash Sale", "Stok sunscreen, lip cream, dan serum dengan harga reseller lebih hemat.", "/products?sort=featured", "Lihat Flash Sale", 2],
  ["Brand Campaign", "brand-campaign", "Official brand pilihan untuk toko kosmetik", "Brand Campaign", "Bangun katalog toko dengan brand lokal populer dan mudah dijual ulang.", "/brands", "Lihat Brand", 3],
  ["Promo Mingguan", "promo-mingguan", "Promo mingguan khusus pembelian grosir", "Promo Mingguan", "Paket bundling untuk reseller aktif dengan margin lebih sehat.", "/products", "Ambil Promo", 4],
  ["New Arrival", "new-arrival", "Produk terbaru siap masuk katalog toko", "New Arrival", "Update stok produk baru dari brand pilihan agar toko selalu segar.", "/products?sort=newest", "Cek Produk Baru", 5],
  ["Official Brand", "official-brand", "Belanja dari official brand dan supplier terpercaya", "Official Brand", "Semua data brand siap dikelola dari dashboard admin tanpa ubah kode.", "/brands", "Jelajahi Brand", 6],
].map(([, slug, title, subtitle, description, ctaHref, ctaLabel, sortOrder]) => ({
  placement: "homepage",
  slug,
  title,
  subtitle,
  description,
  ctaHref,
  ctaLabel,
  sortOrder,
  imageUrl: LOCAL_IMAGE,
  isActive: true,
}))

const articles = [
  ["Cara memilih produk fast moving untuk toko kosmetik", "cara-memilih-produk-fast-moving-toko-kosmetik", "Prioritaskan produk repeat order tinggi, stok stabil, dan margin sehat.", "Produk fast moving membantu reseller menjaga arus kas. Mulai dari sunscreen, cleanser, lip product, dan serum basic care.", "Panduan Reseller", "2026-07-01"],
  ["Checklist supplier kosmetik original untuk reseller", "checklist-supplier-kosmetik-original-reseller", "Cek legalitas, konsistensi stok, informasi produk, dan dukungan katalog.", "Supplier yang baik membantu reseller menjual dengan percaya diri melalui produk original dan komunikasi jelas.", "Supplier Original", "2026-07-03"],
  ["Strategi promo bundling agar stok cepat berputar", "strategi-promo-bundling-stok-kosmetik", "Gabungkan produk utama dan pelengkap agar nilai keranjang naik.", "Bundling yang efektif menggabungkan produk hero dengan pelengkap seperti cleanser, toner, dan moisturizer.", "Strategi Promo", "2026-07-05"],
  ["Kategori skincare yang paling dicari pelanggan Indonesia", "kategori-skincare-paling-dicari", "Sunscreen, serum, dan moisturizer masih menjadi kategori utama untuk repeat order.", "Pemilik toko dapat memulai stok dari basic skincare sebelum memperluas ke treatment khusus.", "Insight Produk", "2026-07-07"],
  ["Cara menyusun katalog kosmetik untuk toko online", "cara-menyusun-katalog-kosmetik", "Katalog yang rapi membantu pelanggan memilih produk lebih cepat.", "Pisahkan produk berdasarkan concern, brand, dan rentang harga agar pengalaman belanja lebih nyaman.", "Katalog Toko", "2026-07-09"],
  ["Tips menjaga stok sunscreen tetap aman", "tips-menjaga-stok-sunscreen", "Sunscreen punya permintaan harian sehingga stok perlu dipantau rutin.", "Gunakan data penjualan mingguan untuk menentukan minimum stok dan jadwal restock.", "Inventory", "2026-07-11"],
  ["Mengapa official brand penting untuk reseller", "mengapa-official-brand-penting", "Brand resmi meningkatkan trust dan mengurangi komplain produk.", "Kepercayaan pelanggan tumbuh saat toko konsisten menjual produk original dan informasinya jelas.", "Brand", "2026-07-13"],
  ["Panduan harga grosir untuk reseller kosmetik", "panduan-harga-grosir-reseller-kosmetik", "Harga grosir perlu tetap sehat untuk seller dan menarik untuk pelanggan akhir.", "Atur margin berdasarkan kategori, kecepatan perputaran stok, dan biaya operasional toko.", "Harga Grosir", "2026-07-15"],
].map(([title, slug, excerpt, content, category, publishedAt]) => ({
  title,
  slug,
  excerpt,
  content,
  category,
  author: "Distributor Kosmetik Team",
  imageUrl: LOCAL_IMAGE,
  isPublished: true,
  publishedAt: new Date(`${publishedAt}T09:00:00.000Z`),
}))

const productLines = [
  ["Wardah", "wardah", "Sunscreen", "sunscreen", "UV Shield Essential Sunscreen Gel SPF 35"],
  ["Wardah", "wardah", "Makeup", "makeup", "Colorfit Velvet Matte Lip Mousse"],
  ["Wardah", "wardah", "Skincare", "skincare", "Lightening Face Toner"],
  ["Wardah", "wardah", "Bodycare", "bodycare", "Perfect Bright Body Lotion"],
  ["Emina", "emina", "Makeup", "makeup", "Creamatte Lip Cream Nude Series"],
  ["Emina", "emina", "Skincare", "skincare", "Bright Stuff Face Wash"],
  ["Emina", "emina", "Sunscreen", "sunscreen", "Sun Battle SPF 45"],
  ["Emina", "emina", "Beauty Tools", "beauty-tools", "Makeup Sponge Soft Blend"],
  ["Somethinc", "somethinc", "Serum", "skincare", "Niacinamide Barrier Serum 20ml"],
  ["Somethinc", "somethinc", "Skincare", "skincare", "Ceramic Skin Saviour Moisturizer"],
  ["Somethinc", "somethinc", "Makeup", "makeup", "Copy Paste Breathable Cushion"],
  ["Somethinc", "somethinc", "Haircare", "haircare", "Scalp Care Hair Serum"],
  ["Avoskin", "avoskin", "Skincare", "skincare", "Your Skin Bae Toner 100ml"],
  ["Avoskin", "avoskin", "Serum", "skincare", "Miraculous Refining Serum"],
  ["Avoskin", "avoskin", "Sunscreen", "sunscreen", "The Great Shield SPF 50"],
  ["Avoskin", "avoskin", "Bodycare", "bodycare", "Natural Sublime Body Lotion"],
  ["Scarlett", "scarlett", "Bodycare", "bodycare", "Brightening Body Lotion Freshy"],
  ["Scarlett", "scarlett", "Fragrance", "fragrance", "Dreamy Eau De Parfum"],
  ["Scarlett", "scarlett", "Haircare", "haircare", "Yordanian Sea Salt Shampoo"],
  ["Scarlett", "scarlett", "Skincare", "skincare", "Acne Serum Treatment"],
  ["Azarine", "azarine", "Sunscreen", "sunscreen", "Hydrasoothe Sunscreen Gel SPF45"],
  ["Azarine", "azarine", "Skincare", "skincare", "C White Lightening Serum"],
  ["Azarine", "azarine", "Bodycare", "bodycare", "Tone Up Body Serum"],
  ["Azarine", "azarine", "Mom & Baby", "mom-baby", "Baby Gentle Moisturizing Lotion"],
  ["Skintific", "skintific", "Skincare", "skincare", "5X Ceramide Barrier Moisturizer"],
  ["Skintific", "skintific", "Makeup", "makeup", "Cover All Perfect Cushion"],
  ["Skintific", "skintific", "Sunscreen", "sunscreen", "All Day Light Sunscreen Mist"],
  ["Skintific", "skintific", "Serum", "skincare", "Mugwort Acne Clay Serum"],
  ["Glad2Glow", "glad2glow", "Skincare", "skincare", "Blueberry Ceramide Moisturizer"],
  ["Glad2Glow", "glad2glow", "Serum", "skincare", "Pomegranate Niacinamide Serum"],
  ["Glad2Glow", "glad2glow", "Sunscreen", "sunscreen", "Lightweight Sunscreen SPF 50"],
  ["Glad2Glow", "glad2glow", "Beauty Tools", "beauty-tools", "Skincare Headband Soft Terry"],
  ["Implora", "implora", "Makeup", "makeup", "Cheek and Lip Tint"],
  ["Implora", "implora", "Fragrance", "fragrance", "Urban Perfume Series"],
  ["Implora", "implora", "Beauty Tools", "beauty-tools", "Precision Brow Pencil"],
  ["Implora", "implora", "Makeup", "makeup", "Seamless Liquid Foundation"],
  ["The Originote", "the-originote", "Skincare", "skincare", "Hyalucera Moisturizer Gel"],
  ["The Originote", "the-originote", "Serum", "skincare", "Retinol B3 Serum"],
  ["The Originote", "the-originote", "Cleanser", "skincare", "Micellar Cleansing Water"],
  ["The Originote", "the-originote", "Mom & Baby", "mom-baby", "Gentle Baby Skin Balm"],
]

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function makeProduct([brandName, brandSlug, displayCategory, categorySlug, productName], index) {
  const price = 24000 + (index % 10) * 8500 + Math.floor(index / 10) * 5000
  const compareAtPrice = price + 9000 + (index % 4) * 3500
  const rating = Number((4.4 + (index % 6) * 0.1).toFixed(1))
  const reviewCount = 6 + index * 2
  const isBestSeller = index % 4 === 0 || index % 7 === 0
  const isFlashSale = index % 5 === 0 || index % 6 === 0
  const isNewArrival = index % 3 === 0

  return {
    name: `${brandName} ${productName}`,
    slug: slugify(`${brandName}-${productName}`),
    sku: `DK-${brandSlug.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
    brandSlug,
    categorySlug,
    shortDescription: `${displayCategory} original dari ${brandName} untuk stok reseller dan toko kosmetik.` ,
    description: `${brandName} ${productName} adalah produk ${displayCategory.toLowerCase()} yang cocok untuk katalog reseller kosmetik Indonesia. Produk ini disiapkan sebagai data awal agar homepage dan halaman produk langsung terlihat penuh setelah seed dijalankan.`,
    ingredients: "Aqua, Glycerin, Niacinamide, Butylene Glycol, Panthenol, Sodium Hyaluronate, Tocopherol, Fragrance.",
    howToUse: "Gunakan pada area yang dibutuhkan setelah membersihkan kulit. Ikuti petunjuk pada kemasan dan hentikan pemakaian jika terjadi iritasi.",
    bpomNumber: `NA1826${String(100000 + index).padStart(6, "0")}`,
    thumbnail: LOCAL_IMAGE,
    weight: 50 + (index % 6) * 25,
    rating,
    reviewCount,
    price,
    compareAtPrice,
    stock: 40 + (index % 12) * 15,
    minOrder: index % 4 === 0 ? 6 : 3,
    isPublished: true,
    isFeatured: isBestSeller,
    isBestSeller,
    isFlashSale,
    isNewArrival,
  }
}

const products = productLines.map(makeProduct)

const reviewTemplates = [
  ["Nadia Beauty Store", 5, "Produk cepat laku dan cocok untuk repeat order pelanggan toko."],
  ["Ayu Cosmetics", 5, "Harga grosirnya masuk, stok aman untuk live selling."],
  ["Rara Beauty House", 4, "Packing rapi dan varian produknya mudah dijual."],
  ["Dewi Skincare Shop", 5, "Produk original dan cocok untuk bundling reseller."],
  ["Laras Online Store", 4, "Pelanggan suka karena brand sudah dikenal."],
  ["Mira Kosmetik", 5, "Margin sehat untuk toko offline dan online."],
  ["Salsa Beauty", 4, "Stoknya membantu katalog toko terlihat lengkap."],
  ["Putri Reseller", 5, "Produk sesuai deskripsi dan mudah dipromosikan."],
  ["Intan Glow Shop", 5, "Repeat order bagus, terutama untuk produk harian."],
  ["Vina Cosmetic", 4, "Kualitas produk bagus untuk harga reseller."],
]

async function main() {
  const brandMap = new Map()
  const categoryMap = new Map()

  await prisma.$transaction(async (tx) => {
    for (const brand of brands) {
      const saved = await tx.brand.upsert({ where: { slug: brand.slug }, update: brand, create: brand })
      brandMap.set(brand.slug, saved)
    }

    for (const category of categories) {
      const saved = await tx.category.upsert({ where: { slug: category.slug }, update: category, create: category })
      categoryMap.set(category.slug, saved)
    }

    for (const banner of banners) {
      await tx.banner.upsert({ where: { slug: banner.slug }, update: banner, create: banner })
    }

    for (const article of articles) {
      await tx.article.upsert({ where: { slug: article.slug }, update: article, create: article })
    }

    for (const product of products) {
      const brand = brandMap.get(product.brandSlug)
      const category = categoryMap.get(product.categorySlug)
      const productData = { ...product }
      delete productData.brandSlug
      delete productData.categorySlug

      const savedProduct = await tx.product.upsert({
        where: { slug: product.slug },
        update: { ...productData, brandId: brand.id, categoryId: category.id },
        create: { ...productData, brandId: brand.id, categoryId: category.id },
      })

      for (let sortOrder = 0; sortOrder < 2; sortOrder += 1) {
        await tx.productImage.upsert({
          where: { productId_sortOrder: { productId: savedProduct.id, sortOrder } },
          update: { url: LOCAL_IMAGE, alt: `${product.name} ${sortOrder === 0 ? "thumbnail" : "gallery"}`, sortOrder },
          create: { productId: savedProduct.id, url: LOCAL_IMAGE, alt: `${product.name} ${sortOrder === 0 ? "thumbnail" : "gallery"}`, sortOrder },
        })
      }
    }

    const reviewProducts = products.slice(0, 30)
    for (let index = 0; index < reviewProducts.length; index += 1) {
      const product = await tx.product.findUnique({ where: { slug: reviewProducts[index].slug } })
      const [name, rating, comment] = reviewTemplates[index % reviewTemplates.length]
      const existingReview = await tx.review.findFirst({ where: { productId: product.id, name } })

      if (existingReview) {
        await tx.review.update({ where: { id: existingReview.id }, data: { rating, comment, createdAt: new Date(`2026-07-${String((index % 20) + 1).padStart(2, "0")}T10:00:00.000Z`) } })
      } else {
        await tx.review.create({ data: { productId: product.id, name, rating, comment, createdAt: new Date(`2026-07-${String((index % 20) + 1).padStart(2, "0")}T10:00:00.000Z`) } })
      }
    }
  })

  console.log("Seed completed: 10 brands, 8 categories, 40 products, 80 product images, 6 banners, 8 articles, 30 reviews.")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



