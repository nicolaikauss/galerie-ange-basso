"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data";

export type Line = { product: Product; qty: number };

type CartCtx = {
  lines: Line[];
  isOpen: boolean;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ab_cart");
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ab_cart", JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = (p: Product) => {
    setLines((prev) => {
      const found = prev.find((l) => l.product.id === p.id);
      if (found) {
        return prev.map((l) =>
          l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { product: p, qty: 1 }];
    });
    setIsOpen(true);
  };

  const remove = (id: string) =>
    setLines((prev) => prev.filter((l) => l.product.id !== id));

  const setQty = (id: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.product.id !== id)
        : prev.map((l) => (l.product.id === id ? { ...l, qty } : l))
    );

  const clear = () => setLines([]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce(
    (s, l) => s + (l.product.price ?? 0) * l.qty,
    0
  );

  return (
    <Ctx.Provider
      value={{
        lines,
        isOpen,
        add,
        remove,
        setQty,
        clear,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        count,
        total,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
