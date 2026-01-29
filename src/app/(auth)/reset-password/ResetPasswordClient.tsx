'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/schemas/changePasswordSchema'
import { useRouter, useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { ApiResponse } from '@/types/ApiResponse'

const ResetPassword = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) {
    return (
      <main className="min-h-screen  flex items-center justify-center px-4">
        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-2xl font-semibold">
            This link has expired
          </h1>
          <p className="text-muted-foreground">
            For your security, password reset links expire.
            You can request a new one below.
          </p>

          <Link href="/forgot-password" className="underline text-sm">
            Request a new reset link
          </Link>
        </div>
      </main>
    )
  }

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
      setIsSubmitting(true)

      const response = await axios.post('/api/reset-password', {
        token,
        email,
        password: data.password,
      })

      if (response.data.success) {
        toast.success('Your password has been updated')
        router.replace('/sign-in')
      }
    } catch (error) {
      const err = error as AxiosError<ApiResponse>
      toast.error(
        err.response?.data?.message || 'Failed to reset password'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen  flex items-center justify-center px-4 flex-col">
      <div className="w-full max-w-md space-y-12">

        {/* Intro */}
        <div className="space-y-4 flex justify-center flex-col items-center">
          <h1 className="text-3xl font-semibold tracking-tight">
           Create a new password
          </h1>
          <p className="text-muted-foreground max-w-xl text-center">
            Your new password must be different from previous passwords.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >

            {/* New password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New password"
                        className="pl-10 pr-10 h-11"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm password */}
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        className="pl-10 h-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Updating…
                </>
              ) : (
                'Update password'
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="space-y-4 text-sm text-muted-foreground flex items-center flex-col">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1 text-sky-600 decoration-sky-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 text-sky-600" />
            Back to sign in
          </Link>

          <p className="text-xs text-center w-fit text-gray-600 tracking-wider">
            Secure Whisper • No tracking • No ads. Ever.
          </p>
        </div>
      </div>
    </main>
  )
}

export default ResetPassword
