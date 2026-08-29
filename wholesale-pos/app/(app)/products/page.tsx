"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { categories, products } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { formatCurrency } from "@/lib/utils";

export default function ProductsPage() {
  const { pushToast } = useDemo();
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-navy">
            Products
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Catalog with cost, selling price and stock
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            pushToast({
              type: "info",
              title: "Demo mode",
              description: "Add product form is preview-only in this demo.",
            })
          }
          className="btn-press inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="card-surface p-4">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => {
          const cat = categories.find((c) => c.id === p.categoryId);
          return (
            <div
              key={p.id}
              className="card-surface group p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition group-hover:scale-105"
                  style={{ background: p.accent }}
                >
                  {p.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy">{p.name}</p>
                  <p className="text-xs text-slate-400">
                    {p.sku} · {cat?.name}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-50 px-2.5 py-2">
                      <p className="text-slate-400">Cost</p>
                      <p className="font-semibold text-navy">{formatCurrency(p.cost)}</p>
                    </div>
                    <div className="rounded-lg bg-emerald-50 px-2.5 py-2">
                      <p className="text-emerald-700/70">Sell</p>
                      <p className="font-semibold text-emerald-800">
                        {formatCurrency(p.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
