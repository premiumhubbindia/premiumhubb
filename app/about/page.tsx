import Navbar from "@/components/Navbar";

export default function AboutPage() {

  return (

    <div className="bg-black text-white min-h-screen">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-24">

        <h1 className="text-5xl font-black text-yellow-400 mb-8">

          About PremiumHubb

        </h1>

        <p className="text-zinc-400 text-lg leading-9">

          PremiumHubb is a trusted premium
          subscription marketplace providing
          OTT, AI tools, music subscriptions,
          creativity tools and social media
          services at affordable pricing.

          We focus on instant delivery,
          secure payments and 24/7 support
          for customers across India.

        </p>

      </div>

    </div>
  );
}