"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { POLL_SECONDS } from "@/lib/config";

export function LiveRefresh() {
  const router = useRouter();

  useEffect(() => {
    const id = window.setInterval(() => {
      router.refresh();
    }, POLL_SECONDS * 1000);
    return () => window.clearInterval(id);
  }, [router]);

  return null;
}
