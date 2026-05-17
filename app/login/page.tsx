"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Link from "next/link";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {

    if (!email || !password) {

      toast.error(
        "Enter email and password"
      );

      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth
        .signInWithPassword({
          email,
          password,
        });

    setLoading(false);

    if (error) {

      toast.error(error.message);

    } else {

      localStorage.setItem(
        "userEmail",
        email
      );

      toast.success(
        "Login Successful!"
      );

      if (
        email.trim().toLowerCase() ===
        "premiumhubbindia@gmail.com"
      ) {

        router.push("/admin");

      } else {

        router.push("/");
      }
    }
  }

  async function handleForgotPassword() {

    if (!email) {

      toast.error(
        "Enter your email first"
      );

      return;
    }

    const { error } =
      await supabase.auth
        .resetPasswordForEmail(
          email,
          {
            redirectTo:
              "http://localhost:3000/reset-password",
          }
        );

    if (error) {

      toast.error(error.message);

    } else {

      toast.success(
        "Password reset email sent!"
      );
    }
  }

  return (

    <div className="bg-black text-white min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.08)]">

        <h1 className="text-4xl font-black text-yellow-400 mb-2">

          Welcome Back

        </h1>

        <p className="text-zinc-400 mb-8">

          Login to continue
          your premium experience.

        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-4 rounded-2xl bg-zinc-800 mb-4 outline-none border border-transparent focus:border-yellow-500"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-4 rounded-2xl bg-zinc-800 mb-4 outline-none border border-transparent focus:border-yellow-500"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition disabled:opacity-50"
        >

          {loading
            ? "Logging In..."
            : "Login"}

        </button>

        <button
          onClick={
            handleForgotPassword
          }
          className="mt-5 text-yellow-400 hover:underline text-sm"
        >

          Forgot Password?

        </button>

        <div className="mt-8 text-center text-zinc-400">

          Don’t have an account?

          <Link
            href="/signup"
            className="text-yellow-400 ml-2 hover:underline"
          >

            Signup

          </Link>

        </div>

      </div>

    </div>
  );
}