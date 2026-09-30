"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function VisitBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.endsWith("/visits")) return;
    const key = `nyanchu-visit:${pathname}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* private mode still sends the count */
    }

    const title = document.title.replace(/\s*·\s*NyanChu\s*$/, "");
    fetch("/api/visits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname, title }),
    })
      .then(async (response) => {
        if (!response.ok) return;
        const data = (await response.json()) as { count?: number };
        if (typeof data.count !== "number") return;
        const node = document.querySelector<HTMLElement>("[data-visit-count]");
        const label = node?.dataset.visitLabel;
        if (node && label) node.textContent = `${label} ${data.count.toLocaleString()}`;
      })
      .catch(() => {});
  }, [pathname]);

  return null;
}
