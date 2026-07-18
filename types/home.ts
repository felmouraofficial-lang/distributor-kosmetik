export type NavItem = {
  label: string
  href: string
}

export type Category = {
  name: string
  description: string
}

export type BrandPartner = {
  name: string
}

export type Product = {
  name: string
  category: string
  price: string
  tag: string
}

export type Article = {
  title: string
  excerpt: string
}

export type HomeContent = {
  navItems: NavItem[]
  categories: Category[]
  brands: BrandPartner[]
  bestSellers: Product[]
  newestProducts: Product[]
  articles: Article[]
}
