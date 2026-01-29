'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import {
  Eye,
  EyeOff,
  LogIn,
  Lock,
  User
} from "lucide-react"

import { signInSchema } from "@/schemas/signInSchema"
import { ApiResponse } from "@/types/ApiResponse"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitting(true)

      const result = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(result.error)
        return
      }

      toast.success("Welcome back")
      router.replace("/dashboard")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(
        axiosError.response?.data.message || "Error signing in"
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
          <h1 className="text-3xl font-semibold tracking-tight text-center">
            Welcome to secure whisper
          </h1>
          <p className="text-muted-foreground max-w-sm text-center">
            Sign in to access your anonymous inbox.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >

            {/* Identifier */}
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Email or username"
                        className="pl-10 h-11"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-10 pr-10 h-11"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        aria-label="Toggle password visibility"
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

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11  cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Enter my inbox
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="space-y-4 text-sm text-muted-foreground flex flex-col items-center">
          <Link
            href="/forgot-password"
            className="text-sky-600 hover:underline"
          >
            forgot password?
          </Link>

          <p className="text-center">
            Create a secure whisper account?{" "}
            <Link href="/sign-up" className="text-sky-600 hover:underline">
              sign up
            </Link>
          </p>

         
        </div>
      </div>
    </main>
  )
}

export default LoginPage
