"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Boxes,
  CreditCard,
  Plus,
  ShoppingBag,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  kpiData,
  products,
  recentTransactions,
  salesChartData,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const kpis = [
  {
    label: "Today's Sales",
    value: kpiData.todaySales,
    change: "+12.4%",
    up: true,
    icon: TrendingUp,
    tint: "from-emerald-500/15 to-emerald-500/0",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Purchases",
    value: kpiData.purchases,
    change: "+8.1%",
    up: true,
    icon: ShoppingBag,
    tint: "from-sky-500/15 to-sky-500/0",
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    label: "Cash Position",
    value: kpiData.cashPosition,
    change: "+3.2%",
    up: true,
    icon: Wallet,
    tint: "from-teal-500/15 to-teal-500/0",
    iconBg: "bg-teal-100 text-teal-700",
  },
  {
    label: "Customer Receivables",
    value: kpiData.receivables,
    change: "+5.6%",
    up: true,
    icon: Users,
    tint: "from-amber-500/15 to-amber-500/0",
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    label: "Supplier Payables",
    value: kpiData.payables,
    change: "-2.1%",
    up: false,
    icon: CreditCard,
    tint: "from-rose-500/15 to-rose-500/0",
    iconBg: "bg-rose-100 text-rose-700",
  },
];

const quickActions = [
  { href: "/pos", label: "New Sale", icon: Plus, color: "bg-emerald-600" },
  { href: "/purchases", label: "Add Purchase", icon: ShoppingBag, color: "bg-sky-600" },
  { href: "/customers", label: "Receive Payment", icon: Banknote, color: "bg-teal-600" },
  { href: "/inventory", label: "Check Stock", icon: Boxes, color: "bg-navy" },
];

export default function DashboardPage() {
  const lowStock = products.filter((p) => p.stock <= p.minStock);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold tracking-tight text-navy">
            Good evening, Owner
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Saturday, 29 Aug 2026 · Today&apos;s wholesale snapshot
          </p>
        </div>
        <Link
          href="/pos"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 btn-press"
        >
          <ShoppingBag className="h-4 w-4" />
          Open POS
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className={cn(
                "kpi-shine card-surface relative overflow-hidden p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] animate-fade-up",
                `stagger-${i + 1}`,
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br",
                  kpi.tint,
                )}
              />
              <div className="relative flex items-start justify-between">
                <div className={cn("rounded-xl p-2", kpi.iconBg)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                    kpi.up
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-600",
                  )}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {kpi.change}
                </span>
              </div>
              <p className="relative mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {kpi.label}
              </p>
              <p className="relative mt-1 font-[family-name:var(--font-outfit)] text-xl font-bold text-navy">
                {formatCurrency(kpi.value)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card-surface p-5 xl:col-span-2 animate-fade-up">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
                Sales & Purchases
              </h2>
              <p className="text-xs text-slate-500">Last 7 days performance</p>
            </div>
            <div className="flex gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Sales
              </span>
              <span className="flex items-center gap-1.5 text-sky-700">
                <span className="h-2 w-2 rounded-full bg-sky-500" /> Purchases
              </span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="purchFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 24px rgba(11,31,51,0.08)",
                  }}
                  formatter={(value) => formatCurrency(Number(value ?? 0))}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#059669"
                  strokeWidth={2.5}
                  fill="url(#salesFill)"
                />
                <Area
                  type="monotone"
                  dataKey="purchases"
                  stroke="#0284c7"
                  strokeWidth={2}
                  fill="url(#purchFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface p-5 animate-fade-up stagger-2">
            <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
              Quick Actions
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md"
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition group-hover:scale-105",
                        action.color,
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-navy">
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="card-surface p-5 animate-fade-up stagger-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
                Low Stock Alerts
              </h2>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                {lowStock.length} items
              </span>
            </div>
            <div className="space-y-2.5">
              {lowStock.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50/50 px-3 py-2.5"
                >
                  <span className="text-lg">{p.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy">
                      {p.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {p.stock} {p.unit} left · min {p.minStock}
                    </p>
                  </div>
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-surface overflow-hidden animate-fade-up stagger-4">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
              Recent Transactions
            </h2>
            <p className="text-xs text-slate-500">Latest counter activity today</p>
          </div>
          <Link
            href="/reports"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-500"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Invoice</th>
                <th className="px-5 py-3 font-semibold">Time</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Method</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-t border-slate-100 transition hover:bg-emerald-50/40"
                >
                  <td className="px-5 py-3.5 font-semibold text-navy">{tx.id}</td>
                  <td className="px-5 py-3.5 text-slate-500">{tx.time}</td>
                  <td className="px-5 py-3.5 text-slate-700">{tx.customer}</td>
                  <td className="px-5 py-3.5 text-slate-500">{tx.items}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        tx.method === "Cash" && "bg-emerald-50 text-emerald-700",
                        tx.method === "Credit" && "bg-amber-50 text-amber-700",
                        tx.method === "Partial" && "bg-sky-50 text-sky-700",
                      )}
                    >
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-navy">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
