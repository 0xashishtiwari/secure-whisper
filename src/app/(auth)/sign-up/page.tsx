'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import {
  Eye,
  EyeOff,
  UserPlus,
  Lock,
  AtSign,
  User
} from "lucide-react"

import { signUpSchema } from "@/schemas/signUpSchema"
import { ApiResponse } from "@/types/ApiResponse"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const SignUpPage = () => {
  const [username, setUsername] = useState("")
  const [usernameMessage, setUsernameMessage] = useState("")
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const debounced = useDebounceCallback(setUsername, 500)
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  /* Username availability */
  useEffect(() => {
    if (!username) return

    const check = async () => {
      try {
        setIsCheckingUsername(true)
        const res = await axios.get("/api/check-username-unique", {
          params: { username },
        })
        setUsernameMessage(res.data.message)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        setUsernameMessage(
          axiosError.response?.data.message || "Error checking username"
        )
      } finally {
        setIsCheckingUsername(false)
      }
    }

    check()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setIsSubmitting(true)
      const res = await axios.post<ApiResponse>("/api/sign-up", data)
      toast.success(res.data.message)
      router.replace(`/verify/${username}`)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(
        axiosError.response?.data.message || "Sign up failed"
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
          <h1 className="text-3xl font-semibold tracking-tight">
            Create a secure whisper inbox
          </h1>
          <p className="text-muted-foreground max-w-sm text-center">
            This will be your anonymous inbox 
          
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >

            {/* Username */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Choose a username"
                        className="pl-10 h-11"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          debounced(e.target.value)
                        }}
                      />
                    </div>
                  </FormControl>

                  <div className="flex items-center gap-2 text-xs">
                    {isCheckingUsername && <Spinner className="h-3 w-3" />}
                    {usernameMessage && (
                      <span
                        className={
                          usernameMessage.toLowerCase().includes("available")
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {usernameMessage}
                      </span>
                    )}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                     <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className=" pl-10 h-11"
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
                        placeholder="Create a strong password"
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

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11  cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  Creating…
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create my inbox
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="space-y-4 text-sm text-muted-foreground flex flex-col items-center">
          <p className="text-center">
            Already have a place?{" "}
            <Link href="/sign-in" className="text-sky-600 hover:underline">
              sign in
            </Link>
          </p>

          <p className="text-xs text-center">
            
            Your inbox belongs only to you and nobody else.
          </p>
        </div>
      </div>
    </main>
  )
}

export default SignUpPage
