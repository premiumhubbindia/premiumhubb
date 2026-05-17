"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Link from "next/link";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSignup() {

    if (
      !name ||
      !phone ||
      !city ||
      !email ||
      !password
    ) {

      toast.error(
        "Fill all fields"
      );

      return;
    }

    if (password.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {

      toast.error(error.message);

      setLoading(false);

      return;
    }

    const user = data.user;

    if (user) {

      const { error: userError } =
        await supabase
          .from("users")
          .insert([
            {
              id: user.id,
              name,
              phone,
              city,
              email,
            },
          ]);

      if (userError) {

        toast.error(
          userError.message
        );

        setLoading(false);

        return;
      }

      localStorage.setItem(
        "userEmail",
        email
      );

      toast.success(
        "Signup Successful!"
      );

      setTimeout(() => {

        router.push("/");

      }, 1500);
    }

    setLoading(false);
  }

  return (

    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.08)]">

        <h1 className="text-4xl font-black text-yellow-400 mb-3">

          Create Account

        </h1>

        <p className="text-zinc-400 mb-8">

          Join PremiumHubb and
          unlock premium subscriptions.

        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-transparent focus:border-yellow-500 outline-none mb-4"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-transparent focus:border-yellow-500 outline-none mb-4"
        />

        <input
          type="text"
          placeholder="City / State"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-transparent focus:border-yellow-500 outline-none mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-transparent focus:border-yellow-500 outline-none mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-transparent focus:border-yellow-500 outline-none mb-6"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition disabled:opacity-50"
        >

          {loading
            ? "Creating Account..."
            : "Sign Up"}

        </button>

        <div className="mt-8 text-center text-zinc-400">

          Already have an account?

          <Link
            href="/login"
            className="text-yellow-400 ml-2 hover:underline"
          >

            Login

          </Link>

        </div>

      </div>

    </div>
  );
}