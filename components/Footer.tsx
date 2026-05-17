"use client";

import Link from "next/link";

import { useState } from "react";

import {
  ChevronDown,
  Mail,
  Phone,
  Instagram,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {

  const [footerTab, setFooterTab] =
    useState("");

  return (

    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 md:px-16 py-16">

      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}

          <div>

            <h1 className="text-4xl font-black text-yellow-400">

              PremiumHubb

            </h1>

            <p className="text-zinc-400 mt-5 leading-8">

              Premium OTT, Music, AI Tools,
              and Digital subscriptions at
              affordable prices with instant
              delivery and trusted support.

            </p>

            <div className="flex items-center gap-3 mt-6 text-green-400 font-bold">

              <ShieldCheck size={20} />

              Trusted & Secure

            </div>

          </div>

          {/* COMPANY */}

          <div>

            <h2 className="text-2xl font-black mb-6">

              Company

            </h2>

            <div className="space-y-4 text-zinc-400">

              <button
                onClick={() =>
                  setFooterTab(
                    footerTab ===
                      "about"
                      ? ""
                      : "about"
                  )
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >

                About Us

                <ChevronDown size={18} />

              </button>

              <button
                onClick={() =>
                  setFooterTab(
                    footerTab ===
                      "contact"
                      ? ""
                      : "contact"
                  )
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >

                Contact Us

                <ChevronDown size={18} />

              </button>

              <button
                onClick={() =>
                  setFooterTab(
                    footerTab ===
                      "services"
                      ? ""
                      : "services"
                  )
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >

                Our Services

                <ChevronDown size={18} />

              </button>

            </div>

          </div>

          {/* SUPPORT */}

          <div>

            <h2 className="text-2xl font-black mb-6">

              Support

            </h2>

            <div className="space-y-4 text-zinc-400">

              <Link
                href="/support"
                className="block hover:text-yellow-400 transition"
              >

                Help Center

              </Link>

              <button
                onClick={() =>
                  setFooterTab(
                    footerTab ===
                      "faq"
                      ? ""
                      : "faq"
                  )
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >

                FAQ

                <ChevronDown size={18} />

              </button>

              <Link
                href="/support"
                className="block hover:text-yellow-400 transition"
              >

                Contact Support

              </Link>

              <button
                onClick={() =>
                  setFooterTab(
                    footerTab ===
                      "delivery"
                      ? ""
                      : "delivery"
                  )
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >

                Delivery Info

                <ChevronDown size={18} />

              </button>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h2 className="text-2xl font-black mb-6">

              Contact

            </h2>

            <div className="space-y-5 text-zinc-400">

              <div className="flex items-center gap-3 break-all">

                <Mail size={20} />

                help.premiumhubbindia@gmail.com

              </div>

              <div className="flex items-center gap-3">

                <Phone size={20} />

                +91 8764357898

              </div>

              <div className="flex items-center gap-3">

                <Instagram size={20} />

                @premiumhubb

              </div>

            </div>

          </div>

        </div>

        {/* EXPANDABLE CONTENT */}

        {footerTab && (

          <div className="mt-14 bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

            {/* ABOUT */}

            {footerTab === "about" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  About PremiumHubb

                </h2>

                <p className="text-zinc-400 mt-6 leading-8">

                  PremiumHubb is a premium
                  digital subscription marketplace
                  providing OTT platforms,
                  AI tools, music subscriptions,
                  social media services and
                  premium accounts at highly
                  affordable pricing with instant
                  delivery and trusted support.

                </p>

              </div>

            )}

            {/* CONTACT */}

            {footerTab === "contact" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  Contact Us

                </h2>

                <div className="space-y-5 mt-8 text-zinc-300">

                  <div className="flex items-center gap-4">

                    <Mail size={22} />

                    help.premiumhubbindia@gmail.com

                  </div>

                  <div className="flex items-center gap-4">

                    <Phone size={22} />

                    +91 8764357898

                  </div>

                  <div className="flex items-center gap-4">

                    <Instagram size={22} />

                    @premiumhubb

                  </div>

                </div>

              </div>

            )}

            {/* SERVICES */}

            {footerTab === "services" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  Our Services

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

                  <div className="bg-zinc-800 rounded-2xl p-6 font-bold">

                    OTT Subscriptions

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-6 font-bold">

                    AI Tool Accounts

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-6 font-bold">

                    Music Premium Plans

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-6 font-bold">

                    Social Media Tools

                  </div>

                </div>

              </div>

            )}

            {/* FAQ */}

            {footerTab === "faq" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  Frequently Asked Questions

                </h2>

                <div className="space-y-6 mt-8 text-zinc-300">

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    <h3 className="font-bold text-white">

                      How fast is delivery?

                    </h3>

                    <p className="mt-2 text-zinc-400">

                      Most products are delivered instantly after payment.

                    </p>

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    <h3 className="font-bold text-white">

                      Are payments secure?

                    </h3>

                    <p className="mt-2 text-zinc-400">

                      Yes, all payments are protected using secure gateways.

                    </p>

                  </div>

                </div>

              </div>

            )}

            {/* DELIVERY */}

            {footerTab === "delivery" && (

              <div>

                <h2 className="text-3xl font-black text-yellow-400">

                  Delivery Information

                </h2>

                <div className="space-y-5 mt-8 text-zinc-300">

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    Instant account delivery after successful payment.

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    Support available if delivery is delayed.

                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5">

                    Products are delivered digitally via email or chat.

                  </div>

                </div>

              </div>

            )}

          </div>

        )}

        {/* BOTTOM */}

        <div className="border-t border-zinc-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-zinc-500 text-center">

            © 2026 PremiumHubb.
            All rights reserved.

          </p>

          <div className="flex flex-wrap justify-center gap-6 text-zinc-500 text-sm">

            <p className="hover:text-yellow-400 transition cursor-pointer">

              Privacy

            </p>

            <p className="hover:text-yellow-400 transition cursor-pointer">

              Terms

            </p>

            <p className="hover:text-yellow-400 transition cursor-pointer">

              Refunds

            </p>

            <p className="hover:text-yellow-400 transition cursor-pointer">

              Security

            </p>

            <Link
              href="/admin"
              className="hover:text-yellow-400 transition"
            >

              Admin

            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}