"use client";

import { useEffect, useState } from "react";

import Script from "next/script";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import Link from "next/link";

import {
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
} from "lucide-react";

type CartItem = {
  id: number;
  title: string;
  price: string;
  quantity: number;
};

export default function CheckoutPage() {

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [coupon, setCoupon] =
    useState("");

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  useEffect(() => {

    loadCart();

    loadUser();

  }, []);

  function loadCart() {

    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCartItems(storedCart);
  }

  async function loadUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {

      setEmail(user.email || "");

      const { data } =
        await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

      if (data) {

        setName(data.name || "");

        setPhone(data.phone || "");
      }
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

  async function handlePayment() {

    if (loading) return;

    if (cartItems.length === 0) {

      toast.error(
        "Your cart is empty!"
      );

      return;
    }

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

    setLoading(true);

    try {

      const options = {

        key: process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          finalTotal * 100,

        currency: "INR",

        name: "PremiumHubb",

        description:
          "Premium Subscription Purchase",

        handler: async function (
          response: any
        ) {

          try {

            const { error } =
              await supabase
                .from("orders")
                .insert([
                  {
                    user_email:
                      user.email,

                    products:
                      cartItems,

                    total:
                      String(
                        finalTotal
                      ),

                    payment_id:
                      response
                        .razorpay_payment_id,

                    status:
                      "Ordered",
                  },
                ]);

            if (error) {

              toast.error(
                error.message
              );

              setLoading(false);

              return;
            }

            /* STOCK UPDATE */

            for (const item of cartItems) {

              const {
                data: product,
              } = await supabase
                .from("products")
                .select("stock")
                .eq(
                  "id",
                  item.id
                )
                .single();

              if (product) {

                await supabase
                  .from(
                    "products"
                  )
                  .update({
                    stock:
                      product.stock -
                      item.quantity,
                  })
                  .eq(
                    "id",
                    item.id
                  );
              }
            }

            toast.success(
              "Payment Successful!"
            );

            localStorage.removeItem(
              "cart"
            );

            window.dispatchEvent(
              new Event("storage")
            );

            setCartItems([]);

            setTimeout(() => {

              window.location.href =
                "/orders";

            }, 1500);

          } catch (error) {

            console.log(error);

            toast.error(
              "Order Save Failed"
            );
          }

          setLoading(false);
        },

        modal: {

          ondismiss:
            function () {

              toast.error(
                "Payment Cancelled"
              );

              setLoading(false);
            },
        },

        prefill: {

          name,

          email,

          contact: phone,
        },

        theme: {
          color: "#eab308",
        },
      };

      const razor = new (
        window as any
      ).Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

      toast.error(
        "Payment Failed"
      );

      setLoading(false);
    }
  }

  return (

    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        <h1 className="text-5xl font-black text-yellow-400 mb-14">

          Secure Checkout 💳

        </h1>

        {cartItems.length === 0 ? (

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-16 text-center">

            <h2 className="text-4xl font-black">

              Your Cart is Empty

            </h2>

            <p className="text-zinc-400 mt-5 text-lg">

              Add products before checkout.

            </p>

            <Link href="/">

              <button className="mt-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-10 py-4 rounded-2xl font-black hover:scale-105 transition">

                Explore Products

              </button>

            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-[1fr_420px] gap-10">

            {/* LEFT */}

            <div className="space-y-10">

              {/* CUSTOMER INFO */}

              <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

                <h2 className="text-3xl font-black mb-8">

                  Customer Details

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                  />

                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full mt-6 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                />

              </div>

              {/* PRODUCTS */}

              <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8">

                <h2 className="text-3xl font-black mb-8">

                  Order Items

                </h2>

                <div className="space-y-6">

                  {cartItems.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b border-zinc-800 pb-5"
                      >

                        <div>

                          <h2 className="text-2xl font-bold">

                            {item.title}

                          </h2>

                          <p className="text-zinc-400 mt-2">

                            Quantity:
                            {" "}
                            {
                              item.quantity
                            }

                          </p>

                        </div>

                        <h2 className="text-2xl font-black text-yellow-400">

                          ₹
                          {Number(
                            item.price
                          ) *
                            item.quantity}

                        </h2>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 h-fit sticky top-28">

              <h2 className="text-3xl font-black mb-8">

                Payment Summary

              </h2>

              {/* COUPON */}

              <div>

                <label className="text-zinc-400 block mb-3">

                  Coupon Code

                </label>

                <input
                  type="text"
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) =>
                    setCoupon(
                      e.target.value
                    )
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-500"
                />

                {coupon.toLowerCase() ===
                  "premium10" && (

                  <p className="text-green-400 font-bold mt-3">

                    10% Discount Applied 🎉

                  </p>

                )}

              </div>

              {/* TOTALS */}

              <div className="space-y-5 mt-10 border-t border-zinc-800 pt-8">

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

                <div className="flex justify-between text-3xl font-black text-yellow-400 border-t border-zinc-800 pt-6">

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

              {/* SECURITY */}

              <div className="space-y-5 mt-10">

                <div className="flex items-center gap-4 bg-zinc-800 rounded-2xl p-5">

                  <ShieldCheck className="text-green-400" />

                  <div>

                    <h3 className="font-bold">

                      Secure Payments

                    </h3>

                    <p className="text-zinc-400 text-sm mt-1">

                      100% protected checkout

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4 bg-zinc-800 rounded-2xl p-5">

                  <Lock className="text-yellow-400" />

                  <div>

                    <h3 className="font-bold">

                      Encrypted Data

                    </h3>

                    <p className="text-zinc-400 text-sm mt-1">

                      Your data stays secure

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4 bg-zinc-800 rounded-2xl p-5">

                  <CheckCircle2 className="text-green-400" />

                  <div>

                    <h3 className="font-bold">

                      Instant Delivery

                    </h3>

                    <p className="text-zinc-400 text-sm mt-1">

                      Access immediately after payment

                    </p>

                  </div>

                </div>

              </div>

              {/* PAY BUTTON */}

              <button
                onClick={
                  handlePayment
                }
                disabled={loading}
                className="w-full mt-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-5 rounded-2xl text-lg font-black hover:scale-[1.02] transition-all duration-300 shadow-[0_0_25px_rgba(255,215,0,0.25)] disabled:opacity-50 flex items-center justify-center gap-3"
              >

                <CreditCard size={22} />

                {loading
                  ? "Processing..."
                  : "Pay Now"}

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}