"use client";

import React from "react";
import Link from "next/link";
import messages from "@/messages.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  EyeOff,
  MessageSquareQuote,
  ArrowRight,
  Lock
} from "lucide-react";

const Home = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 4200, stopOnInteraction: false })
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="px-6 pt-32 pb-24">
        <div className="mx-auto max-w-4xl text-center space-y-8">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray-200">
            <EyeOff className="h-6 w-6 text-gray-500" />
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Things you’d never say
            <br />
            <span className="text-gray-400">
              can be said here
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure Whisper is a calm space for honest messages —
            no names, no profiles, no pressure.
          </p>

          <div className="flex justify-center gap-4 pt-6">
            <Link href="/sign-up">
              <Button size="lg" className="px-8">
                Create your inbox
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button size="lg" variant="outline">
                Sign in
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground pt-6">
            Anonymous by default • No tracking • No ads
          </p>
        </div>
      </section>

      {/* WHISPERS */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl space-y-12 text-center">

          <div className="space-y-2">
            <MessageSquareQuote className="mx-auto h-7 w-7 text-gray-400" />
            <h2 className="text-2xl font-medium">
              Messages that were never meant to be public
            </h2>
            <p className="text-muted-foreground">
              Sent quietly. Read privately.
            </p>
          </div>

          <Carousel
            plugins={[autoplay.current]}
            opts={{ align: "start", loop: true }}
            className="max-w-5xl mx-auto"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 px-4"
                >
                  <Card className="border bg-white hover:shadow-sm transition">
                    <CardContent className="p-6 space-y-4 text-left">
                      <p className="text-sm text-gray-700">
                        “{message.content}”
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {message.received}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* HOW IT FEELS */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl grid gap-16 md:grid-cols-3 text-center">

          <div className="space-y-4">
            <Lock className="mx-auto h-7 w-7 text-gray-400" />
            <h3 className="font-medium">No identity</h3>
            <p className="text-sm text-muted-foreground">
              We don’t know who you are.
              That’s intentional.
            </p>
          </div>

          <div className="space-y-4">
            <EyeOff className="mx-auto h-7 w-7 text-gray-400" />
            <h3 className="font-medium">No pressure</h3>
            <p className="text-sm text-muted-foreground">
              No likes. No comments.
              Just words.
            </p>
          </div>

          <div className="space-y-4">
            <MessageSquareQuote className="mx-auto h-7 w-7 text-gray-400" />
            <h3 className="font-medium">Just honesty</h3>
            <p className="text-sm text-muted-foreground">
              Messages arrive untouched.
              Nothing added.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 bg-gray-50 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-semibold">
            Create a place for honesty
          </h2>
          <p className="text-muted-foreground">
            Your anonymous inbox is ready in seconds.
          </p>

          <Link href="/sign-up">
            <Button size="lg" className="px-10">
              Get started
            </Button>
          </Link>
        </div>
      </section>

     
    </main>
  );
};

export default Home;
