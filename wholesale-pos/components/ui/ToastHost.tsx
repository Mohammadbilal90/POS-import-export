"use client";

import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
};

export function ToastHost() {
  const { toasts, dismissToast } = useDemo();

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-[100] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2">
      {toasts.map((toast) => {
        const type = toast.type ?? "info";
        const Icon = icons[type];
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto animate-slide-in rounded-2xl border bg-white/95 p-3.5 shadow-[var(--shadow-lg)] backdrop-blur-md",
              type === "success" && "border-emerald-200",
              type === "warning" && "border-amber-200",
              type === "info" && "border-slate-200",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                  type === "success" && "bg-emerald-50 text-emerald-600",
                  type === "warning" && "bg-amber-50 text-amber-600",
                  type === "info" && "bg-slate-100 text-slate-600",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-0.5 text-xs text-muted">{toast.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
