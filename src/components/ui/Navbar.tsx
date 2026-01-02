'use client'

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  Bell
} from "lucide-react"

const Navbar = () => {
  const { status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const isLandingPage = pathname === "/"
  const isDashboardPage = pathname.startsWith("/dashboard")

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo only */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/secureWhisperLogo-Photoroom.png"
            alt="Secure Whisper"
            width={130}
            height={36}
            priority
          />
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Privacy trust pill (landing only) */}
          {isLandingPage && (
            <div className="hidden md:flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-700">
              <ShieldCheck className="h-4 w-4" />
              100% Anonymous
            </div>
          )}

          {/* Landing page – unauthenticated */}
          {isLandingPage && status !== "authenticated" && (
            <>
              <Link href="/sign-in">
                <Button size="sm" variant="ghost">
                  Sign in
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="shadow-sm hover:scale-[1.03] transition"
                >
                  Create inbox
                </Button>
              </Link>
            </>
          )}

          {/* Authenticated – NOT dashboard */}
          {status === "authenticated" && !isDashboardPage && (
            <>
              {/* Placeholder for future notifications */}
             

              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => signOut()}
                className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </>
          )}

          {/* Authenticated – dashboard */}
          {status === "authenticated" && isDashboardPage && (
            <>
              

              <Button
                size="sm"
                variant="ghost"
                onClick={() => signOut()}
                className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
