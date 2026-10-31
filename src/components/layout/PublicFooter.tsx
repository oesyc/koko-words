import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-navy-dark text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">Koko&apos;s World <span className="text-accent">LLC</span></p>
          <p className="mt-2 text-sm text-slate-300">Reliable interstate freight from Richmond, Texas.</p>
          <p className="mt-3 text-sm">USDOT: 0000000 · MC: 000000</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-semibold text-white">Quick links</p>
          <ul className="space-y-1">
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/services" className="hover:text-accent">Services</Link></li>
            <li><Link href="/request-quote" className="hover:text-accent">Request a Quote</Link></li>
            <li><Link href="/drive-for-us" className="hover:text-accent">Drive for Us</Link></li>
          </ul>
        </div>
        <div className="space-y-2 text-sm">
          <p className="mb-2 font-semibold text-white">Contact</p>
          <p className="flex items-center gap-2"><Phone size={16} /> (832) 555-0100</p>
          <p className="flex items-center gap-2"><Mail size={16} /> admin@kokosworldllc.com</p>
          <p className="flex items-center gap-2"><MapPin size={16} /> Richmond, Texas</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">© 2026 Koko&apos;s World LLC. All rights reserved.</div>
    </footer>
  );
}
