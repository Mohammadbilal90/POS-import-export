"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Role } from "./data";

export type Toast = {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning";
};

type DemoContextValue = {
  role: Role | null;
  ready: boolean;
  enterDemo: (role: Role) => void;
  exitDemo: () => void;
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

const ROLE_KEY = "wholesalepos-role";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(ROLE_KEY);
    if (stored === "admin" || stored === "cashier") setRole(stored);
    setReady(true);
  }, []);

  const enterDemo = useCallback((next: Role) => {
    setRole(next);
    window.sessionStorage.setItem(ROLE_KEY, next);
  }, []);

  const exitDemo = useCallback(() => {
    setRole(null);
    window.sessionStorage.removeItem(ROLE_KEY);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { ...toast, id }]);
      window.setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      role,
      ready,
      enterDemo,
      exitDemo,
      toasts,
      pushToast,
      dismissToast,
    }),
    [role, ready, enterDemo, exitDemo, toasts, pushToast, dismissToast],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
