'use client'

import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { useState } from 'react'
import { KeyRound, MailCheck, ArrowLeft } from 'lucide-react'

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
import Link from 'next/link'

const VerifyAccount = () => {
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: '' },
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setLoading(true)

      const response = await axios.post('/api/verify-code', {
        username: params.username,
        code: data.code,
      })

      if (!response.data.success) {
        toast.error(response.data.message)
        return
      }

      toast.success('Your inbox is now active')
      router.replace('/sign-in')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(
        axiosError.response?.data.message || 'Verification failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-12">

        {/* Intro */}
        <div className="space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200">
            <KeyRound className="h-6 w-6 text-gray-500" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Unlock your inbox
          </h1>

          <p className="text-muted-foreground max-w-sm">
            We sent a 6-digit code to your email.
            Enter it below to activate your private space.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      placeholder="••••••"
                      maxLength={6}
                      className="h-12 text-center text-xl tracking-[0.4em]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner />
                  Verifying…
                </>
              ) : (
                <>
                  <MailCheck className="h-4 w-4 mr-2" />
                  Activate inbox
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="space-y-4 text-sm text-muted-foreground">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-1 underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>

          <p className="text-xs">
            🔒 Verification ensures only you can access your anonymous inbox.
            We never reveal sender identities.
          </p>
        </div>
      </div>
    </main>
  )
}

export default VerifyAccount
