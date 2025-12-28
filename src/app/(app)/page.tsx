"use client";

import React from "react";
import Link from "next/link";
import messages from "@/messages.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Footer from "@/components/ui/Footer";
import { ShieldCheck, MessageCircle, Link as LinkIcon } from "lucide-react";

const Home = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-gray-50">

      {/* HERO */}
      <section className="relative px-6 py-28 text-center">
        <div className="mx-auto max-w-5xl space-y-6">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            Anonymous • Secure • Honest
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Secure Whisper
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            An anonymous messaging platform where honesty comes first.
            No profiles. No tracking. Just real messages — delivered securely.
          </p>

          <div className="flex justify-center gap-4 pt-6">
            <Link href="/sign-up">
              <Button size="lg" className="px-8 cursor-pointer">
                Create your inbox
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button  size="lg" variant="outline" className="cursor-pointer">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-gray-900">
              Words people never say out loud
            </h2>
            <p className="text-muted-foreground">
              Secure Whisper gives people the courage to be honest.
            </p>
          </div>

          <Carousel
            plugins={[autoplay.current]}
            opts={{ align: "start", loop: true }}
            className="w-full max-w-4xl mx-auto"
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 px-3"
                >
                  <Card className="h-full bg-white/80 backdrop-blur border shadow-sm hover:shadow-md transition">
                    <CardContent className="flex flex-col justify-between p-6 h-full">
                      <div>
                        <h3 className="font-medium text-base text-gray-900 mb-2">
                          {message.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-4">
                        {message.received}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-24 bg-white border-t">
        <div className="max-w-5xl mx-auto space-y-14">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              How it works
            </h2>
            <p className="text-muted-foreground">
              Three simple steps to receive anonymous messages
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <LinkIcon />
              </div>
              <h3 className="font-medium text-gray-900">
                Create your link
              </h3>
              <p className="text-sm text-muted-foreground">
                Sign up and get a unique Secure Whisper link.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <MessageCircle />
              </div>
              <h3 className="font-medium text-gray-900">
                Share it anywhere
              </h3>
              <p className="text-sm text-muted-foreground">
                Post it publicly or send it privately.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <ShieldCheck />
              </div>
              <h3 className="font-medium text-gray-900">
                Receive messages anonymously
              </h3>
              <p className="text-sm text-muted-foreground">
                Messages arrive without revealing who sent them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY PROMISE */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <ShieldCheck className="mx-auto h-10 w-10 text-emerald-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Privacy is the foundation
          </h2>
          <p className="text-muted-foreground">
            Secure Whisper never stores sender identities, never exposes IPs,
            and never tracks users across the web. Your inbox is yours alone.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
