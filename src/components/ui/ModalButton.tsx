"use client";
import { ReactNode, useState } from "react";
import { btn } from "@/components/ui";

type Props = {
  label: ReactNode; title: string; description?: string; confirmLabel?: string;
  variant?: "primary" | "accent" | "outline" | "ghost" | "danger"; size?: "md" | "sm"; children?: ReactNode;
};

// Generic popup. Phase 2 mein confirm button par server action / API call lagayen.
export default function ModalButton({ label, title, description, confirmLabel = "Save", variant = "primary", size = "md", children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={btn(variant, size)} onClick={() => setOpen(true)}>{label}</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-navy">{title}</h3>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            {children && <div className="mt-4 space-y-4">{children}</div>}
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className={btn("outline")} onClick={() => setOpen(false)}>Cancel</button>
              <button type="button" className={btn(variant === "danger" ? "danger" : "accent")} onClick={() => setOpen(false)}>{confirmLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
