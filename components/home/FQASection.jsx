const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply enter your delivery location, browse restaurants near you, add your favorite dishes to the cart, and proceed to checkout.",
  },
  {
    q: "Can I track my order in real-time?",
    a: "Yes! Once your order is confirmed, you can track your delivery partner's live location and order status on the app.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major debit/credit cards, UPI, wallets, and cash on delivery in selected areas.",
  },
  {
    q: "How are delivery charges calculated?",
    a: "Delivery fees depend on distance, order value, and time of day. You'll see the exact amount before checkout.",
  },
  {
    q: "What if I need to cancel or modify my order?",
    a: "You can cancel before the restaurant starts preparing your food. Once it's accepted, cancellation may not be possible.",
  },
  {
    q: "How do I become a partner restaurant or delivery person?",
    a: 'Go to the "Partner with Foodo" section on our homepage and fill out the quick registration form — we\'ll get in touch soon!',
  },
];

function FAQItem({ q, a }) {
  return (
    <details className="border-b border-border-light group">
      <summary
        className="
          w-full flex items-center justify-between
          py-4 sm:py-5 lg:py-6
          text-left cursor-pointer list-none
          gap-4
        "
      >
        <span
          className="
          font-body font-semibold text-text-heading
          text-[15px] sm:text-[17px] lg:text-[20px]
          leading-snug
        "
        >
          {q}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <p
        className="
        font-body text-text-body leading-relaxed
        text-[14px] sm:text-[16px] lg:text-[18px]
        pb-4 sm:pb-5 lg:pb-6
      "
      >
        {a}
      </p>
    </details>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────────
export default function FAQSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-bg-page py-10 sm:py-12 lg:py-[47px] px-4 sm:px-6 lg:px-[105px]"
    >
      <div className="max-w-[1920px] mx-auto flex flex-col gap-8 sm:gap-10 lg:gap-[59px] items-center">
        {/* Heading */}
        <h2
          id="faq-heading"
          className="
            font-display text-primary text-center
            text-[32px] leading-tight
            sm:text-[44px] sm:leading-snug
            lg:text-[60px] lg:leading-[95px]
          "
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ list */}
        <div className="w-full max-w-[880px]">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
