"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Filter, Search } from "lucide-react";
import { categories, products } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

type StockFilter = "all" | "low" | "ok";

export default function InventoryPage() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  const rows = useMemo(() => {
    return products.filter((p) => {
      const matchCat = categoryId === "all" || p.categoryId === categoryId;
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      const isLow = p.stock <= p.minStock;
      const matchStock =
        stockFilter === "all" ||
        (stockFilter === "low" && isLow) ||
        (stockFilter === "ok" && !isLow);
      return matchCat && matchQ && matchStock;
    });
  }, [categoryId, query, stockFilter]);

  const lowCount = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
            Inventory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Live stock levels with low-stock highlighting
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
          <span className="inline-flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {lowCount} products below minimum
          </span>
        </div>
      </div>

      <div className="card-surface flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search inventory…"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-navy outline-none"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            {(
              [
                { id: "all", label: "All" },
                { id: "low", label: "Low" },
                { id: "ok", label: "OK" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStockFilter(f.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  stockFilter === f.id
                    ? "bg-white text-navy shadow-sm"
                    : "text-slate-500 hover:text-navy",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Current Stock</th>
                <th className="px-5 py-3 font-semibold">Minimum Stock</th>
                <th className="px-5 py-3 font-semibold">Value</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const cat = categories.find((c) => c.id === p.categoryId);
                const low = p.stock <= p.minStock;
                return (
                  <tr
                    key={p.id}
                    className={cn(
                      "border-t border-slate-100 transition hover:bg-slate-50/80",
                      low && "bg-amber-50/40",
                    )}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                          style={{ background: p.accent }}
                        >
                          {p.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-navy">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{cat?.name}</td>
                    <td className="px-5 py-3.5 font-semibold text-navy">
                      {p.stock}{" "}
                      <span className="font-normal text-slate-400">{p.unit}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {p.minStock} {p.unit}
                    </td>
                    <td className="px-5 py-3.5 text-slate-700">
                      {formatCurrency(p.stock * p.cost)}
                    </td>
                    <td className="px-5 py-3.5">
                      {low ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                          <AlertTriangle className="h-3 w-3" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
