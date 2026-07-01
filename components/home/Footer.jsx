import Link from "next/link";
import { FoodoLogo } from "@/assets/icons/index";

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
  { label: "Twitter / X", icon: "🐦", href: "#" },
  { label: "Facebook", icon: "📘", href: "#" },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-text-heading pt-xl pb-lg px-4 sm:px-6 lg:px-2xl"
    >
      <div className="max-w-480 mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-xl mb-12 md:mb-16">
          {/* Brand column */}
          <div className="flex flex-col gap-8 md:gap-lg md:min-w-70 md:max-w-80">
            <div className="flex flex-col gap-4 sm:gap-5">
              <Link
                href="/"
                className="flex items-center gap-2"
                aria-label="Foodo home"
              >
                <FoodoLogo width={40} height={26} fill="#ffffff" />
                <span className="font-display text-[32px] sm:text-h6 text-white leading-none tracking-[-2px]">
                  Foodo
                </span>
              </Link>
              <p className="font-body text-body-sm text-text-placeholder leading-relaxed max-w-[260px]">
                Delivering happiness to your doorstep, one meal at a time.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5 sm:gap-6">
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

          {/* Link columns — 2-col grid on mobile/tablet, 3-col row on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-2xl flex-1 lg:justify-end">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-3 sm:gap-4">
                <p className="font-body font-bold text-mini-lg text-white leading-7">
                  {title}
                </p>
                <nav aria-label={`${title} links`}>
                  <ul className="flex flex-col gap-2 sm:gap-3 list-none p-0 m-0">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="font-body text-body-sm text-text-placeholder hover:text-primary transition-colors"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Copyright bar ────────────────────────────────── */}
        <div className="border-t border-white/10 pt-5 sm:pt-6">
          <p className="font-body text-mini-md text-text-muted text-center">
            © {new Date().getFullYear()} Foodo. All rights reserved. Made with
            ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
