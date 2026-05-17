"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";

import ProductCard from "@/components/ProductCard";

import {
  ShieldCheck,
  Zap,
  Minus,
  Plus,
} from "lucide-react";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  stock?: number;
  category?: string;
  validity?: string;
};

export default function ProductPage() {

  const params = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [relatedProducts, setRelatedProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {

    fetchProduct();

  }, []);

  async function fetchProduct() {

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) {

      toast.error(error.message);

      setLoading(false);

      return;
    }

    setProduct(data);

    if (data.category) {

      fetchRelatedProducts(
        data.category,
        data.id
      );
    }

    setLoading(false);
  }

  async function fetchRelatedProducts(
    category: string,
    currentId: number
  ) {

    const { data } =
      await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .neq("id", currentId)
        .limit(4);

    if (data) {

      setRelatedProducts(data);
    }
  }

  function addToCart() {

    if (!product) return;

    if (
      product.stock !== undefined &&
      product.stock <= 0
    ) {

      toast.error(
        "Out Of Stock"
      );

      return;
    }

    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem =
      cart.find(
        (item: any) =>
          item.id === product.id
      );

    if (existingItem) {

      if (
        product.stock &&
        existingItem.quantity + quantity >
          product.stock
      ) {

        toast.error(
          "Stock limit exceeded"
        );

        return;
      }

      existingItem.quantity += quantity;

    } else {

      cart.push({
        ...product,
        quantity,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("storage")
    );

    toast.success(
      "Added To Cart!"
    );
  }

  function buyNow() {

    addToCart();

    setTimeout(() => {

      window.location.href =
        "/checkout";

    }, 600);
  }

  if (loading) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        <h1 className="text-4xl font-black text-yellow-400 animate-pulse">

          Loading Product...

        </h1>

      </div>

    );
  }

  if (!product) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        <h1 className="text-4xl font-black text-red-500">

          Product Not Found

        </h1>

      </div>

    );
  }

  return (

    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* IMAGE */}

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl overflow-hidden">

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[550px] object-cover hover:scale-105 transition duration-500"
            />

          </div>

          {/* CONTENT */}

          <div>

            {product.category && (

              <div className="inline-block bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-2xl font-bold mb-6">

                {product.category}

              </div>

            )}

            <h1 className="text-5xl md:text-6xl font-black leading-tight">

              {product.title}

            </h1>

            <p className="text-zinc-400 mt-8 text-lg leading-8">

              {product.description}

            </p>

            {/* INFO */}

            <div className="mt-8 space-y-4">

              {product.validity && (

                <div className="bg-zinc-900 border border-yellow-500/10 rounded-2xl px-5 py-4">

                  <span className="text-zinc-400">

                    Validity:
                    {" "}

                  </span>

                  <span className="text-yellow-400 font-bold">

                    {product.validity}

                  </span>

                </div>

              )}

              {typeof product.stock ===
                "number" && (

                <div className="bg-zinc-900 border border-yellow-500/10 rounded-2xl px-5 py-4">

                  <span className="text-zinc-400">

                    Stock Remaining:
                    {" "}

                  </span>

                  <span
                    className={`font-bold ${
                      product.stock > 5
                        ? "text-green-400"
                        : product.stock > 0
                        ? "text-yellow-400"
                        : "text-red-500"
                    }`}
                  >

                    {product.stock}

                  </span>

                </div>

              )}

            </div>

            {/* PRICE */}

            <h2 className="text-6xl font-black text-yellow-400 mt-12">

              ₹{product.price}

            </h2>

            {/* QUANTITY */}

            <div className="flex items-center gap-5 mt-10">

              <span className="text-zinc-400 font-bold">

                Quantity

              </span>

              <div className="flex items-center gap-5 bg-zinc-900 border border-yellow-500/20 px-5 py-3 rounded-2xl">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(
                        1,
                        quantity - 1
                      )
                    )
                  }
                >

                  <Minus size={20} />

                </button>

                <span className="text-2xl font-black">

                  {quantity}

                </span>

                <button
                  onClick={() => {

                    if (
                      product.stock &&
                      quantity <
                        product.stock
                    ) {

                      setQuantity(
                        quantity + 1
                      );
                    }
                  }}
                >

                  <Plus size={20} />

                </button>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-5 mt-12">

              <button
                onClick={addToCart}
                disabled={
                  product.stock === 0
                }
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-10 py-5 rounded-2xl text-lg font-black hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(255,215,0,0.25)] disabled:opacity-50"
              >

                Add To Cart

              </button>

              <button
                onClick={buyNow}
                disabled={
                  product.stock === 0
                }
                className="bg-zinc-800 hover:bg-zinc-700 px-10 py-5 rounded-2xl text-lg font-black transition disabled:opacity-50"
              >

                Buy Now

              </button>

            </div>

            {/* TRUST */}

            <div className="mt-14 grid grid-cols-2 gap-5">

              <div className="bg-zinc-900 border border-yellow-500/10 rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <Zap className="text-yellow-400" />

                  <h3 className="text-yellow-400 font-bold text-lg">

                    Instant Access

                  </h3>

                </div>

                <p className="text-zinc-400 mt-3">

                  Credentials delivered instantly after purchase.

                </p>

              </div>

              <div className="bg-zinc-900 border border-yellow-500/10 rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <ShieldCheck className="text-yellow-400" />

                  <h3 className="text-yellow-400 font-bold text-lg">

                    Trusted Support

                  </h3>

                </div>

                <p className="text-zinc-400 mt-3">

                  Fast customer support whenever needed.

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RELATED */}

        {relatedProducts.length > 0 && (

          <div className="mt-28">

            <h2 className="text-5xl font-black text-yellow-400 mb-12">

              Related Products

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {relatedProducts.map(
                (item) => (

                  <ProductCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    stock={item.stock}
                    validity={item.validity}
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}