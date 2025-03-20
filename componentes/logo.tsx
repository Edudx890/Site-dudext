import Link from "next/link"

interface LogoProps {
  className?: string
  tamanho?: "pequeno" | "medio" | "grande"
}

export function Logo({ className = "", tamanho = "medio" }: LogoProps) {
  const tamanhos = {
    pequeno: "text-xl",
    medio: "text-2xl",
    grande: "text-3xl",
  }

  return (
    <Link href="/" className={`font-serif font-bold ${tamanhos[tamanho]} ${className}`}>
      <span className="text-foreground">DUDE</span>
      <span className="text-gold">X</span>
      <span className="text-foreground">T</span>
    </Link>
  )
}

