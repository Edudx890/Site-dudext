import { LoginForm } from "../../componentes/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | DUDEXT",
  description: "Faça login na sua conta DUDEXT",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-center mb-8">
          <span className="text-gold">Acesse</span> sua conta
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}

