'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail, ShieldCheck } from 'lucide-react'

import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema'
import { ApiResponse } from '@/types/ApiResponse'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>(
        '/api/reset-link',
        { email: data.email }
      )

      toast.success(response.data.message || 'Verification email sent')
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(
        axiosError.response?.data.message || 'Something went wrong'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Forgot your password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we’ll send you a verification code.
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Password recovery
            </CardTitle>
            <CardDescription>
              Your privacy is protected. We never expose account activity.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Send reset link
                    </>
                  )}
                </Button>

                <div className="text-sm text-center">
                  <Link
                    href="/sign-in"
                    className="font-medium text-blue-700 hover:underline"
                  >
                    Back to sign in
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          🔒 Secure Whisper never stores sender identity.
          Your privacy always comes first.
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
