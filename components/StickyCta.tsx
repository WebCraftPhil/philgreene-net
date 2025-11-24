"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";

import { trackEvent } from "../lib/analytics";

const HIDDEN_PATHS = ["/contact"];

export default function StickyCta() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.includes(pathname ?? "")) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <Link
        href="/contact"
        onClick={() => trackEvent("sticky_contact_cta")}
        className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-full border border-white/60 bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-white shadow-xl ring-1 ring-blue-200/60 transition hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:border-blue-400/40 dark:from-blue-500 dark:to-blue-400 dark:ring-blue-200/20"
      >
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          <div className="text-left">
            <div className="text-sm font-semibold leading-tight">
              Discuss Your Project
            </div>
            <div className="text-xs font-medium text-blue-50/80 dark:text-blue-100/80">
              Free 15-min consult
            </div>
          </div>
        </div>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-50 dark:text-white">
          Let&apos;s talk
        </span>
      </Link>
    </div>
  );
}
