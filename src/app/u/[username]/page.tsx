'use client'

import { useParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback, useState } from 'react'
import {
  Sparkles,
  RefreshCcw,
  SendHorizontal,
  Lock,
} from 'lucide-react'

import { messageSchema } from '@/schemas/messageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'

const MAX_LENGTH = 300

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* AI suggestions */
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSuggesting, setIsSuggesting] = useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: '' },
  })

  const content = form.watch('content')

  const fetchSuggestions = async () => {
    try {
      setIsSuggesting(true)
      const res = await axios.get('/api/suggest-messages')
      setSuggestions(res.data.data.suggestions)
    } catch {
      toast.error('Could not generate suggestions')
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
          toast.success('Message sent quietly')
          form.reset()
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast.error(
          axiosError.response?.data.message || 'Failed to send message'
        )
      } finally {
        setIsSubmitting(false)
      }
    },
    [username, form]
  )

  return (
    <main className="min-h-screen px-4">
      {/* Centering wrapper (safe for Oneko) */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-2xl space-y-16">

          {/* Intro */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400">
              <Lock className="h-6 w-6 text-gray-500" />
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Leave a note for @{username}
            </h1>

            <p className="text-muted-foreground max-w-md">
              Your message will be sent anonymously and securely.
            </p>
          </div>

          {/* Message form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10"
            >
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Your anonymous message..."
                        rows={6}
                        maxLength={MAX_LENGTH}
                        className="resize-none text-base leading-relaxed border-gray-200 focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>

                    <div className="flex justify-end text-xs text-muted-foreground">
                      {content?.length || 0}/{MAX_LENGTH}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="h-11 flex-1"
                  disabled={isSubmitting || !content?.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner />
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendHorizontal className="h-4 w-4 mr-2" />
                      Send anonymously
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 gap-2"
                  onClick={fetchSuggestions}
                  disabled={isSuggesting}
                >
                  {isSuggesting ? (
                    <>
                      <Spinner />
                      Thinking…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Inspire me
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You can start with one of these:
              </p>

              <div className="flex flex-col gap-2">
                {suggestions.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => form.setValue('content', msg)}
                    className="rounded-md border px-4 py-2 text-left text-sm hover:bg-gray-50 transition"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}

export default ProfilePage
