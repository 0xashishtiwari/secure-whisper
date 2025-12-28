"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageCard from "@/components/ui/MessageCart";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Footer from "@/components/ui/Footer";
import { ShieldCheck, Copy, Inbox } from "lucide-react";

const Page = () => {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    try {
      setIsSwitchLoading(true);
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to fetch accept messages status"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages((response.data.messages as Message[]) || []);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message || "Failed to fetch messages"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchMessages, fetchAcceptMessage]);

  const handleSwitchChange = async () => {
    try {
      setIsSwitchLoading(true);
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      if (response.data.success) {
        setValue("acceptMessages", !acceptMessages);
        toast.success(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to update accept messages status"
      );
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((m) => m._id.toString() !== messageId));
  };

  if (!session?.user) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Please sign in to view your Secure Whisper dashboard.
      </div>
    );
  }

  const { username } = session.user;
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard");
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Content */}
      <div className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 space-y-10">

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Secure Whisper Inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            Receive honest, anonymous messages — your identity is always protected.
          </p>
        </div>

        {/* Profile link */}
        <div className="rounded-lg border bg-white p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Share this link to receive anonymous messages
          </div>

          <div className="flex gap-2">
            <Input value={profileUrl} disabled />
            <Button onClick={copyToClipboard} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>

        {/* Accept messages */}
        <div className="flex items-center justify-between rounded-lg border bg-white p-6">
          <div>
            <h3 className="font-medium">Accept new messages</h3>
            <p className="text-sm text-muted-foreground">
              Turn this off if you don’t want to receive messages right now.
            </p>
          </div>

          <Switch
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
        </div>

        <Separator />

        {/* Messages */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-semibold">Messages</h2>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">Loading messages...</p>
          ) : messages.length > 0 ? (
            <div className="grid gap-4">
              {messages.map((message) => (
                <MessageCard
                  key={message._id.toString()}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No messages yet. Share your profile link to start receiving anonymous messages.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Page;
