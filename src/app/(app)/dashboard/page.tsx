'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MessageCart from "@/components/ui/MessageCart"
import { Switch } from "@/components/ui/switch"
import { Message, User } from "@/model/User"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@radix-ui/react-separator"
import axios, { Axios, AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId as any))
  }

  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: session?.user?.isAcceptingMessages || false
    }
  })

  const { register, watch, setValue } = form

  const acceptMessages = watch("acceptMessages")

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      setValue('acceptMessages', response.data.isAcceptingMessages as boolean)
    } catch (error) {
      console.error('Error fetching accept messages:', error);
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Failed to fetch accept messages status')
    }finally{
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh : boolean = false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
   const response = await axios.get<ApiResponse>('/api/get-messages')
    setMessages(response.data.messages as Message[])
      
      if(response.data.messages?.length === 0){
        toast.info('No messages found')
      }
    } catch (error) {
      console.error('Error fetching accept messages:', error);
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Failed to fetch accept messages status')
    }finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }
  },[setIsLoading , setMessages])

  useEffect(()=>{
    if(!session || !session.user){
      return
    }
    fetchMessages()
    fetchAcceptMessage()
  }, [fetchAcceptMessage , fetchMessages , session , setValue])
  

  //handle switch change
  const handleSwithChange  = async ()=>{
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages : !acceptMessages
      })
      if(response.data.success){
        setValue('acceptMessages' , !acceptMessages as boolean)
        toast.success(response.data.message || 'Successfully updated accept messages status')
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Failed to update accept messages status')
    }
  }

  if(!session || !session.user){
    return <div>Please sign in to view your dashboard</div>
  }

  const {username} = session?.user 
  //todo do more research about base url in nextjs
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = async ()=>{
    try {
       await navigator.clipboard.writeText(profileUrl)
    toast.success('Profile URL copied to clipboard')
    } catch (error) {
      console.log('Failed to copy to clipboard');
    }
   
  }


  return (
     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl">
      <h1 className="text-3xl font-bold mb-4">User Dashboard </h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy your unique profile URL</h2> {" "}
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            disabled
            value={profileUrl}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <Button
            onClick={copyToClipboard}
            
          >
            Copy
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Switch checked={acceptMessages} onCheckedChange={handleSwithChange} disabled={isSwitchLoading} />
        <span className="ml-2">{acceptMessages ? 'Accepting Messages' : 'Not Accepting Messages'}</span>
      </div>
      <Separator/>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
        {messages.length > 0 ? (
          messages.map((message)=> <MessageCart key={message._id as any} message={message} onMessageDelete={handleDeleteMessage}/>
          )
        ) : (<p>No messages found</p>)}
      </div>
    </div>
  )
}
export default page