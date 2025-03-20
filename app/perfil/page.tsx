import { PerfilUsuario } from "../../componentes/perfil-usuario"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meu Perfil | DUDEXT",
  description: "Gerencie seu perfil DUDEXT",
}

export default function PerfilPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">
        <span className="text-gold">Meu</span> Perfil
      </h1>
      <PerfilUsuario />
    </div>
  )
}

