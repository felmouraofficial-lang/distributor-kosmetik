import { redirect } from "next/navigation"
import { isAdminAuthenticated, loginAdmin } from "../auth"

async function loginAction(formData: FormData) {
  "use server"
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  if (await loginAdmin(email, password)) redirect("/admin")
  redirect("/admin/login?error=1")
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) redirect("/admin")
  const params = await searchParams

  return (
    <main className="min-h-screen bg-[#f7f7f8] px-4 py-12 text-[#202124]">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <form action={loginAction} className="w-full rounded-lg border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-[#FF4F9A]">Admin Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold">Login Admin</h1>
          <p className="mt-2 text-sm text-black/55">Masuk untuk mengelola produk, brand, kategori, banner, dan artikel.</p>
          {params.error ? <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">Email atau password admin salah.</p> : null}
          <label className="mt-6 block text-sm font-semibold">Email</label>
          <input name="email" type="email" required className="mt-2 h-11 w-full rounded-lg border border-black/10 px-3 outline-none focus:border-[#FF4F9A]" defaultValue="admin@distributorkosmetik.local" />
          <label className="mt-4 block text-sm font-semibold">Password</label>
          <input name="password" type="password" required className="mt-2 h-11 w-full rounded-lg border border-black/10 px-3 outline-none focus:border-[#FF4F9A]" />
          <button className="mt-6 h-11 w-full rounded-full bg-[#FF4F9A] text-sm font-semibold text-white hover:bg-[#e94288]">Login</button>
        </form>
      </div>
    </main>
  )
}
