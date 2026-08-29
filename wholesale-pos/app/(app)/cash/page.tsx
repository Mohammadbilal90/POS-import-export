"use client";

import { useState } from "react";
import {
  Calculator,
  Minus,
  Plus,
  Equal,
  CircleDollarSign,
} from "lucide-react";
import { cashSummary, expensesList } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn, formatCurrency } from "@/lib/utils";

export default function CashPage() {
  const { pushToast } = useDemo();
  const [actual, setActual] = useState(String(cashSummary.actualCash));
  const actualNum = Number(actual) || 0;
  const difference = actualNum - cashSummary.expectedClosing;

  const rows = [
    {
      label: "Opening Cash",
      amount: cashSummary.opening,
      tone: "neutral" as const,
      icon: CircleDollarSign,
    },
    {
      label: "+ Cash Sales",
      amount: cashSummary.cashSales,
      tone: "in" as const,
      icon: Plus,
    },
    {
      label: "+ Customer Payments",
      amount: cashSummary.customerPayments,
      tone: "in" as const,
      icon: Plus,
    },
    {
      label: "− Supplier Payments",
      amount: cashSummary.supplierPayments,
      tone: "out" as const,
      icon: Minus,
    },
    {
      label: "− Expenses",
      amount: cashSummary.expenses,
      tone: "out" as const,
      icon: Minus,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
            Cash & Expenses
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Daily cash reconciliation for the counter
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            pushToast({
              type: "success",
              title: "Day closed",
              description: `Difference recorded: ${formatCurrency(difference)}`,
            })
          }
          className="btn-press rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-soft"
        >
          Close Day
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="card-surface overflow-hidden xl:col-span-2">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-emerald-600" />
              <h2 className="font-[family-name:var(--font-outfit)] text-lg font-bold text-navy">
                Daily Cash Summary
              </h2>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-slate-50/70"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl",
                        row.tone === "in" && "bg-emerald-50 text-emerald-600",
                        row.tone === "out" && "bg-rose-50 text-rose-600",
                        row.tone === "neutral" && "bg-slate-100 text-slate-600",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-navy">{row.label}</span>
                  </div>
                  <span
                    className={cn(
                      "font-[family-name:var(--font-outfit)] text-base font-bold",
                      row.tone === "in" && "text-emerald-700",
                      row.tone === "out" && "text-rose-600",
                      row.tone === "neutral" && "text-navy",
                    )}
                  >
                    {row.tone === "out" ? "−" : row.tone === "in" ? "+" : ""}
                    {formatCurrency(row.amount).replace("Rs. ", "Rs. ")}
                  </span>
                </div>
              );
            })}
            <div className="flex items-center justify-between bg-emerald-50/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Equal className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-navy">
                  = Expected Closing Cash
                </span>
              </div>
              <span className="font-[family-name:var(--font-outfit)] text-xl font-bold text-emerald-800">
                {formatCurrency(cashSummary.expectedClosing)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Actual Counted Cash
            </p>
            <input
              type="number"
              value={actual}
              onChange={(e) => setActual(e.target.value)}
              className="mt-3 h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
            <div
              className={cn(
                "mt-4 rounded-2xl p-4",
                difference === 0
                  ? "bg-emerald-50"
                  : difference < 0
                    ? "bg-rose-50"
                    : "bg-sky-50",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Difference (Short / Over)
              </p>
              <p
                className={cn(
                  "mt-1 font-[family-name:var(--font-outfit)] text-2xl font-bold",
                  difference === 0 && "text-emerald-700",
                  difference < 0 && "text-rose-600",
                  difference > 0 && "text-sky-700",
                )}
              >
                {difference === 0
                  ? "Rs. 0 · Balanced"
                  : formatCurrency(difference)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {difference < 0
                  ? "Cash short vs expected closing"
                  : difference > 0
                    ? "Cash over vs expected closing"
                    : "Drawer matches the books"}
              </p>
            </div>
          </div>

          <div className="card-surface overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-3">
              <h3 className="font-semibold text-navy">Today&apos;s Expenses</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {expensesList.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div>
                    <p className="text-sm font-medium text-navy">{e.label}</p>
                    <p className="text-xs text-slate-400">{e.time}</p>
                  </div>
                  <p className="text-sm font-semibold text-rose-600">
                    −{formatCurrency(e.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
