import Link from "next/link";
import MockForm from "@/components/ui/MockForm";
import { Field, Input, btn } from "@/components/ui";

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-navy">Reset password</h1>
      <p className="mb-5 text-sm text-slate-500">Enter your email and we will send you a reset link.</p>
      <MockForm success="If this email exists, a reset link has been sent.">
        <Field label="Email"><Input required type="email" /></Field>
        <button type="submit" className={btn("accent") + " w-full"}>Send reset link</button>
      </MockForm>
      <p className="mt-4 text-center text-sm"><Link href="/login" className="text-navy hover:underline">Back to sign in</Link></p>
    </>
  );
}
