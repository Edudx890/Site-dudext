import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatarPreco(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor)
}

export function gerarImagemPlaceholder(texto: string, largura = 300, altura = 300): string {
  return `/placeholder.svg?height=${altura}&width=${largura}&text=${encodeURIComponent(texto)}`
}

