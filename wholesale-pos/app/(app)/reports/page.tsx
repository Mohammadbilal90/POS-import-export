"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  cashVsCreditData,
  kpiData,
  productSalesData,
  products,
  salesChartData,
} from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const PIE_COLORS = ["#059669", "#d97706", "#0284c7"];

export default function ReportsPage() {
  const [range, setRange] = useState<"week" | "month">("week");
  const lowStock = products.filter((p) => p.stock <= p.minStock).length;
  const inventoryValue = products.reduce((s, p) => s + p.stock * p.cost, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
            Reports & Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sales, cash mix, inventory and ledger overview
          </p>
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-white p-1">
          {(
            [
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
            ] as const
          ).map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition",
                range === r.id
                  ? "bg-navy text-white"
                  : "text-slate-500 hover:text-navy",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Gross Sales", value: kpiData.todaySales, hint: "Today" },
          { label: "Receivables", value: kpiData.receivables, hint: "Open credit" },
          { label: "Payables", value: kpiData.payables, hint: "Supplier dues" },
          { label: "Inventory Value", value: inventoryValue, hint: "At cost" },
        ].map((card, i) => (
          <div
            key={card.label}
            className={cn(
              "card-surface p-4 animate-fade-up",
              `stagger-${i + 1}`,
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {card.label}
            </p>
            <p className="mt-2 font-[family-name:var(--font-outfit)] text-xl font-bold text-navy">
              {formatCurrency(card.value)}
            </p>
            <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card-surface p-5 xl:col-span-2">
          <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
            Sales Trend
          </h2>
          <p className="text-xs text-slate-500">Daily sales for the selected range</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} />
                <Bar dataKey="sales" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
            Cash vs Credit
          </h2>
          <p className="text-xs text-slate-500">Today&apos;s payment mix</p>
          <div className="mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cashVsCreditData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={78}
                  paddingAngle={3}
                >
                  {cashVsCreditData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _n, item) => [
                    `${value}% · ${formatCurrency(Number(item?.payload?.amount ?? 0))}`,
                    String(item?.payload?.name ?? ""),
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {cashVsCreditData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: PIE_COLORS[i] }}
                  />
                  {d.name}
                </span>
                <span className="font-semibold text-navy">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card-surface p-5 xl:col-span-2">
          <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
            Product Sales
          </h2>
          <p className="text-xs text-slate-500">Top movers this week</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productSalesData} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  tick={{ fill: "#475569", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip formatter={(v) => formatCurrency(Number(v ?? 0))} />
                <Bar dataKey="sales" fill="#0d9488" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface p-5">
            <h3 className="font-semibold text-navy">Inventory Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">SKUs tracked</span>
                <span className="font-semibold text-navy">{products.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Low stock alerts</span>
                <span className="font-semibold text-amber-700">{lowStock}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stock value (cost)</span>
                <span className="font-semibold text-navy">
                  {formatCurrency(inventoryValue)}
                </span>
              </div>
            </div>
          </div>
          <div className="card-surface p-5">
            <h3 className="font-semibold text-navy">Ledgers Snapshot</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-amber-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Receivables
                </p>
                <p className="mt-1 font-[family-name:var(--font-outfit)] text-xl font-bold text-amber-900">
                  {formatCurrency(kpiData.receivables)}
                </p>
              </div>
              <div className="rounded-xl bg-rose-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                  Payables
                </p>
                <p className="mt-1 font-[family-name:var(--font-outfit)] text-xl font-bold text-rose-900">
                  {formatCurrency(kpiData.payables)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
