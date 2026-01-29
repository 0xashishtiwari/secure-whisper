'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail, ArrowLeft } from 'lucide-react'

import { forgotPasswordSchema } from '@/schemas/forgotPasswordSchema'
import { ApiResponse } from '@/types/ApiResponse'

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

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setIsSubmitting(true)
      const response = await axios.post<ApiResponse>(
        '/api/reset-link',
        { email: data.email }
      )

      toast.success(
        response.data.message ||
        'If this email exists, you’ll receive instructions shortly.'
      )
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
    <main className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-12">

        {/* Intro */}
        <div className="space-y-4 flex justify-center flex-col items-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Find your way back
          </h1>
          <p className="text-muted-foreground max-w-sm tracking-tight text-center color-gray-600">
            Enter the email associated with your account, and we’ll
            send you a link to reset your password.
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
              className="w-full h-11  cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send reset link
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="space-y-4 text-sm text-muted-foreground flex items-center flex-col">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1 text-sky-600 hover:underline"
          >
           
            Back to sign in
          </Link>

          <p className="text-center w-fit text-gray-600 tracking-wider">
             If an account exists for the email provided, you will receive
             a password reset link shortly.
          </p>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword
