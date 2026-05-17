"use client";

import Link from "next/link";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {

  return (

    <Link
      href="https://wa.me/918764357898"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition hover:scale-110"
    >

      <FaWhatsapp size={32} />

    </Link>

  );
}