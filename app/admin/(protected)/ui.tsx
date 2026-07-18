export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-semibold text-[#202124]">{title}</h1>
        <p className="mt-1 text-sm text-black/55">{description}</p>
      </div>
    </div>
  )
}

export function AdminCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">{children}</div>
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-black/70">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  )
}

export const inputClass = "h-10 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#FF4F9A]"
export const textareaClass = "min-h-24 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-[#FF4F9A]"
export const buttonClass = "rounded-full bg-[#FF4F9A] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e94288]"
export const dangerClass = "rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"

export function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-black/65">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 accent-[#FF4F9A]" />
      {label}
    </label>
  )
}
