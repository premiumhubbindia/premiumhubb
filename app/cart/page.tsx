"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Tag,
} from "lucide-react";

type CartItem = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  quantity: number;
};

export default function CartPage() {

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [coupon, setCoupon] =
    useState("");

  useEffect(() => {

    loadCart();

  }, []);

  function loadCart() {

    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCartItems(storedCart);
  }

  function updateCart(
    updatedCart: CartItem[]
  ) {

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("storage")
    );
  }

  function removeItem(
    indexToRemove: number
  ) {

    const updatedCart =
      cartItems.filter(
        (_, index) =>
          index !== indexToRemove
      );

    updateCart(updatedCart);

    toast.success(
      "Item Removed!"
    );
  }

  function increaseQuantity(
    index: number
  ) {

    const updatedCart = [
      ...cartItems,
    ];

    updatedCart[index]
      .quantity += 1;

    updateCart(updatedCart);
  }

  function decreaseQuantity(
    index: number
  ) {

    const updatedCart = [
      ...cartItems,
    ];

    if (
      updatedCart[index]
        .quantity > 1
    ) {

      updatedCart[index]
        .quantity -= 1;

      updateCart(updatedCart);

    } else {

      removeItem(index);
    }
  }

  const subtotal =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          item.quantity,
      0
    );

  const discount =
    coupon.toLowerCase() ===
    "premium10"
      ? subtotal * 0.1
      : 0;

  const finalTotal =
    subtotal - discount;

  return (

    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        <h1 className="text-5xl font-black text-yellow-400 mb-12">

          Your Cart 🛒

        </h1>

        {cartItems.length === 0 ? (

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-16 text-center">

            <ShoppingBag
              size={80}
              className="mx-auto text-yellow-400 mb-8"
            />

            <h2 className="text-4xl font-black">

              Your Cart is Empty

            </h2>

            <p className="text-zinc-400 mt-5 text-lg">

              Add premium products to continue shopping.

            </p>

            <Link href="/">

              <button className="mt-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-10 py-4 rounded-2xl font-black hover:scale-105 transition">

                Explore Products

              </button>

            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-[1fr_400px] gap-10">

            {/* CART ITEMS */}

            <div className="space-y-8">

              {cartItems.map(
                (item, index) => (

                  <div
                    key={index}
                    className="bg-zinc-900 border border-yellow-500/20 rounded-3xl overflow-hidden flex flex-col md:flex-row"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full md:w-[260px] h-[260px] object-cover"
                    />

                    <div className="flex-1 p-6">

                      <div className="flex flex-col md:flex-row justify-between gap-5">

                        <div>

                          <h2 className="text-3xl font-black">

                            {item.title}

                          </h2>

                          <p className="text-zinc-400 mt-5 leading-7">

                            {item.description}

                          </p>

                        </div>

                        <button
                          onClick={() =>
                            removeItem(index)
                          }
                          className="bg-red-600 hover:bg-red-700 w-14 h-14 rounded-2xl flex items-center justify-center transition"
                        >

                          <Trash2 size={22} />

                        </button>

                      </div>

                      {/* QUANTITY */}

                      <div className="flex flex-wrap items-center justify-between gap-6 mt-10">

                        <div className="flex items-center gap-5 bg-zinc-800 px-5 py-3 rounded-2xl">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                index
                              )
                            }
                          >

                            <Minus size={20} />

                          </button>

                          <span className="text-2xl font-black">

                            {item.quantity}

                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                index
                              )
                            }
                          >

                            <Plus size={20} />

                          </button>

                        </div>

                        <h2 className="text-4xl font-black text-yellow-400">

                          ₹
                          {Number(
                            item.price
                          ) *
                            item.quantity}

                        </h2>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

            {/* SUMMARY */}

            <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 h-fit sticky top-28">

              <h2 className="text-3xl font-black mb-8">

                Order Summary

              </h2>

              {/* COUPON */}

              <div className="mb-8">

                <label className="text-zinc-400 block mb-3">

                  Coupon Code

                </label>

                <div className="flex gap-3">

                  <div className="relative flex-1">

                    <Tag
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                      type="text"
                      placeholder="Enter coupon"
                      value={coupon}
                      onChange={(e) =>
                        setCoupon(
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-yellow-500"
                    />

                  </div>

                </div>

                {coupon.toLowerCase() ===
                  "premium10" && (

                  <p className="text-green-400 mt-3 font-bold">

                    10% Discount Applied 🎉

                  </p>

                )}

              </div>

              {/* TOTALS */}

              <div className="space-y-5 border-t border-zinc-800 pt-6">

                <div className="flex justify-between text-zinc-400">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{subtotal}
                  </span>

                </div>

                <div className="flex justify-between text-zinc-400">

                  <span>
                    Discount
                  </span>

                  <span className="text-green-400">

                    -₹
                    {discount.toFixed(
                      0
                    )}

                  </span>

                </div>

                <div className="flex justify-between text-3xl font-black text-yellow-400 pt-5 border-t border-zinc-800">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹
                    {finalTotal.toFixed(
                      0
                    )}

                  </span>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="space-y-5 mt-10">

                <Link href="/checkout">

                  <button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-[0_0_25px_rgba(255,215,0,0.25)]">

                    Proceed To Checkout

                  </button>

                </Link>

                <Link href="/">

                  <button className="w-full bg-zinc-800 hover:bg-zinc-700 py-5 rounded-2xl font-black transition-all">

                    Continue Shopping

                  </button>

                </Link>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}