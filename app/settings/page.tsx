import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SignOutButton } from "@/components/auth/signout-button"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const userName = session.user.name ?? "there"
  const userInitials = userName !== "there"
    ? userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "US"
  const userImage = session.user.image

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 h-16 flex items-center px-6 justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="ShopyVibe" width={36} height={36} className="rounded-xl" />
          <span className="font-semibold text-xl text-slate-800 tracking-tight">ShopyVibe</span>
        </div>

        {/* Central Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-500">
          <Link href="/vibes" className="hover:text-slate-900 py-5 transition-colors">
            My Vibes
          </Link>
          <Link href="/templates" className="hover:text-slate-900 py-5 transition-colors">
            Templates
          </Link>
          <Link href="/dashboard" className="hover:text-slate-900 py-5 transition-colors">
            Dashboard
          </Link>
          <Link href="/settings" className="text-slate-900 font-bold border-b-2 border-slate-900 py-5 -mb-[2px] transition-colors">
            Settings
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 hidden sm:block">{session.user.email}</span>
          <SignOutButton />
          {userImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userImage} alt={userName} className="w-9 h-9 rounded-full border-2 border-indigo-200" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              {userInitials}
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Account Settings</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center gap-6">
             {userImage ? (
               // eslint-disable-next-line @next/next/no-img-element
               <img src={userImage} alt={userName} className="w-20 h-20 rounded-full border-4 border-indigo-50" />
             ) : (
               <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-3xl">
                 {userInitials}
               </div>
             )}
             <div>
               <h2 className="text-xl font-bold text-slate-800">{userName}</h2>
               <p className="text-slate-500">{session.user.email}</p>
             </div>
          </div>
          
          <div className="p-8">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Billing & Plan</h3>
             <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                   <p className="font-bold text-indigo-900">Free Plan</p>
                   <p className="text-sm text-indigo-700 mt-1">Upgrade to Pro to remove ShopyVibe branding and unlock custom domains.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors w-full sm:w-auto">
                   Upgrade to Pro
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
