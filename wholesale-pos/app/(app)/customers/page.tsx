"use client";

import { useState } from "react";
import {
  Banknote,
  Phone,
  MapPin,
  Calendar,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { customerLedger, customers } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn, formatCurrency } from "@/lib/utils";

export default function CustomersPage() {
  const { pushToast } = useDemo();
  const [selectedId, setSelectedId] = useState(customers[1].id);
  const [tab, setTab] = useState<"ledger" | "payments">("ledger");
  const [payAmount, setPayAmount] = useState("");

  const customer = customers.find((c) => c.id === selectedId)!;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
          Customers & Credit
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Customer profiles, udhaar balances and payment history
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <div className="card-surface overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Customers
            </p>
          </div>
          <div className="max-h-[560px] space-y-1 overflow-y-auto p-2">
            {customers.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                  selectedId === c.id
                    ? "bg-emerald-50 ring-1 ring-emerald-200"
                    : "hover:bg-slate-50",
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy">{c.name}</p>
                  <p className="text-xs text-amber-700">
                    {formatCurrency(c.balance)} due
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-surface relative overflow-hidden p-5 md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-amber-500/10" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Customer Profile
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
                    {customer.name}
                  </h2>
                  <div className="mt-3 space-y-1.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      {customer.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {customer.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Customer since {customer.since}
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-5 text-white shadow-lg shadow-amber-500/25">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">
                    Receivable Balance
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-outfit)] text-3xl font-bold">
                    {formatCurrency(customer.balance)}
                  </p>
                  <p className="mt-1 text-xs text-amber-100">Outstanding credit / udhaar</p>
                </div>
              </div>
            </div>

            <div className="card-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Record Payment
              </p>
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)}
                placeholder="Amount received"
                className="mt-3 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (!payAmount || Number(payAmount) <= 0) {
                    pushToast({
                      type: "warning",
                      title: "Enter a valid amount",
                    });
                    return;
                  }
                  pushToast({
                    type: "success",
                    title: "Payment recorded",
                    description: `${formatCurrency(Number(payAmount))} from ${customer.name}`,
                  });
                  setPayAmount("");
                }}
                className="btn-press mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                <Banknote className="h-4 w-4" />
                Receive Payment
              </button>
            </div>
          </div>

          <div className="card-surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              {(
                [
                  { id: "ledger", label: "Credit Transactions" },
                  { id: "payments", label: "Payment History" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm font-semibold transition",
                    tab === t.id
                      ? "bg-navy text-white"
                      : "text-slate-500 hover:bg-slate-100",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="divide-y divide-slate-100">
              {customerLedger
                .filter((e) =>
                  tab === "payments" ? e.type === "payment" : true,
                )
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-slate-50/80"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl",
                        entry.type === "payment"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600",
                      )}
                    >
                      {entry.type === "payment" ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-navy">
                        {entry.description}
                      </p>
                      <p className="text-xs text-slate-400">{entry.date}</p>
                    </div>
                    <div className="text-right">
                      {entry.debit > 0 ? (
                        <p className="text-sm font-semibold text-amber-700">
                          +{formatCurrency(entry.debit)}
                        </p>
                      ) : (
                        <p className="text-sm font-semibold text-emerald-700">
                          −{formatCurrency(entry.credit)}
                        </p>
                      )}
                      <p className="text-xs text-slate-400">
                        Bal {formatCurrency(entry.balance)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
