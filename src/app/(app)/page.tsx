"use client";

import Link from "next/link";
import messages from "@/messages.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
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
  Lock,
} from "lucide-react";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

const Home = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 4200, stopOnInteraction: false })
  );

  return (
    <main className="min-h-screen  text-foreground">
      {/* HERO */}
      <section className="px-6 pt-24 sm:pt-32 pb-20 sm:pb-24">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center">
            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full
              border border-border/60 bg-background/60 backdrop-blur
              shadow-sm">
              <EyeOff className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <h1>
                <LayoutTextFlip
                  text="Things you’d never say"
                  words={[
                    "out loud everywhere",
                    "in public spaces",
                    "your name attached",
                    "zero fear involved",
                    "no filters applied",
                  ]}

                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                />
              </h1>
            </motion.div>

            {/* Subtext */}
            <p className="mt-6 max-w-xl text-base sm:text-lg
              text-muted-foreground leading-relaxed">
              Honest messages, without the weight of identity.
              <span className="mt-2 block font-medium text-foreground">
                Anonymous by design.
              </span>
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4 pt-6">
            <Link href="/sign-up">
              <Button size="lg" className="px-8 flex items-center gap-2 cursor-pointer">
                Create your inbox
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="px-8 cursor-pointer">
                Sign in
              </Button>
            </Link>
          </div>

          <p className="pt-6 text-xs text-muted-foreground">
            Anonymous by default • No tracking • No ads. Ever.
          </p>
        </div>
      </section>

      {/* WHISPERS */}
      <section className="px-6 py-24 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-12 text-center">
          <div className="space-y-2">
            <MessageSquareQuote className="mx-auto h-7 w-7 text-muted-foreground" />
            <h2 className="text-2xl font-medium">
              Messages never meant to be public
            </h2>
            <p className="text-muted-foreground">
              Sent quietly. Read privately.
            </p>
          </div>

          <Carousel
            plugins={[autoplay.current]}
            opts={{ align: "start", loop: true }}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 px-4"
                >
                  <Card className="border bg-background/80 backdrop-blur
                    hover:shadow-sm transition">
                    <CardContent className="p-6 space-y-4 text-left">
                      <p className="text-sm">
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

      {/* PRINCIPLES */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-4xl grid gap-16 md:grid-cols-3 text-center">
          <div className="space-y-4">
            <Lock className="mx-auto h-7 w-7 text-muted-foreground" />
            <h3 className="font-medium">No identity</h3>
            <p className="text-sm text-muted-foreground">
              We don’t know who you are.
              That’s intentional.
            </p>
          </div>

          <div className="space-y-4">
            <EyeOff className="mx-auto h-7 w-7 text-muted-foreground" />
            <h3 className="font-medium">No pressure</h3>
            <p className="text-sm text-muted-foreground">
              No likes. No comments.
              Just words.
            </p>
          </div>

          <div className="space-y-4">
            <MessageSquareQuote className="mx-auto h-7 w-7 text-muted-foreground" />
            <h3 className="font-medium">Just honesty</h3>
            <p className="text-sm text-muted-foreground">
              Messages arrive untouched.
              Nothing added.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-28 bg-muted/40 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-semibold">
            Create a place for honesty
          </h2>
          <p className="text-muted-foreground">
            Your anonymous inbox is ready in seconds.
          </p>

          <Link href="/sign-up">
            <Button size="lg" className="px-8 cursor-pointer">
              Get started
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
