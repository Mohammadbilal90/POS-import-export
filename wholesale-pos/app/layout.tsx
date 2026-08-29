import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { DemoProvider } from "@/lib/demo-context";
import { ToastHost } from "@/components/ui/ToastHost";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WholesalePOS — Wholesale Shop Management & POS",
  description:
    "Premium demo of WholesalePOS: counter billing, inventory, credit ledgers, cash management and reports for wholesale shops.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-foreground">
        <DemoProvider>
          {children}
          <ToastHost />
        </DemoProvider>
      </body>
    </html>
  );
}
