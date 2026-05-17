"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Link from "next/link";

export default function ResetPasswordPage() {

  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleResetPassword() {

    if (!password) {

      toast.error(
        "Enter a new password"
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

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (error) {

      toast.error(error.message);

    } else {

      toast.success(
        "Password updated successfully!"
      );

      setTimeout(() => {

        router.push("/login");

      }, 1500);
    }
  }

  return (

    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(255,215,0,0.08)]">

        <h1 className="text-4xl font-black text-yellow-400 mb-3">

          Reset Password

        </h1>

        <p className="text-zinc-400 mb-8">

          Enter your new password
          to continue.

        </p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full p-4 rounded-2xl bg-zinc-800 border border-transparent focus:border-yellow-500 outline-none mb-6"
        />

        <button
          onClick={
            handleResetPassword
          }
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition disabled:opacity-50"
        >

          {loading
            ? "Updating..."
            : "Update Password"}

        </button>

        <div className="mt-8 text-center text-zinc-400">

          Remembered your password?

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