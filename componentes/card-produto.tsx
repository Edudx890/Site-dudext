"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Produto } from "../tipos/produto"
import { formatarPreco } from "../lib/utils"
import { useCarrinho } from "../hooks/use-carrinho"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface CardProdutoProps {
  produto: Produto
}

export function CardProduto({ produto }: CardProdutoProps) {
  const { adicionarItem } = useCarrinho()
  const [favorito, setFavorito] = useState(false)
  const [imagemErro, setImagemErro] = useState(false)

  const toggleFavorito = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorito(!favorito)
  }

  const adicionarAoCarrinho = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    adicionarItem({
      id: produto.id_produto,
      nome: produto.nome,
      preco: produto.preco_venda,
      imagem: produto.imagem,
      quantidade: 1,
      tamanho: produto.tamanho,
      cor: produto.cor,
    })
  }

  const emPromocao = produto.preco_promocional && produto.preco_promocional < produto.preco_venda

  // Fallback para imagem
  const imagemFallback = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(produto.nome)}`

  return (
    <Link href={`/produtos/${produto.id_produto}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-gold luxury-card">
        <div className="relative aspect-square bg-gray-100">
          {imagemErro ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
              <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-center text-gray-500">{produto.nome}</p>
            </div>
          ) : (
            <Image
              src={produto.imagem || imagemFallback}
              alt={produto.nome}
              fill
              className="object-cover"
              onError={() => setImagemErro(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={produto.id_produto <= 4} // Prioriza o carregamento dos primeiros produtos
            />
          )}

          {emPromocao && <Badge className="absolute top-2 left-2 bg-gold hover:bg-gold-dark">Promoção</Badge>}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={toggleFavorito}
          >
            <Heart className={`h-5 w-5 ${favorito ? "fill-gold text-gold" : ""}`} />
          </Button>
        </div>

        <CardContent className="p-4">
          <h3 className="font-medium font-serif line-clamp-1">{produto.nome}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {produto.tamanho} | {produto.cor}
          </p>

          <div className="mt-2 flex items-center gap-2">
            {emPromocao ? (
              <>
                <span className="font-bold text-gold">{formatarPreco(produto.preco_promocional!)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatarPreco(produto.preco_venda)}</span>
              </>
            ) : (
              <span className="font-bold text-gold">{formatarPreco(produto.preco_venda)}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            variant="outline"
            className="w-full gap-2 border-gold/20 hover:bg-gold/5 hover:text-gold"
            onClick={adicionarAoCarrinho}
          >
            <ShoppingBag className="h-4 w-4" />
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

