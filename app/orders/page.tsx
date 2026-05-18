"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";

import toast from "react-hot-toast";

import Link from "next/link";

import {
  Package,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  Receipt,
} from "lucide-react";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [filteredOrders, setFilteredOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchOrders();

  }, []);

  useEffect(() => {

    const filtered =
      orders.filter((order) =>

        String(order.id)
          .includes(search)

      );

    setFilteredOrders(filtered);

  }, [search, orders]);

  async function fetchOrders() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      toast.error(
        "Please login first!"
      );

      setLoading(false);

      return;
    }

    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .eq(
          "user_email",
          user.email
        )
        .order("id", {
          ascending: false,
        });

    if (error) {

      toast.error(error.message);

    } else if (data) {

      setOrders(data);

      setFilteredOrders(data);
    }

    setLoading(false);
  }

  function getStatusIcon(
    status: string
  ) {

    if (
      status === "Delivered"
    ) {

      return (
        <CheckCircle2
          className="text-green-400"
          size={24}
        />
      );
    }

    if (
      status === "Cancelled"
    ) {

      return (
        <XCircle
          className="text-red-400"
          size={24}
        />
      );
    }

    return (
      <Clock3
        className="text-yellow-400"
        size={24}
      />
    );
  }

  if (loading) {

    return (

      <div className="bg-black text-white min-h-screen flex items-center justify-center">

        <h1 className="text-4xl font-black text-yellow-400 animate-pulse">

          Loading Orders...

        </h1>

      </div>

    );
  }

  return (

    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-14">

          <div>

            <h1 className="text-5xl font-black text-yellow-400">

              My Orders

            </h1>

            <p className="text-zinc-400 mt-4 text-lg">

              Track your purchases and
              delivery status.

            </p>

          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-[350px]">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search Order ID..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-zinc-900 border border-yellow-500/20 rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-yellow-500"
            />

          </div>

        </div>

        {/* EMPTY */}

        {filteredOrders.length === 0 ? (

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-16 text-center">

            <Package
              size={80}
              className="mx-auto text-yellow-400 mb-8"
            />

            <h2 className="text-4xl font-black">

              No Orders Yet

            </h2>

            <p className="text-zinc-400 mt-5 text-lg">

              Your purchased products
              will appear here.

            </p>

            <Link href="/">

              <button className="mt-10 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-10 py-4 rounded-2xl font-black hover:scale-105 transition">

                Explore Products

              </button>

            </Link>

          </div>

        ) : (

          <div className="space-y-10">

            {filteredOrders.map(
              (order) => (

                <div
                  key={order.id}
                  className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-400 transition"
                >

                  {/* TOP */}

                  <div className="flex flex-col xl:flex-row justify-between gap-10">

                    {/* LEFT */}

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-4">

                        <h2 className="text-3xl font-black text-yellow-400">

                          Order #{order.id}

                        </h2>

<div
  className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-black ${
    order.status ===
    "Delivered"
      ? "bg-green-500/20 text-green-400"
      : order.status ===
        "Cancelled"
      ? "bg-red-500/20 text-red-400"
      : order.status ===
        "Processing"
      ? "bg-blue-500/20 text-blue-400"
      : order.status ===
        "Pending"
      ? "bg-orange-500/20 text-orange-400"
      : "bg-yellow-500/20 text-yellow-400"
  }`}
>

                          {getStatusIcon(
                            order.status
                          )}

                          {order.status}

                        </div>

                      </div>

                      <div className="grid md:grid-cols-3 gap-5 mt-8">

                        <div className="bg-zinc-800 rounded-2xl p-5">

                          <p className="text-zinc-500 text-sm">

                            Total Amount

                          </p>

                          <h3 className="text-3xl font-black text-yellow-400 mt-2">

                            ₹{order.total}

                          </h3>

                        </div>

                        <div className="bg-zinc-800 rounded-2xl p-5">

                          <p className="text-zinc-500 text-sm">

                            Payment ID

                          </p>

                          <h3 className="text-lg font-bold text-white mt-2 break-all">

                            {order.payment_id ||
                              "N/A"}

                          </h3>

                        </div>

                        <div className="bg-zinc-800 rounded-2xl p-5">

                          <p className="text-zinc-500 text-sm">

                            Delivery

                          </p>

                          <h3 className="text-lg font-bold text-green-400 mt-2">

                            Instant Access

                          </h3>

                        </div>

                      </div>

                      {/* PRODUCTS */}

                      <div className="mt-10">

                        <h3 className="text-2xl font-black mb-6">

                          Products

                        </h3>

                        <div className="space-y-5">

                          {Array.isArray(
                            order.products
                          ) &&
                            order.products.map(
                              (
                                item: any,
                                index: number
                              ) => (

                                <div
                                  key={index}
                                  className="bg-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-5"
                                >

                                  <div>

                                    <h4 className="text-xl font-black">

                                      {
                                        item.title
                                      }

                                    </h4>

                                    <p className="text-zinc-400 mt-3">

                                      Quantity:
                                      {" "}
                                      {
                                        item.quantity
                                      }

                                    </p>

                                  </div>

                                  <div className="text-yellow-400 text-2xl font-black">

                                    ₹
                                    {Number(
                                      item.price
                                    ) *
                                      item.quantity}

                                  </div>

                                </div>

                              )
                            )}

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* BOTTOM */}

                  <div className="border-t border-zinc-800 mt-10 pt-8 flex flex-col md:flex-row justify-between gap-5">

                    <div className="flex items-center gap-3 text-zinc-400">

                      <Clock3 size={18} />

                      Status updates are
                      processed automatically.

                    </div>

                    <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-8 py-4 rounded-2xl font-black hover:scale-105 transition">

                      <Receipt size={20} />

                      Download Invoice

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}