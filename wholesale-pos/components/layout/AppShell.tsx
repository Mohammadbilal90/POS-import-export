"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
  ChartColumnIncreasing,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/data";
import { useEffect, type ReactNode } from "react";

const navItems: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: Role[];
}[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    href: "/pos",
    label: "POS / New Sale",
    icon: ShoppingBag,
    roles: ["admin", "cashier"],
  },
  {
    href: "/products",
    label: "Products",
    icon: Package,
    roles: ["admin"],
  },
  {
    href: "/purchases",
    label: "Purchases",
    icon: ClipboardList,
    roles: ["admin"],
  },
  {
    href: "/inventory",
    label: "Inventory",
    icon: Boxes,
    roles: ["admin"],
  },
  {
    href: "/customers",
    label: "Customers",
    icon: Users,
    roles: ["admin", "cashier"],
  },
  {
    href: "/suppliers",
    label: "Suppliers",
    icon: Truck,
    roles: ["admin"],
  },
  {
    href: "/cash",
    label: "Cash & Expenses",
    icon: Wallet,
    roles: ["admin"],
  },
  {
    href: "/reports",
    label: "Reports",
    icon: ChartColumnIncreasing,
    roles: ["admin"],
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    roles: ["admin"],
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { role, ready, exitDemo, pushToast } = useDemo();

  useEffect(() => {
    if (ready && !role) router.replace("/");
  }, [role, ready, router]);

  if (!ready || !role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-slate-500">
        Loading demo…
      </div>
    );
  }

  const visibleNav = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="flex min-h-screen bg-[#eef2f6]">
      <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col border-r border-slate-200/80 bg-navy text-white">
        <div className="border-b border-white/10 px-5 py-5">
          <Logo size="sm" variant="dark" />
          <div className="mt-4 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Signed in as
            </p>
            <p className="text-sm font-semibold text-white">
              {role === "admin" ? "Admin / Owner" : "Cashier"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-900/30"
                    : "text-slate-300 hover:bg-white/8 hover:text-white",
                )}
              >
                <Icon
                  className={cn(
                    "h-4.5 w-4.5 transition",
                    active
                      ? "text-white"
                      : "text-slate-400 group-hover:text-emerald-300",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => {
              exitDemo();
              pushToast({
                type: "info",
                title: "Logged out of demo",
              });
              router.push("/");
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Exit Demo
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              WholesalePOS Demo
            </p>
            <p className="text-sm font-semibold text-navy">
              {visibleNav.find((n) => pathname.startsWith(n.href))?.label ??
                "Workspace"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 sm:block">
              Live demo data · Lahore shop
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-soft text-xs font-bold text-white">
              {role === "admin" ? "AO" : "CS"}
            </div>
          </div>
        </header>
        <main className="page-enter flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
