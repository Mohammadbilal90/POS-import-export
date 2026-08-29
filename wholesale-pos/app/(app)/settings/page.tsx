"use client";

import { useState } from "react";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { pushToast, role } = useDemo();
  const [shopName, setShopName] = useState("Al-Rehman Wholesale");
  const [receiptFooter, setReceiptFooter] = useState(
    "Thank you for your business · Goods once sold are not returnable",
  );
  const [printAuto, setPrintAuto] = useState(true);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Shop information, receipt defaults and demo preferences
        </p>
      </div>

      <div className="card-surface space-y-5 p-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Shop Name
          </label>
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-medium outline-none focus:border-emerald-400"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Receipt Footer
          </label>
          <textarea
            value={receiptFooter}
            onChange={(e) => setReceiptFooter(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-400"
          />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-navy">Auto-print receipt</p>
            <p className="text-xs text-slate-500">
              Open print dialog after completing a sale
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPrintAuto((v) => !v)}
            className={cn(
              "relative h-7 w-12 rounded-full transition",
              printAuto ? "bg-emerald-500" : "bg-slate-300",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition",
                printAuto ? "left-5.5" : "left-0.5",
              )}
              style={{ left: printAuto ? "1.35rem" : "0.125rem" }}
            />
          </button>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Current demo role:{" "}
          <span className="font-semibold text-navy">
            {role === "admin" ? "Admin / Owner" : "Cashier"}
          </span>
        </div>
        <button
          type="button"
          onClick={() =>
            pushToast({
              type: "success",
              title: "Settings saved",
              description: "Demo preferences updated for this session.",
            })
          }
          className="btn-press h-11 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
