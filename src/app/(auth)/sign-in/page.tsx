'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"

const LoginPage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // zod implementation here
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      setIsSubmitting(true)
      const result = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      })
      console.log(result);
      if (result?.error) {
        toast.error(result.error)
        return
      }

      if(result?.url){
        router.replace('/dashboard')
      }
      toast.success('Signed in successfully')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Error signing in')
    } finally {
      setIsSubmitting(false)
    }

  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Join Secure Whisper
          </h1>
          <p className="mb-4">Sign up to start your anonymous journey</p>
        </div>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your email or username" {...field}

                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {
                isSubmitting ? (
                  <>
                    <Spinner />
                    Please wait
                  </>
                ) : ('Sign In')
              }
            </Button>

          </form>
        </Form>
        <div className="text-center mt-4">
          <p>Don't have an account?{' '} <Link href={'/sign-up'} className="text-blue-800 hover:underline ">sign up</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage