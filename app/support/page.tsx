"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";

import toast from "react-hot-toast";

export default function SupportPage() {

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<any[]>([]);

  useEffect(() => {

    fetchMessages();

  }, []);

  async function fetchMessages() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } =
      await supabase
        .from("support_messages")
        .select("*")
        .eq(
          "user_email",
          user.email
        )
        .order("id", {
          ascending: false,
        });

    if (!error && data) {

      setMessages(data);
    }
  }

  async function sendMessage() {

    if (!message.trim()) {

      toast.error(
        "Enter your message"
      );

      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } =
      await supabase
        .from("support_messages")
        .insert([
          {
            user_email:
              user?.email ||
              "Guest",

            message,
          },
        ]);

    setLoading(false);

    if (error) {

      toast.error(error.message);

    } else {

      toast.success(
        "Message Sent Successfully!"
      );

      setMessage("");

      fetchMessages();
    }
  }

  return (

    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-24">

        <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(255,215,0,0.08)]">

          <h1 className="text-5xl font-black text-yellow-400 mb-6">

            Support Center

          </h1>

          <p className="text-zinc-400 text-lg leading-8 mb-10">

            Need help with your order,
            subscription, login, or delivery?
            Send your issue and our support
            team will respond as soon as possible.

          </p>

          <textarea
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className="w-full h-56 bg-zinc-800 border border-yellow-500/10 focus:border-yellow-500 rounded-3xl p-6 outline-none resize-none text-lg"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition disabled:opacity-50"
          >

            {loading
              ? "Sending..."
              : "Send Message"}

          </button>

          <div className="mt-10 grid md:grid-cols-2 gap-5">

            <div className="bg-zinc-800 border border-yellow-500/10 rounded-2xl p-5">

              <h3 className="text-yellow-400 font-bold text-xl">

                WhatsApp Support

              </h3>

              <p className="text-zinc-400 mt-2">

                +91 8764357898

              </p>

            </div>

            <div className="bg-zinc-800 border border-yellow-500/10 rounded-2xl p-5">

              <h3 className="text-yellow-400 font-bold text-xl">

                Email Support

              </h3>

              <p className="text-zinc-400 mt-2 break-all">

                help.premiumhubbindia@gmail.com

              </p>

            </div>

          </div>

          {/* PREVIOUS MESSAGES */}

          <div className="mt-10 space-y-6">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className="bg-zinc-800 border border-yellow-500/10 rounded-3xl p-6"
              >

                <h3 className="text-yellow-400 font-bold">

                  Your Message

                </h3>

                <p className="text-zinc-300 mt-3 leading-7">

                  {msg.message}

                </p>

                {msg.admin_reply && (

                  <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 mt-6">

                    <h3 className="text-green-400 font-bold mb-3">

                      Admin Reply

                    </h3>

                    <p className="text-zinc-300 leading-7">

                      {msg.admin_reply}

                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}