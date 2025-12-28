"use client"

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

const Navbar = () => {
  const { status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const isLandingPage = pathname === "/"
  const isDashboardPage = pathname === "/dashboard"

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/secureWhisperLogo-Photoroom.png"
            alt="Secure Whisper Logo"
            width={140}
            height={36}
            priority
          />

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-gray-900">
              Secure Whisper
            </span>
            <span className="text-xs text-muted-foreground">
              Anonymous messaging
            </span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Privacy hint */}
          {isLandingPage && (
            <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              No identities. No tracking.
            </div>
          )}

          {/* LANDING PAGE */}
          {isLandingPage && status !== "authenticated" && (
            <>
              <Link href="/sign-in">
                <Button className="hover:cursor-pointer" size="sm" variant="ghost">
                  Sign in
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="hover:cursor-pointer" size="sm">
                  Create inbox
                </Button>
              </Link>
            </>
          )}

          {/* AUTHENTICATED (NOT DASHBOARD) */}
          {status === "authenticated" &&!isDashboardPage && (
            <>
              <Button
              className="hover:cursor-pointer"
                size="sm"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Dashboard
              </Button>

              <Button
              className="hover:cursor-pointer"
                size="sm"
                variant="outline"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </>
          )}

          {/* AUTHENTICATED (DASHBOARD PAGE) */}
          {status === "authenticated" && isDashboardPage && (
            <Button
            className="hover:cursor-pointer"
              size="sm"
              variant="outline"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
