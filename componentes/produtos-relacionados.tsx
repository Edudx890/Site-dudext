import { CardProduto } from "./card-produto"
import type { Produto } from "@/tipos/produto"

interface ProdutosRelacionadosProps {
  produtos: Produto[]
}

export function ProdutosRelacionados({ produtos }: ProdutosRelacionadosProps) {
  if (produtos.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <CardProduto key={produto.id_produto} produto={produto} />
      ))}
    </div>
  )
}

