import { CadastroForm } from "../../componentes/cadastro-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cadastro | DUDEXT",
  description: "Crie sua conta DUDEXT",
}

export default function CadastroPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-center mb-8">
          <span className="text-gold">Crie</span> sua conta
        </h1>
        <CadastroForm />
      </div>
    </div>
  )
}

