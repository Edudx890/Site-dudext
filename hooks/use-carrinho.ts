"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ItemCarrinho {
  id: number
  nome: string
  preco: number
  imagem?: string
  quantidade: number
  tamanho: string
  cor: string
}

interface EstadoCarrinho {
  itens: ItemCarrinho[]
  total: number
  adicionarItem: (item: ItemCarrinho) => void
  removerItem: (id: number, tamanho: string) => void
  atualizarQuantidade: (id: number, tamanho: string, quantidade: number) => void
  limparCarrinho: () => void
}

export const useCarrinho = create<EstadoCarrinho>()(
  persist(
    (set, get) => ({
      itens: [],
      total: 0,
      adicionarItem: (item) => {
        const itens = get().itens
        const itemExistente = itens.find((i) => i.id === item.id && i.tamanho === item.tamanho)

        if (itemExistente) {
          const novosItens = itens.map((i) =>
            i.id === item.id && i.tamanho === item.tamanho ? { ...i, quantidade: i.quantidade + item.quantidade } : i,
          )

          set({
            itens: novosItens,
            total: calcularTotal(novosItens),
          })
        } else {
          const novosItens = [...itens, item]

          set({
            itens: novosItens,
            total: calcularTotal(novosItens),
          })
        }
      },
      removerItem: (id, tamanho) => {
        const novosItens = get().itens.filter((i) => !(i.id === id && i.tamanho === tamanho))

        set({
          itens: novosItens,
          total: calcularTotal(novosItens),
        })
      },
      atualizarQuantidade: (id, tamanho, quantidade) => {
        if (quantidade <= 0) {
          get().removerItem(id, tamanho)
          return
        }

        const novosItens = get().itens.map((i) => (i.id === id && i.tamanho === tamanho ? { ...i, quantidade } : i))

        set({
          itens: novosItens,
          total: calcularTotal(novosItens),
        })
      },
      limparCarrinho: () => {
        set({
          itens: [],
          total: 0,
        })
      },
    }),
    {
      name: "carrinho-dudext",
    },
  ),
)

function calcularTotal(itens: ItemCarrinho[]): number {
  return itens.reduce((total, item) => total + item.preco * item.quantidade, 0)
}

