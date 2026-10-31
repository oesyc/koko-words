import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-navy-50 to-white p-4">
      <Link href="/"><Image src="/logo-truck.png" alt="Koko's World LLC" width={140} height={140} priority /></Link>
      <div className="mt-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">{children}</div>
      <Link href="/" className="mt-4 text-sm text-slate-500 hover:text-navy">← Back to website</Link>
    </div>
  );
}
