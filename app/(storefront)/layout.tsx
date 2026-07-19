import { Navbar } from "@/components/ui/Navbar"
import { BottomNavigation } from "./BottomNavigation"

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <BottomNavigation />
    </>
  )
}
