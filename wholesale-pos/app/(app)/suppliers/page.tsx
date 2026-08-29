"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  Phone,
  Wallet,
} from "lucide-react";
import { purchasesList, supplierLedger, suppliers } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn, formatCurrency } from "@/lib/utils";

export default function SuppliersPage() {
  const { pushToast } = useDemo();
  const [selectedId, setSelectedId] = useState(suppliers[0].id);
  const [payAmount, setPayAmount] = useState("");
  const supplier = suppliers.find((s) => s.id === selectedId)!;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
          Suppliers
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Purchases, outstanding payables and payment history
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <div className="card-surface overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Supplier List
            </p>
          </div>
          <div className="space-y-1 p-2">
            {suppliers.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedId(s.id)}
                className={cn(
                  "flex w-full flex-col rounded-xl px-3 py-3 text-left transition",
                  selectedId === s.id
                    ? "bg-sky-50 ring-1 ring-sky-200"
                    : "hover:bg-slate-50",
                )}
              >
                <p className="text-sm font-semibold text-navy">{s.name}</p>
                <p className="mt-0.5 text-xs text-rose-600">
                  Payable {formatCurrency(s.payable)}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-surface p-5 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Supplier Information
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
                {supplier.name}
              </h2>
              <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {supplier.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Partner since {supplier.since}
                </p>
                <p className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {supplier.address}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 p-5 text-white shadow-lg shadow-rose-500/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-100">
                Outstanding Payable
              </p>
              <p className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-bold">
                {formatCurrency(supplier.payable)}
              </p>
              <div className="mt-4">
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder="Payment amount"
                  className="h-10 w-full rounded-xl border-0 bg-white/15 px-3 text-sm text-white placeholder:text-rose-100 outline-none ring-1 ring-white/20"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!payAmount || Number(payAmount) <= 0) {
                      pushToast({ type: "warning", title: "Enter a valid amount" });
                      return;
                    }
                    pushToast({
                      type: "success",
                      title: "Supplier payment recorded",
                      description: `${formatCurrency(Number(payAmount))} to ${supplier.name}`,
                    });
                    setPayAmount("");
                  }}
                  className="btn-press mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-rose-700"
                >
                  <Wallet className="h-4 w-4" />
                  Pay Supplier
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card-surface overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-3">
                <h3 className="font-semibold text-navy">Recent Purchases</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {purchasesList
                  .filter((p) => p.supplier === supplier.name || selectedId === "s1")
                  .slice(0, 4)
                  .map((p) => (
                    <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                      <div>
                        <p className="text-sm font-semibold text-navy">{p.id}</p>
                        <p className="text-xs text-slate-400">
                          {p.date} · {p.items} items · {p.payment}
                        </p>
                      </div>
                      <p className="font-semibold text-navy">{formatCurrency(p.total)}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="card-surface overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-3">
                <h3 className="font-semibold text-navy">Payment History</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {supplierLedger.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 px-5 py-3.5">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg",
                        entry.type === "payment"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-600",
                      )}
                    >
                      {entry.type === "payment" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-navy">
                        {entry.description}
                      </p>
                      <p className="text-xs text-slate-400">{entry.date}</p>
                    </div>
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        entry.type === "payment" ? "text-emerald-700" : "text-rose-600",
                      )}
                    >
                      {entry.type === "payment"
                        ? `−${formatCurrency(entry.debit)}`
                        : `+${formatCurrency(entry.credit)}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
