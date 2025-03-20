"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import type { Categoria } from "../tipos/categoria"
import { useState } from "react"
import { ImageIcon } from "lucide-react"

interface CategoriaDestaqueProps {
  categoria: Categoria
}

export function CategoriaDestaque({ categoria }: CategoriaDestaqueProps) {
  const [imagemErro, setImagemErro] = useState(false)

  // Fallback para imagem
  const imagemFallback = `/placeholder.svg?height=256&width=384&text=${encodeURIComponent(categoria.nome)}`

  return (
    <Link href={`/produtos?categoria=${categoria.id_categoria}`}>
      <Card className="overflow-hidden transition-transform hover:scale-[1.02] luxury-card">
        <div className="relative h-64 w-full bg-gray-100">
          {imagemErro ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4">
              <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-center text-gray-500">{categoria.nome}</p>
            </div>
          ) : (
            <Image
              src={categoria.imagem || imagemFallback}
              alt={categoria.nome}
              fill
              className="object-cover"
              onError={() => setImagemErro(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <CardContent className="p-6 text-center relative -mt-16 bg-white/90 dark:bg-charcoal/90 backdrop-blur-sm mx-4 rounded-lg border border-gold/20">
          <h3 className="text-xl font-serif font-bold text-gold">{categoria.nome}</h3>
          <p className="text-sm text-muted-foreground mt-1">{categoria.descricao}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

