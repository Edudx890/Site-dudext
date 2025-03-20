import { BannerPrincipal } from "../componentes/banner-principal"
import { CategoriaDestaque } from "../componentes/categoria-destaque"
import { ProdutosDestaque } from "../componentes/produtos-destaque"
import { SecaoLuxo } from "../componentes/secao-luxo"
import { obterCategorias } from "../acoes/categorias"
import { obterProdutosDestaque } from "../acoes/produtos"

export default async function Inicio() {
  const categorias = await obterCategorias()
  const produtosDestaque = await obterProdutosDestaque()

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <BannerPrincipal />

      <section className="my-12 md:my-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            <span className="text-gold">Categorias</span> em Destaque
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categorias.slice(0, 3).map((categoria) => (
            <CategoriaDestaque key={categoria.id_categoria} categoria={categoria} />
          ))}
        </div>
      </section>

      <SecaoLuxo />

      <section className="my-12 md:my-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            <span className="text-gold">Produtos</span> em Destaque
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        <ProdutosDestaque produtos={produtosDestaque} />
      </section>
    </div>
  )
}

