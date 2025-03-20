"use client"

import { useCarrinho } from "@/hooks/use-carrinho"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { formatarPreco } from "@/lib/utils"

export default function PaginaCarrinho() {
  const { itens, adicionarItem, removerItem, atualizarQuantidade, total } = useCarrinho()

  if (itens.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>
        <p className="mb-8">Seu carrinho está vazio.</p>
        <Button asChild>
          <Link href="/produtos">Continuar Comprando</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {itens.map((item) => (
            <Card key={`${item.id}-${item.tamanho}`} className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative bg-gray-100">
                    <Image
                      src={item.imagem || `/placeholder.svg?height=96&width=96`}
                      alt={item.nome}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.nome}</h3>
                    <p className="text-sm text-muted-foreground">
                      Tamanho: {item.tamanho} | Cor: {item.cor}
                    </p>
                    <p className="font-medium mt-1">{formatarPreco(item.preco)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => atualizarQuantidade(item.id, item.tamanho, item.quantidade - 1)}
                      disabled={item.quantidade <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantidade}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => atualizarQuantidade(item.id, item.tamanho, item.quantidade + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button variant="ghost" size="icon" onClick={() => removerItem(item.id, item.tamanho)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatarPreco(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>Calculado no checkout</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatarPreco(total)}</span>
              </div>

              <Button className="w-full mt-6">Finalizar Compra</Button>

              <Button variant="outline" className="w-full mt-2" asChild>
                <Link href="/produtos">Continuar Comprando</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

