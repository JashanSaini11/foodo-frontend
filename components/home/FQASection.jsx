"use client";

import { useState } from "react";      

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
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-light">
      <button
        className="w-full flex items-center justify-between py-6 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-body font-semibold text-[20px] text-text-heading">
          {q}
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <p className="font-body text-[18px] text-text-body pb-6 leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="bg-bg-page py-[47px] px-[105px]">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-[59px] items-center">
        <h2 className="font-display text-[60px] leading-[95px] text-primary whitespace-nowrap">
          Frequently Asked Questions
        </h2>
        <div className="w-full max-w-[880px]">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
