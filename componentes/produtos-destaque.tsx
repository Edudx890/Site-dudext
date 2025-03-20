import { CardProduto } from "./card-produto"
import type { Produto } from "@/tipos/produto"

interface ProdutosDestaqueProps {
  produtos: Produto[]
}

export function ProdutosDestaque({ produtos }: ProdutosDestaqueProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {produtos.map((produto) => (
        <CardProduto key={produto.id_produto} produto={produto} />
      ))}
    </div>
  )
}

