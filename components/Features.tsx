import {
  ShieldCheck,
  Zap,
  Headphones,
  CreditCard,
  Rocket,
  Crown,
} from "lucide-react";

export default function Features() {

  const features = [
    {
      title: "Instant Access",
      description:
        "Get your premium accounts instantly after successful payment.",
      icon: Rocket,
    },

    {
      title: "Lowest Prices",
      description:
        "Affordable premium subscriptions with best market pricing.",
      icon: Zap,
    },

    {
      title: "24/7 Support",
      description:
        "Dedicated support team ready to help you anytime.",
      icon: Headphones,
    },

    {
      title: "Secure Payments",
      description:
        "Protected and trusted payment methods for safe transactions.",
      icon: CreditCard,
    },

    {
      title: "Premium Accounts",
      description:
        "Verified high-quality subscriptions with premium experience.",
      icon: Crown,
    },

    {
      title: "Trusted Platform",
      description:
        "Trusted by thousands of happy customers across India.",
      icon: ShieldCheck,
    },
  ];

  return (

    <section className="px-6 md:px-16 py-24">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-6">

            Why Customers Love Us

          </div>

          <h2 className="text-5xl md:text-6xl font-black">

            Why Choose
            <span className="text-yellow-400">
              {" "}
              PremiumHubb
            </span>

          </h2>

          <p className="text-zinc-400 text-lg mt-6 max-w-3xl mx-auto">

            Experience premium digital subscriptions
            with trusted delivery, secure payments,
            and 24/7 customer support.

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map(
            (feature, index) => {

              const Icon =
                feature.icon;

              return (

                <div
                  key={index}
                  className="group bg-zinc-900 border border-yellow-500/10 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(255,215,0,0.12)]"
                >

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,215,0,0.25)]">

                    <Icon className="text-black w-8 h-8" />

                  </div>

                  <h3 className="text-2xl font-black">

                    {feature.title}

                  </h3>

                  <p className="text-zinc-400 mt-5 leading-7">

                    {
                      feature.description
                    }

                  </p>

                </div>

              );
            }
          )}

        </div>

      </div>

    </section>
  );
}