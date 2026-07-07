import { Baloo_Bhai_2, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/common/sonner";

const balooBhai = Baloo_Bhai_2({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});


export const metadata = {
  title: "Foodo — Delivering happiness",
  description:
    "Fresh food from the best restaurants in your city, delivered fast and hot.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${balooBhai.variable} ${manrope.variable}  font-body bg-bg-page`}
      >
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-body)",
            },
          }}
        />
      </body>
    </html>
  );
}