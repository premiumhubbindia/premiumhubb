"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import {
  Menu,
  X,
  ShoppingCart,
  Package,
  Headphones,
  LogOut,
  User,
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [cartCount, setCartCount] =
    useState(0);

  const pathname =
    usePathname();

  useEffect(() => {

    checkUser();

    updateCartCount();

    window.addEventListener(
      "storage",
      updateCartCount
    );

    return () => {

      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };

  }, []);

  async function checkUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setLoggedIn(!!user);

    setLoading(false);
  }

  function updateCartCount() {

    const cart = JSON.parse(
      localStorage.getItem(
        "cart"
      ) || "[]"
    );

    const total =
      cart.reduce(
        (
          acc: number,
          item: any
        ) =>
          acc + item.quantity,
        0
      );

    setCartCount(total);
  }

  async function handleLogout() {

    await supabase.auth.signOut();

    localStorage.removeItem(
      "userEmail"
    );

    toast.success(
      "Logged Out Successfully!"
    );

    setTimeout(() => {

      window.location.href =
        "/";

    }, 1000);
  }

  return (

    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-yellow-500/10">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">

        {/* LOGO */}

        <Link
          href="/"
          className="text-3xl font-black tracking-wide text-yellow-400 hover:scale-105 transition"
        >

          PremiumHubb

        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">

          <Link
            href="/"
            className={`hover:text-yellow-400 transition ${
              pathname === "/"
                ? "text-yellow-400"
                : ""
            }`}
          >

            Home

          </Link>

          <Link
            href="/cart"
            className={`relative hover:text-yellow-400 transition flex items-center gap-2 ${
              pathname === "/cart"
                ? "text-yellow-400"
                : ""
            }`}
          >

            <ShoppingCart size={18} />

            Cart

            {cartCount > 0 && (

              <span className="absolute -top-3 -right-4 bg-yellow-400 text-black text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">

                {cartCount}

              </span>

            )}

          </Link>

          <Link
            href="/orders"
            className={`hover:text-yellow-400 transition flex items-center gap-2 ${
              pathname === "/orders"
                ? "text-yellow-400"
                : ""
            }`}
          >

            <Package size={18} />

            Orders

          </Link>

          <Link
            href="/support"
            className={`hover:text-yellow-400 transition flex items-center gap-2 ${
              pathname === "/support"
                ? "text-yellow-400"
                : ""
            }`}
          >

            <Headphones size={18} />

            Support

          </Link>

          {!loading && !loggedIn ? (

            <>

              <Link
                href="/login"
                className={`hover:text-yellow-400 transition flex items-center gap-2 ${
                  pathname === "/login"
                    ? "text-yellow-400"
                    : ""
                }`}
              >

                <User size={18} />

                Login

              </Link>

              <Link
                href="/signup"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-5 py-2.5 rounded-xl font-black hover:scale-105 transition shadow-[0_0_20px_rgba(255,215,0,0.25)]"
              >

                Signup

              </Link>

            </>

          ) : (

            !loading && (

              <div className="flex items-center gap-5">

                {localStorage.getItem(
                  "userEmail"
                ) ===
                  "premiumhubbindia@gmail.com" && (

                  <Link
                    href="/admin"
                    className={`hover:text-yellow-400 transition flex items-center gap-2 ${
                      pathname === "/admin"
                        ? "text-yellow-400"
                        : ""
                    }`}
                  >

                    <ShieldCheck size={18} />

                    Admin

                  </Link>

                )}

                <button
                  onClick={
                    handleLogout
                  }
                  className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )

          )}

        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="md:hidden text-yellow-400"
        >

          {menuOpen
            ? <X size={30} />
            : <Menu size={30} />
          }

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden bg-zinc-950 border-t border-yellow-500/10 px-6 py-6 space-y-5 text-lg">

          <Link
            href="/"
            className={`flex items-center gap-3 hover:text-yellow-400 ${
              pathname === "/"
                ? "text-yellow-400"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(false)
            }
          >

            Home

          </Link>

          <Link
            href="/cart"
            className={`flex items-center gap-3 hover:text-yellow-400 ${
              pathname === "/cart"
                ? "text-yellow-400"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <ShoppingCart size={20} />

            Cart

            {cartCount > 0 && (

              <span className="bg-yellow-400 text-black text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">

                {cartCount}

              </span>

            )}

          </Link>

          <Link
            href="/orders"
            className={`flex items-center gap-3 hover:text-yellow-400 ${
              pathname === "/orders"
                ? "text-yellow-400"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <Package size={20} />

            Orders

          </Link>

          <Link
            href="/support"
            className={`flex items-center gap-3 hover:text-yellow-400 ${
              pathname === "/support"
                ? "text-yellow-400"
                : ""
            }`}
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <Headphones size={20} />

            Support

          </Link>

          {!loading && !loggedIn ? (

            <>

              <Link
                href="/login"
                className={`flex items-center gap-3 hover:text-yellow-400 ${
                  pathname === "/login"
                    ? "text-yellow-400"
                    : ""
                }`}
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <User size={20} />

                Login

              </Link>

              <Link
                href="/signup"
                className="block bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-5 py-3 rounded-xl font-black text-center"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                Signup

              </Link>

            </>

          ) : (

            !loading && (

              <>

                {localStorage.getItem(
                  "userEmail"
                ) ===
                  "premiumhubbindia@gmail.com" && (

                  <Link
                    href="/admin"
                    className="flex items-center gap-3 hover:text-yellow-400"
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                  >

                    <ShieldCheck size={20} />

                    Admin

                  </Link>

                )}

                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold flex items-center justify-center gap-3"
                >

                  <LogOut size={20} />

                  Logout

                </button>

              </>

            )

          )}

        </div>

      )}

    </nav>
  );
}