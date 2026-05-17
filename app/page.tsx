"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

import ProductCard from "@/components/ProductCard";

import Navbar from "@/components/Navbar";

import Snowfall from "@/components/Snowfall";

import {
  ShieldCheck,
  Headphones,
  Zap,
  Users,
} from "lucide-react";

export default function HomePage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [footerTab, setFooterTab] =
    useState("");

  const [faqOpen, setFaqOpen] =
    useState<number | null>(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  async function fetchProducts() {

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (!error && data) {

      setProducts(data);
    }
  }

  const filteredProducts =
    products.filter((product) => {

      const categoryMatch =
        selectedCategory === "All"
          ? true
          : product.category ===
            selectedCategory;

      const searchMatch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        categoryMatch &&
        searchMatch
      );
    });

  return (

    <div className="bg-black min-h-screen text-white overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden px-6 md:px-16 py-28">

        <Snowfall />

        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">

            Trusted by 1000+ Customers

          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-tight">

            Premium OTT & AI

            <span className="block text-yellow-400 mt-3">

              Subscriptions

            </span>

          </h1>

          <p className="text-zinc-400 text-lg md:text-2xl mt-8 max-w-3xl mx-auto leading-relaxed">

            Instant delivery • Secure payments •
            24/7 support • Premium accounts at
            affordable pricing

          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-12">

            <Link href="#products">

              <button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.25)]">

                Browse Products

              </button>

            </Link>

            <Link href="/signup">

              <button className="border border-yellow-500 text-yellow-400 px-10 py-4 rounded-2xl font-black hover:bg-yellow-500 hover:text-black transition-all duration-300">

                Join Now

              </button>

            </Link>

          </div>

        </div>

      </section>

      {/* TRUST SECTION */}

      <section className="px-6 md:px-16 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8">

            <Users className="text-yellow-400 w-12 h-12 mb-5" />

            <h1 className="text-4xl font-black">

              1000+

            </h1>

            <p className="text-zinc-400 mt-3">

              Happy Customers

            </p>

          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8">

            <Zap className="text-yellow-400 w-12 h-12 mb-5" />

            <h1 className="text-4xl font-black">

              10K+

            </h1>

            <p className="text-zinc-400 mt-3">

              Subscriptions Delivered

            </p>

          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8">

            <ShieldCheck className="text-yellow-400 w-12 h-12 mb-5" />

            <h1 className="text-4xl font-black">

              Secure

            </h1>

            <p className="text-zinc-400 mt-3">

              Protected Payments

            </p>

          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8">

            <Headphones className="text-yellow-400 w-12 h-12 mb-5" />

            <h1 className="text-4xl font-black">

              24/7

            </h1>

            <p className="text-zinc-400 mt-3">

              Customer Support

            </p>

          </div>

        </div>

      </section>

      {/* SEARCH */}

      <section className="px-6 md:px-16 pt-6">

        <div className="max-w-3xl mx-auto">

          <input
            type="text"
            placeholder="Search Netflix, Spotify, ChatGPT..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-zinc-900 border border-yellow-500/20 focus:border-yellow-500 rounded-2xl px-6 py-5 outline-none text-lg"
          />

        </div>

      </section>

      {/* CATEGORY FILTERS */}

      <section className="px-6 md:px-16 py-10">

        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-2 justify-start md:justify-center">

          {[
            "All",
            "OTT",
            "Music",
            "AI Tools",
            "Creativity",
            "Social Media",
          ].map((category) => {

            const count =
              category === "All"
                ? products.length
                : products.filter(
                    (product) =>
                      product.category === category
                  ).length;

            return (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`relative whitespace-nowrap px-7 py-4 rounded-2xl font-bold transition-all duration-300 border ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black border-yellow-400 shadow-[0_0_25px_rgba(255,215,0,0.35)] scale-105"
                    : "bg-zinc-900/80 text-zinc-300 border-zinc-700 hover:border-yellow-500 hover:text-yellow-400"
                }`}
              >

                {category}

              </button>

            );
          })}

        </div>

      </section>

      {/* PRODUCTS */}

      <section
        id="products"
        className="px-6 md:px-16 py-14"
      >

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredProducts.length > 0 ? (

            filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                stock={product.stock}
                validity={product.validity}
              />

            ))

          ) : (

            <div className="col-span-full text-center py-20">

              <h1 className="text-4xl font-black text-yellow-400">

                No Products Found

              </h1>

            </div>

          )}

        </div>

      </section>

      {/* TESTIMONIALS */}

      <section className="px-6 md:px-16 py-20">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-black text-center mb-16">

            Customer Reviews

          </h1>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              {
                name: "Rahul",
                review:
                  "Fast delivery and premium support. Highly recommended.",
              },
              {
                name: "Akash",
                review:
                  "Best pricing for OTT subscriptions.",
              },
              {
                name: "Priya",
                review:
                  "Very trusted service with instant account delivery.",
              },
            ].map((review, index) => (

              <div
                key={index}
                className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8"
              >

                <h2 className="text-2xl font-black text-yellow-400">

                  {review.name}

                </h2>

                <p className="text-zinc-400 mt-5 leading-8">

                  {review.review}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="px-6 md:px-16 py-20">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-black text-center mb-16">

            Frequently Asked Questions

          </h1>

          {[
            {
              q: "How fast is delivery?",
              a: "Most products are delivered instantly after payment.",
            },
            {
              q: "Are payments secure?",
              a: "Yes. All payments are secured using trusted payment gateways.",
            },
            {
              q: "What if account stops working?",
              a: "Contact support anytime for assistance.",
            },
          ].map((faq, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-yellow-500/20 rounded-2xl mb-5 overflow-hidden"
            >

              <button
                onClick={() =>
                  setFaqOpen(
                    faqOpen === index
                      ? null
                      : index
                  )
                }
                className="w-full flex justify-between items-center p-6"
              >

                <span className="font-bold text-lg">

                  {faq.q}

                </span>

                <span className="text-yellow-400 text-2xl">

                  {faqOpen === index
                    ? "-"
                    : "+"}

                </span>

              </button>

              {faqOpen === index && (

                <div className="px-6 pb-6 text-zinc-400">

                  {faq.a}

                </div>

              )}

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-zinc-800 mt-20 px-6 md:px-16 py-16 bg-zinc-950">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>

            <h1 className="text-4xl font-black text-yellow-400">

              PremiumHubb

            </h1>

            <p className="text-zinc-400 mt-5 leading-relaxed">

              Premium subscriptions at affordable pricing.

            </p>

          </div>

          <div>

            <h2 className="text-2xl font-bold mb-5">

              Company

            </h2>

            <div className="space-y-3 text-zinc-400">

              <button
                onClick={() =>
                  setFooterTab("about")
                }
                className="block hover:text-yellow-400 transition"
              >
                About Us
              </button>

              <button
                onClick={() =>
                  setFooterTab("contact")
                }
                className="block hover:text-yellow-400 transition"
              >
                Contact Us
              </button>

              <button
                onClick={() =>
                  setFooterTab("services")
                }
                className="block hover:text-yellow-400 transition"
              >
                Our Services
              </button>

            </div>

          </div>

        </div>

        {footerTab && (

          <div className="mt-14 bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

            {footerTab === "about" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  About PremiumHubb

                </h2>

                <p className="text-zinc-400 mt-5 leading-8">

                  PremiumHubb provides premium OTT,
                  AI tools, music subscriptions and
                  digital services.

                </p>

              </div>

            )}

            {footerTab === "contact" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  Contact Us

                </h2>

                <div className="space-y-4 mt-6 text-zinc-300">

                  <p>
                    help.premiumhubbindia@gmail.com
                  </p>

                  <p>
                    WhatsApp:
                    +91 8764357898
                  </p>

                </div>

              </div>

            )}

            {footerTab === "services" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  Our Services

                </h2>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    OTT Subscriptions

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    AI Tool Accounts

                  </div>

                </div>

              </div>

            )}

          </div>

        )}

      </footer>

    </div>
  );
}