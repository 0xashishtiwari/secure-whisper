'use client'

import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './button'

const Navbar = () => {
  const { status } = useSession()

  return (
    <nav className="py-2 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/secureWhisperLogo-Photoroom.png"
            alt="Secure Whisper Logo"
            width={120}     // ⬅️ reduced
            height={36}     // ⬅️ reduced
            priority
          />
          <span className="text-base font-semibold">
            Secure Whisper
          </span>
        </Link>

        {/* Auth Actions */}
        {status === 'authenticated' ? (
          <Button className='hover:cursor-pointer' size="sm" variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        ) : (
          <Link href="/sign-in">
            <Button className='hover:cursor-pointer' size="sm">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
