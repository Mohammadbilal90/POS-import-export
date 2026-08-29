import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  className,
  variant = "light",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "light" | "dark";
}) {
  const dims =
    size === "lg" ? "h-14 w-14 text-2xl" : size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11 text-lg";
  const dark = variant === "dark";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-white shadow-lg shadow-emerald-500/25",
          dims,
        )}
      >
        <span className="font-[family-name:var(--font-outfit)] tracking-tight">W</span>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-400" />
      </div>
      <div className="leading-tight">
        <p
          className={cn(
            "font-[family-name:var(--font-outfit)] font-bold tracking-tight",
            dark ? "text-white" : "text-navy",
            size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg",
          )}
        >
          Wholesale
          <span className={dark ? "text-emerald-300" : "text-emerald-600"}>POS</span>
        </p>
        {size !== "sm" ? (
          <p
            className={cn(
              "text-[11px] font-medium uppercase tracking-[0.14em]",
              dark ? "text-slate-400" : "text-slate-400",
            )}
          >
            Shop Management
          </p>
        ) : null}
      </div>
    </div>
  );
}
