import { obterProdutos } from "@/acoes/produtos"
import { ListaProdutos } from "@/componentes/lista-produtos"
import { FiltrosProdutos } from "@/componentes/filtros-produtos"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Produtos | DUDEXT",
  description: "Explore nossa coleção de produtos exclusivos",
}

export default async function PaginaProdutos({
  searchParams,
}: {
  searchParams: { categoria?: string; ordenar?: string; pagina?: string }
}) {
  const categoria = searchParams.categoria
  const ordenar = searchParams.ordenar || "recentes"
  const pagina = Number(searchParams.pagina) || 1

  const produtos = await obterProdutos({
    categoria: categoria ? Number(categoria) : undefined,
    ordenar,
    pagina,
    itensPorPagina: 12,
  })

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-serif font-bold mb-6 md:mb-8">Nossos Produtos</h1>

      <div className="lg:hidden mb-6">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gold/20">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <aside className="lg:col-span-1 hidden lg:block">
          <FiltrosProdutos />
        </aside>

        <div className="lg:col-span-3">
          <ListaProdutos produtos={produtos} />
        </div>
      </div>
    </div>
  )
}

