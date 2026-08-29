"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Shield,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useDemo } from "@/lib/demo-context";
import type { Role } from "@/lib/data";
import { cn } from "@/lib/utils";

const roles: {
  id: Role;
  title: string;
  subtitle: string;
  points: string[];
  icon: typeof Shield;
  accent: string;
}[] = [
  {
    id: "admin",
    title: "Admin / Owner",
    subtitle: "Full business control",
    points: [
      "Dashboard & KPIs",
      "Purchases & inventory",
      "Cash, reports & settings",
    ],
    icon: Shield,
    accent: "from-emerald-500/15 to-teal-500/5",
  },
  {
    id: "cashier",
    title: "Cashier",
    subtitle: "Fast counter operations",
    points: ["POS / New Sale", "Customer payments", "Limited sales access"],
    icon: ShoppingCart,
    accent: "from-sky-500/15 to-indigo-500/5",
  },
];

export default function LoginPage() {
  const { enterDemo, pushToast } = useDemo();
  const router = useRouter();
  const [selected, setSelected] = useState<Role>("admin");
  const [entering, setEntering] = useState(false);

  function handleEnter() {
    setEntering(true);
    enterDemo(selected);
    pushToast({
      type: "success",
      title: "Demo session started",
      description:
        selected === "admin"
          ? "Signed in as Admin / Owner"
          : "Signed in as Cashier",
    });
    router.push(selected === "cashier" ? "/pos" : "/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eef2f6]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -right-20 top-24 h-[28rem] w-[28rem] rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(11,31,51,0.08) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-12 sm:px-8">
        <div className="mb-10 flex flex-col items-center text-center animate-fade-up">
          <Logo size="lg" className="justify-center" />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive Client Demo · V1 Single Shop
          </div>
          <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-outfit)] text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Welcome to your wholesale
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              command center
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-500">
            Digitize counter sales, stock, credit ledgers and daily cash — built
            for ketchup, khoya, rabri and everyday wholesale counter work.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const active = selected === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelected(role.id)}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 animate-fade-up btn-press",
                  `stagger-${index + 1}`,
                  active
                    ? "border-emerald-400 bg-white shadow-[var(--shadow-lg)] ring-2 ring-emerald-500/20"
                    : "border-white/80 bg-white/60 shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white hover:shadow-[var(--shadow-md)]",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition group-hover:opacity-100",
                    role.accent,
                    active && "opacity-100",
                  )}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition",
                        active
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                          : "bg-slate-100 text-navy group-hover:bg-emerald-50 group-hover:text-emerald-700",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    {active ? (
                      <BadgeCheck className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <span className="rounded-full border border-slate-200 bg-white/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Select
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-xl font-bold text-navy">
                    {role.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">{role.subtitle}</p>
                  <ul className="mt-4 space-y-1.5">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col items-center gap-3 animate-fade-up stagger-3">
          <button
            type="button"
            onClick={handleEnter}
            disabled={entering}
            className="group relative flex h-14 w-full max-w-md items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold text-white shadow-xl shadow-emerald-600/25 transition hover:brightness-105 btn-press disabled:opacity-70"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />
            {entering ? "Entering demo…" : "Enter Demo"}
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
          </button>
          <p className="text-xs text-slate-400">
            No password required — sample data for client presentation
          </p>
        </div>
      </div>
    </div>
  );
}
