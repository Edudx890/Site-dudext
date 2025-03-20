"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Minus, Plus, Share2, ShoppingBag, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Produto } from "@/tipos/produto"
import { formatarPreco } from "@/lib/utils"
import { useCarrinho } from "@/hooks/use-carrinho"
import { Badge } from "@/components/ui/badge"

interface DetalhesProdutoProps {
  produto: Produto
}

export function DetalhesProduto({ produto }: DetalhesProdutoProps) {
  const [quantidade, setQuantidade] = useState(1)
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(produto.tamanho)
  const [favorito, setFavorito] = useState(false)
  const [imagemErro, setImagemErro] = useState(false)
  const { adicionarItem } = useCarrinho()

  const aumentarQuantidade = () => setQuantidade((prev) => prev + 1)
  const diminuirQuantidade = () => setQuantidade((prev) => (prev > 1 ? prev - 1 : 1))
  const toggleFavorito = () => setFavorito(!favorito)

  const adicionarAoCarrinho = () => {
    adicionarItem({
      id: produto.id_produto,
      nome: produto.nome,
      preco: produto.preco_venda,
      imagem: produto.imagem,
      quantidade,
      tamanho: tamanhoSelecionado,
      cor: produto.cor,
    })
  }

  const emPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco_venda

  // Fallback para imagem
  const imagemFallback = `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(produto.nome)}`

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {imagemErro ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
            <ImageIcon className="h-16 w-16 text-gray-400 mb-2" />
            <p className="text-sm text-center text-gray-500">{produto.nome}</p>
          </div>
        ) : (
          <Image
            src={produto.imagem || imagemFallback}
            alt={produto.nome}
            fill
            className="object-cover"
            onError={() => setImagemErro(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-serif font-bold">{produto.nome}</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleFavorito}>
              <Heart className={`h-5 w-5 ${favorito ? "fill-gold text-gold" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {emPromocao ? (
            <>
              <span className="text-2xl font-bold text-gold">{formatarPreco(produto.preco_promocional!)}</span>
              <span className="text-lg text-muted-foreground line-through">{formatarPreco(produto.preco_venda)}</span>
              <Badge className="ml-2 bg-gold hover:bg-gold-dark">Promoção</Badge>
            </>
          ) : (
            <span className="text-2xl font-bold text-gold">{formatarPreco(produto.preco_venda)}</span>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Cor</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full border-2 border-primary"
                  style={{ backgroundColor: produto.cor.toLowerCase() }}
                />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs">{produto.cor}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Tamanho</h3>
            <Select value={tamanhoSelecionado} onValueChange={setTamanhoSelecionado}>
              <SelectTrigger className="w-32 luxury-input">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PP">PP</SelectItem>
                <SelectItem value="P">P</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="G">G</SelectItem>
                <SelectItem value="GG">GG</SelectItem>
                <SelectItem value="XG">XG</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Quantidade</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={diminuirQuantidade}
                disabled={quantidade <= 1}
                className="border-gold/20"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantidade}</span>
              <Button variant="outline" size="icon" onClick={aumentarQuantidade} className="border-gold/20">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Button className="w-full gap-2 gold-button" size="lg" onClick={adicionarAoCarrinho}>
            <ShoppingBag className="h-5 w-5" />
            Adicionar ao Carrinho
          </Button>

          <Button variant="outline" className="w-full border-gold/20 hover:bg-gold/5" size="lg">
            Comprar Agora
          </Button>
        </div>

        <Tabs defaultValue="descricao" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="descricao" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Descrição
            </TabsTrigger>
            <TabsTrigger value="detalhes" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="entrega" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Entrega
            </TabsTrigger>
          </TabsList>
          <TabsContent value="descricao" className="pt-4">
            <p className="text-muted-foreground">{produto.descricao || "Sem descrição disponível."}</p>
          </TabsContent>
          <TabsContent value="detalhes" className="pt-4">
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>Material:</strong> {produto.material}
              </li>
              <li>
                <strong>Gênero:</strong> {produto.genero}
              </li>
              <li>
                <strong>Código SKU:</strong> {produto.codigo_sku}
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="entrega" className="pt-4">
            <p className="text-muted-foreground">
              Entrega em todo o Brasil. Frete grátis para compras acima de R$ 299,90. Prazo de entrega estimado: 3-7
              dias úteis.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

