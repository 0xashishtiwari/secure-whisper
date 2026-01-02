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
import {
  ShieldCheck,
  Copy,
  Inbox,
  Link as LinkIcon,
} from "lucide-react";

const Page = () => {
  const { data: session } = useSession();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: { acceptMessages: false },
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

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Please sign in to view your inbox.
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
    toast.success("Profile link copied");
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-14 space-y-14">

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Your inbox
          </h1>
          <p className="text-muted-foreground max-w-xl">
            This is your private space. Messages arrive anonymously and only you
            can read them.
          </p>
        </div>

        {/* Share link */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Share this link to receive messages
          </div>

          <div className="flex gap-2">
            <Input value={profileUrl} disabled />
            <Button variant="outline" onClick={copyToClipboard} className="gap-2">
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </section>

        {/* Accept messages */}
        <section className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Accept new messages</h3>
            <p className="text-sm text-muted-foreground">
              Turn this off when you want silence.
            </p>
          </div>

          <Switch
            checked={acceptMessages}
            onCheckedChange={async () => {
              try {
                setIsSwitchLoading(true);
                const response = await axios.post<ApiResponse>(
                  "/api/accept-messages",
                  { acceptMessages: !acceptMessages }
                );
                if (response.data.success) {
                  setValue("acceptMessages", !acceptMessages);
                  toast.success(response.data.message);
                }
              } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                toast.error(
                  axiosError.response?.data.message ||
                    "Failed to update setting"
                );
              } finally {
                setIsSwitchLoading(false);
              }
            }}
            disabled={isSwitchLoading}
          />
        </section>

        <Separator />

        {/* Messages */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-gray-700" />
            <h2 className="text-2xl font-semibold">Messages</h2>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground">Loading messages…</p>
          ) : messages.length > 0 ? (
            <div className="grid gap-4">
              {messages.map((message) => (
                <MessageCard
                  key={message._id.toString()}
                  message={message}
                  onMessageDelete={(id) =>
                    setMessages((prev) =>
                      prev.filter((m) => m._id.toString() !== id)
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground max-w-md">
              No messages yet. Share your link and give people a safe place to
              speak.
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Page;
