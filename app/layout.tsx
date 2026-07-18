import type { Metadata } from "next"
import { Navbar } from "@/components/ui/Navbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Distributor Kosmetik | Supplier Kosmetik Original Indonesia",
  description:
    "Distributor kosmetik original untuk reseller, dropshipper, toko online, dan toko offline di Indonesia.",
  applicationName: "Distributor Kosmetik",
  keywords: [
    "distributor kosmetik",
    "supplier kosmetik",
    "kosmetik original",
    "reseller kosmetik",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-white text-[#222222]">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
