'use client'

import { useParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCallback, useState } from 'react'
import {
  ShieldCheck,
  SendHorizonal,
  User,
  Sparkles,
  RefreshCcw
} from 'lucide-react'

import { messageSchema } from '@/schemas/messageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

const MAX_LENGTH = 300

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 🔹 AI suggestions state
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSuggesting, setIsSuggesting] = useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: '' },
  })

  const content = form.watch('content')

  // 🔹 Fetch AI suggestions
 const fetchSuggestions = async () => {
  try {
    setIsSuggesting(true)
    const res = await axios.get('/api/suggest-messages')

    setSuggestions(res.data.data.suggestions)
  } catch {
    toast.error('Failed to generate suggestions')
  } finally {
    setIsSuggesting(false)
  }
}

  const onSubmit = useCallback(
    async (data: z.infer<typeof messageSchema>) => {
      try {
        setIsSubmitting(true)

        const response = await axios.post('/api/send-message', {
          username,
          content: data.content,
        })

        if (response.data.success) {
          toast.success(response.data.message)
          form.reset()
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast.error(
          axiosError.response?.data.message || 'Error sending message'
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [username, form]
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-xl space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="secondary" className="mx-auto px-4 py-1">
            Secure Whisper
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight">
            Send an anonymous message
          </h1>

          <p className="text-sm text-muted-foreground">
            Your identity is never revealed.
          </p>
        </div>

        {/* Recipient */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          Sending to <span className="font-medium text-gray-900">@{username}</span>
        </div>

        {/* 🔹 AI Suggestions */}
        <Card className="bg-muted/40 border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Need inspiration?
            </CardTitle>
            <CardDescription>
              Let AI suggest something thoughtful you can send anonymously.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={fetchSuggestions}
              disabled={isSuggesting}
            >
              {isSuggesting ? (
                <>
                  <Spinner />
                  Generating…
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Generate suggestions
                </>
              )}
            </Button>

            {suggestions.length > 0 && (
              <div className="flex flex-col gap-2">
                {suggestions.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => form.setValue('content', msg)}
                    className="rounded-md border bg-white px-3 py-2 text-left text-sm hover:bg-gray-50 transition"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              Anonymous message
            </CardTitle>
            <CardDescription>
              Be honest, kind, or thoughtful.
            </CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Say something anonymously…"
                          rows={5}
                          maxLength={MAX_LENGTH}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Be respectful.</span>
                        <span>{content?.length || 0}/{MAX_LENGTH}</span>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={isSubmitting || !content?.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendHorizonal className="h-4 w-4" />
                      Send anonymously
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          🔒 Secure Whisper never stores sender identity.
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
