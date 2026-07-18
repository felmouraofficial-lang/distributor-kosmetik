import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

const COOKIE_NAME = "dk_admin_session"

function adminEmail() {
  return process.env.ADMIN_EMAIL ?? "admin@distributorkosmetik.local"
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin12345"
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated"
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login")
}

export async function loginAdmin(email: string, password: string) {
  const validEmail = email.trim().toLowerCase() === adminEmail().trim().toLowerCase()
  const hash = process.env.ADMIN_PASSWORD_HASH
  const validPassword = hash ? await bcrypt.compare(password, hash) : password === adminPassword()

  if (!validEmail || !validPassword) return false

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  })
  return true
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
