"use client";

import Link from "next/link";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  ShieldCheck,
  Zap,
} from "lucide-react";

type Props = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  validity: string;
};

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
  stock,
  validity,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  async function addToCart() {

    if (loading) return;

    setLoading(true);

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        toast.error(
          "Please login first!"
        );

        setTimeout(() => {

          window.location.href =
            "/login";

        }, 1200);

        return;
      }

      if (stock <= 0) {

        toast.error(
          "Out Of Stock"
        );

        return;
      }

      const cart = JSON.parse(
        localStorage.getItem(
          "cart"
        ) || "[]"
      );

      const existingItem =
        cart.find(
          (item: any) =>
            item.id === id
        );

      if (existingItem) {

        if (
          existingItem.quantity >=
          stock
        ) {

          toast.error(
            "Maximum stock reached"
          );

          return;
        }

        existingItem.quantity += 1;

      } else {

        cart.push({
          id,
          title,
          description,
          price,
          image,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      toast.success(
        "Added To Cart!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  async function buyNow() {

    await addToCart();

    setTimeout(() => {

      window.location.href =
        "/checkout";

    }, 600);
  }

  return (

    <div className="group relative bg-zinc-950 border border-yellow-500/10 rounded-3xl overflow-hidden hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,215,0,0.18)]">

      {/* STOCK BADGE */}

      <div
        className={`absolute top-4 left-4 z-20 text-xs font-black px-4 py-2 rounded-xl shadow-lg ${
          stock <= 0
            ? "bg-red-500 text-white"
            : stock <= 5
            ? "bg-yellow-500 text-black"
            : "bg-green-500 text-black"
        }`}
      >

        {stock <= 0
          ? "OUT OF STOCK"
          : `STOCK: ${stock}`}

      </div>

      {/* VALIDITY */}

      <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-lg">

        {validity}

      </div>

      {/* IMAGE */}

      <Link href={`/product/${id}`}>

        <div className="relative overflow-hidden">

          <img
            src={image}
            alt={title}
            className="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        </div>

      </Link>

      {/* CONTENT */}

      <div className="p-6">

        <div className="flex items-start justify-between gap-4">

          <h1 className="text-white text-2xl font-black leading-tight">

            {title}

          </h1>

          <ShieldCheck className="text-yellow-400 min-w-[24px]" />

        </div>

        <h2 className="text-yellow-400 text-5xl font-black mt-5">

          ₹{price}

        </h2>

        <div className="mt-6 space-y-3">

          <div className="flex justify-between items-center text-sm">

            <span className="text-zinc-400">

              Validity

            </span>

            <span className="text-yellow-400 font-bold">

              {validity}

            </span>

          </div>

          <div className="flex justify-between items-center text-sm">

            <span className="text-zinc-400">

              Delivery

            </span>

            <span className="text-green-400 font-bold flex items-center gap-2">

              <Zap size={14} />

              Instant Access

            </span>

          </div>

        </div>

        <p className="text-zinc-400 text-sm mt-5 leading-7 line-clamp-4">

          {description}

        </p>

        {/* BUTTONS */}

        <div className="flex gap-3 mt-8">

          <button
            onClick={addToCart}
            disabled={
              stock <= 0 ||
              loading
            }
            className={`flex-1 py-4 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-3 ${
              stock <= 0
                ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]"
            }`}
          >

            <ShoppingCart size={20} />

            {loading
              ? "Adding..."
              : stock <= 0
              ? "Sold Out"
              : "Add To Cart"}

          </button>

          {stock > 0 && (

            <button
              onClick={buyNow}
              className="px-6 rounded-2xl bg-white text-black font-black hover:scale-[1.02] transition-all"
            >

              Buy

            </button>

          )}

        </div>

      </div>

    </div>
  );
}