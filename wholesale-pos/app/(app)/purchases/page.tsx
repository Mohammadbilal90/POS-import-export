"use client";

import { Plus } from "lucide-react";
import { purchasesList } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn, formatCurrency } from "@/lib/utils";

export default function PurchasesPage() {
  const { pushToast } = useDemo();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
            Purchases / Intake
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Supplier purchases with stock increase and payment status
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            pushToast({
              type: "info",
              title: "Demo mode",
              description: "New purchase entry is preview-only in this demo.",
            })
          }
          className="btn-press inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
        >
          <Plus className="h-4 w-4" />
          New Purchase
        </button>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Purchase #</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Supplier</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Payment</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchasesList.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-slate-100 transition hover:bg-sky-50/40"
                >
                  <td className="px-5 py-3.5 font-semibold text-navy">{p.id}</td>
                  <td className="px-5 py-3.5 text-slate-500">{p.date}</td>
                  <td className="px-5 py-3.5 text-slate-700">{p.supplier}</td>
                  <td className="px-5 py-3.5 text-slate-500">{p.items}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        p.payment === "Cash" && "bg-emerald-50 text-emerald-700",
                        p.payment === "Credit" && "bg-amber-50 text-amber-700",
                        p.payment === "Partial" && "bg-sky-50 text-sky-700",
                      )}
                    >
                      {p.payment}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-navy">
                    {formatCurrency(p.total)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {p.status}
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
