import { obterProdutoPorId, obterProdutosRelacionados } from "@/acoes/produtos"
import { DetalhesProduto } from "@/componentes/detalhes-produto"
import { ProdutosRelacionados } from "@/componentes/produtos-relacionados"
import { notFound } from "next/navigation"

export default async function PaginaProduto({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  if (isNaN(id)) {
    notFound()
  }

  const produto = await obterProdutoPorId(id)

  if (!produto) {
    notFound()
  }

  const produtosRelacionados = await obterProdutosRelacionados(id, produto.id_categoria)

  return (
    <div className="container mx-auto px-4 py-8">
      <DetalhesProduto produto={produto} />

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <ProdutosRelacionados produtos={produtosRelacionados} />
      </section>
    </div>
  )
}

