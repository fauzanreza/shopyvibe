"use client"

import { signOut } from "next-auth/react"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex w-full items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
    >
      <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
    </button>
  )
}
