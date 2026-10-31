"use client";
import { ReactNode, useState } from "react";

// Public forms ke liye: submit par sirf success message dikhata hai. Phase 2 mein API se connect karein.
export default function MockForm({ children, success }: { children: ReactNode; success: string }) {
  const [done, setDone] = useState(false);
  if (done) return <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">{success}</div>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
      {children}
    </form>
  );
}
