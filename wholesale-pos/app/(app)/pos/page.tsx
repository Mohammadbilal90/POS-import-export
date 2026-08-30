"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  Check,
  CreditCard,
  Minus,
  Plus,
  Printer,
  Search,
  Split,
  Trash2,
  X,
} from "lucide-react";
import { categories, customers, products, type Product } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn, formatCurrency } from "@/lib/utils";

type CartLine = {
  product: Product;
  qty: number;
};

type PaymentMethod = "cash" | "credit" | "partial";

export default function POSPage() {
  const { pushToast } = useDemo();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const [received, setReceived] = useState("");
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("INV-1043");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = categoryId === "all" || p.categoryId === categoryId;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [categoryId, query]);

  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const grandTotal = Math.max(0, subtotal - discount);
  const receivedNum = Number(received) || 0;
  const change =
    payment === "cash"
      ? Math.max(0, receivedNum - grandTotal)
      : payment === "partial"
        ? Math.max(0, receivedNum - 0) && receivedNum < grandTotal
          ? 0
          : Math.max(0, receivedNum - grandTotal)
        : 0;
  const creditPortion =
    payment === "credit"
      ? grandTotal
      : payment === "partial"
        ? Math.max(0, grandTotal - receivedNum)
        : 0;

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) =>
          l.product.id === id ? { ...l, qty: Math.max(0, l.qty + delta) } : l,
        )
        .filter((l) => l.qty > 0),
    );
  }

  function setQty(id: string, qty: number) {
    const next = Math.max(0, Math.floor(qty) || 0);
    setCart((prev) =>
      prev
        .map((l) => (l.product.id === id ? { ...l, qty: next } : l))
        .filter((l) => l.qty > 0),
    );
  }

  function completeSale() {
    if (cart.length === 0) {
      pushToast({
        type: "warning",
        title: "Cart is empty",
        description: "Add products before completing the sale.",
      });
      return;
    }
    if (payment === "cash" && receivedNum < grandTotal) {
      pushToast({
        type: "warning",
        title: "Insufficient amount",
        description: "Received cash is less than grand total.",
      });
      return;
    }
    if (payment === "partial" && (receivedNum <= 0 || receivedNum >= grandTotal)) {
      pushToast({
        type: "warning",
        title: "Check partial payment",
        description: "Enter an amount greater than 0 and less than total.",
      });
      return;
    }
    setInvoiceNo(`INV-${1043 + Math.floor(Math.random() * 40)}`);
    setShowSuccess(true);
    pushToast({
      type: "success",
      title: "Sale Completed Successfully ✓",
      description: `${formatCurrency(grandTotal)} · ${paymentLabel(payment)}`,
    });
  }

  function resetSale() {
    setCart([]);
    setDiscount(0);
    setReceived("");
    setPayment("cash");
    setShowSuccess(false);
  }

  const selectedCustomer = customers.find((c) => c.id === customerId)!;

  return (
    <div className="flex h-[calc(100vh-7.5rem)] min-h-[640px] gap-4">
      {/* Left: products */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="card-surface flex flex-col gap-3 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name or SKU…"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/80 pl-12 pr-4 text-base font-medium text-navy outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold transition btn-press",
                  categoryId === cat.id
                    ? "bg-navy text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 items-start gap-3 overflow-y-auto pb-1 sm:grid-cols-3-x xl:grid-cols-4">
          {filtered.map((product, i) => (
            <button
              key={product.id}
              type="button"
              onClick={() => addToCart(product)}
              className={cn(
                "group card-surface flex flex-col items-start p-3.5 text-left transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[var(--shadow-md)] btn-press animate-fade-up",
                `stagger-${(i % 5) + 1}`,
              )}
            >
              <div
                className="mb-3 flex h-16 w-full items-center justify-center rounded-2xl text-3xl transition group-hover:scale-105"
                style={{ background: product.accent }}
              >
                {product.icon}
              </div>
              <p className="font-semibold text-navy">{product.name}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {product.sku} · {product.unit}
              </p>
              <div className="mt-auto flex w-full items-end justify-between pt-3">
                <p className="font-[family-name:var(--font-outfit)] text-base font-bold text-emerald-700">
                  {formatCurrency(product.price)}
                </p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    product.stock <= product.minStock
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  Stock {product.stock}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: cart */}
      <div className="flex w-[400px] shrink-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-md)]">
        <div className="border-b border-slate-100 bg-gradient-to-r from-navy to-navy-soft px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Current Cart
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold">
                New Sale
              </h2>
            </div>
            {cart.length > 0 ? (
              <button
                type="button"
                onClick={() => setCart([])}
                className="rounded-xl bg-white/10 p-2 text-slate-200 transition hover:bg-white/20 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
              <p className="text-3xl">🛒</p>
              <p className="mt-3 text-sm font-semibold text-navy">Cart is empty</p>
              <p className="mt-1 text-xs text-slate-500">
                Tap products on the left to add them
              </p>
            </div>
          ) : (
            cart.map((line) => (
              <div
                key={line.product.id}
                className="animate-scale-in rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                    style={{ background: line.product.accent }}
                  >
                    {line.product.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-navy">
                      {line.product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatCurrency(line.product.price)} / {line.product.unit}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-navy">
                    {formatCurrency(line.product.price * line.qty)}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQty(line.product.id, -1)}
                      className="flex h-8 w-8 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-navy"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      value={line.qty}
                      onChange={(e) =>
                        setQty(line.product.id, Number(e.target.value))
                      }
                      className="h-8 w-10 border-x border-slate-200 bg-transparent text-center text-sm font-semibold text-navy outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateQty(line.product.id, 1)}
                      className="flex h-8 w-8 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-navy"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setCart((prev) =>
                        prev.filter((l) => l.product.id !== line.product.id),
                      )
                    }
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/80 px-4 py-4">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-medium text-navy">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-slate-500">
              <span>Discount</span>
              <input
                type="number"
                min={0}
                value={discount || ""}
                onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                placeholder="0"
                className="h-8 w-28 rounded-lg border border-slate-200 bg-white px-2 text-right text-sm font-semibold text-navy outline-none focus:border-emerald-400"
              />
            </div>
            <div className="flex justify-between border-t border-dashed border-slate-200 pt-2">
              <span className="font-semibold text-navy">Grand Total</span>
              <span className="font-[family-name:var(--font-outfit)] text-xl font-bold text-emerald-700">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "cash", label: "Cash", icon: Banknote },
                { id: "credit", label: "Credit / Udhaar", icon: CreditCard },
                { id: "partial", label: "Partial", icon: Split },
              ] as const
            ).map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPayment(opt.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-[11px] font-semibold transition btn-press",
                    payment === opt.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {(payment === "credit" || payment === "partial") && (
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-navy outline-none focus:border-emerald-400"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · Bal {formatCurrency(c.balance)}
                </option>
              ))}
            </select>
          )}

          {(payment === "cash" || payment === "partial") && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Received
                </label>
                <input
                  type="number"
                  value={received}
                  onChange={(e) => setReceived(e.target.value)}
                  placeholder="0"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {payment === "cash" ? "Change" : "On Credit"}
                </label>
                <div className="flex h-11 items-center rounded-xl border border-emerald-100 bg-emerald-50 px-3 text-sm font-bold text-emerald-800">
                  {payment === "cash"
                    ? formatCurrency(change)
                    : formatCurrency(creditPortion)}
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={completeSale}
            className="complete-sale-btn btn-press flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-base font-bold text-white shadow-xl shadow-emerald-600/30 transition hover:brightness-105"
          >
            <Check className="h-5 w-5" />
            Complete Sale
          </button>
        </div>
      </div>

      {showSuccess ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-sm">
          <div className="animate-scale-in w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8 text-center text-white">
              <button
                type="button"
                onClick={resetSale}
                className="absolute right-4 top-4 rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 ring-4 ring-white/30">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-outfit)] text-2xl font-bold">
                Sale Completed Successfully ✓
              </h3>
              <p className="mt-1 text-sm text-emerald-50">
                {invoiceNo} · {paymentLabel(payment)} ·{" "}
                {formatCurrency(grandTotal)}
              </p>
            </div>

            <div id="receipt-print" className="px-6 py-5">
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-4">
                <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <p className="font-[family-name:var(--font-outfit)] text-base font-bold text-navy">
                      WholesalePOS
                    </p>
                    <p className="text-xs text-slate-500">Receipt Preview</p>
                  </div>
                  <p className="text-xs font-semibold text-slate-500">{invoiceNo}</p>
                </div>
                <div className="space-y-1.5 text-sm">
                  {cart.map((line) => (
                    <div key={line.product.id} className="flex justify-between">
                      <span className="text-slate-600">
                        {line.product.name} × {line.qty}
                      </span>
                      <span className="font-medium text-navy">
                        {formatCurrency(line.product.price * line.qty)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 space-y-1 border-t border-slate-200 pt-3 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 ? (
                    <div className="flex justify-between text-slate-500">
                      <span>Discount</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  ) : null}
                  <div className="flex justify-between font-bold text-navy">
                    <span>Grand Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                  {(payment === "credit" || payment === "partial") && (
                    <p className="pt-1 text-xs text-amber-700">
                      Customer: {selectedCustomer.name}
                      {payment === "partial"
                        ? ` · Paid ${formatCurrency(receivedNum)} · Credit ${formatCurrency(creditPortion)}`
                        : " · Full credit / udhaar"}
                    </p>
                  )}
                  {payment === "cash" && (
                    <p className="pt-1 text-xs text-emerald-700">
                      Received {formatCurrency(receivedNum)} · Change{" "}
                      {formatCurrency(change)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-press flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-navy transition hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" />
                Print Receipt
              </button>
              <button
                type="button"
                onClick={resetSale}
                className="btn-press flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                New Sale
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function paymentLabel(method: PaymentMethod) {
  if (method === "cash") return "Cash";
  if (method === "credit") return "Credit / Udhaar";
  return "Partial Payment";
}
