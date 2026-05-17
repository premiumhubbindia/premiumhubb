"use client";

import Link from "next/link";

import Snowfall from "@/components/Snowfall";

export default function Hero() {

  return (

    <section className="relative overflow-hidden px-6 md:px-16 py-32">

      <Snowfall />

      {/* GLOW */}

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10" />

      <div className="max-w-7xl mx-auto text-center relative z-10">

        {/* TRUST BADGE */}

        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">

          Trusted by 1000+ Customers

        </div>

        {/* HEADING */}

        <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-tight max-w-6xl mx-auto">

          Buy Premium
          Subscriptions

          <span className="block text-yellow-400 mt-3">

            At Lowest Prices

          </span>

        </h1>

        {/* SUBTEXT */}

        <p className="text-zinc-400 text-lg md:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed">

          Netflix, Spotify, ChatGPT Plus,
          YouTube Premium, Prime Video,
          AI Tools and more at affordable pricing
          with instant delivery.

        </p>

        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">

          <Link href="#products">

            <button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.25)]">

              Get Started

            </button>

          </Link>

          <Link href="#products">

            <button className="border border-yellow-500 text-yellow-400 px-10 py-4 rounded-2xl font-black hover:bg-yellow-500 hover:text-black transition-all duration-300">

              View Plans

            </button>

          </Link>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">

          <div className="bg-zinc-900/70 border border-yellow-500/10 rounded-3xl p-6 backdrop-blur-xl">

            <h2 className="text-4xl font-black text-yellow-400">

              10K+

            </h2>

            <p className="text-zinc-400 mt-2">

              Deliveries

            </p>

          </div>

          <div className="bg-zinc-900/70 border border-yellow-500/10 rounded-3xl p-6 backdrop-blur-xl">

            <h2 className="text-4xl font-black text-yellow-400">

              20+

            </h2>

            <p className="text-zinc-400 mt-2">

              OTT Platforms

            </p>

          </div>

          <div className="bg-zinc-900/70 border border-yellow-500/10 rounded-3xl p-6 backdrop-blur-xl">

            <h2 className="text-4xl font-black text-yellow-400">

              1000+

            </h2>

            <p className="text-zinc-400 mt-2">

              Happy Users

            </p>

          </div>

          <div className="bg-zinc-900/70 border border-yellow-500/10 rounded-3xl p-6 backdrop-blur-xl">

            <h2 className="text-4xl font-black text-yellow-400">

              24/7

            </h2>

            <p className="text-zinc-400 mt-2">

              Support

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}