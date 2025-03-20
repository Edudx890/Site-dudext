import { CardProduto } from "./card-produto"
import type { Produto } from "@/tipos/produto"
import { Pagination } from "@/components/ui/pagination"

interface ListaProdutosProps {
  produtos: {
    itens: Produto[]
    total: number
    paginaAtual: number
    totalPaginas: number
  }
}

export function ListaProdutos({ produtos }: ListaProdutosProps) {
  const { itens, total, paginaAtual, totalPaginas } = produtos

  if (itens.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Exibindo {itens.length} de {total} produtos
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {itens.map((produto) => (
          <CardProduto key={produto.id_produto} produto={produto} />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination />
        </div>
      )}
    </div>
  )
}

