import Link from "next/link";
import {FoodoLogo} from "@/assets/icons/index";

const footerLinks = {
  Product: [
    { label: "Home", href: "/" },
    { label: "Restaurants", href: "/restaurants" },
    { label: "Order Tracking", href: "/orders" },
    { label: "Offers", href: "/offers" },
  ],
  Explore: [
    { label: "Become a Partner", href: "#" },
    { label: "Register Restaurant", href: "#" },
    { label: "Delivery Areas", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

const socialLinks = [
  { label: "Instagram", icon: "📸", href: "#" },
  { label: "Twitter", icon: "🐦", href: "#" },
  { label: "Facebook", icon: "📘", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-text-heading pt-xl pb-lg px-2xl">
      <div className="max-w-480 mx-auto">
        {/* ─── Main grid ────────────────────────────────────── */}
        <div className="flex gap-xl mb-16">
          {/* Brand column */}
          <div className="flex flex-col gap-lg min-w-70">
            <div className="flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-2">
                <FoodoLogo width={48} height={30} fill="#ffffff" />
                <span className="font-display text-h6 text-white leading-none tracking-[-2px]">
                  Foodo
                </span>
              </Link>
              <p className="font-body text-body-sm text-text-placeholder leading-relaxed w-62">
                Delivering happiness to your doorstep, one meal at a time.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-6">
              {socialLinks.map(({ label, icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-text-placeholder hover:text-primary transition-colors text-2xl"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex gap-2xl flex-1 justify-end">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-4">
                <p className="font-body font-bold text-mini-lg text-white leading-7">
                  {title}
                </p>
                <div className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="font-body text-body-sm text-text-placeholder hover:text-primary transition-colors whitespace-nowrap"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Copyright bar ────────────────────────────────── */}
        <div className="border-t border-white/10 pt-6">
          <p className="font-body text-mini-md text-text-muted text-center">
            © {new Date().getFullYear()} Foodo. All rights reserved. Made with
            ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
