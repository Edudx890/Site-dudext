"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ImageIcon } from "lucide-react"

export function BannerPrincipal() {
  const [imagemErro, setImagemErro] = useState(false)

  return (
    <div className="relative bg-charcoal text-white rounded-lg overflow-hidden">
      {imagemErro ? (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
          <ImageIcon className="h-16 w-16 text-gray-600" />
        </div>
      ) : (
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Banner principal"
            fill
            className="object-cover opacity-60"
            onError={() => setImagemErro(true)}
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className="relative py-16 md:py-24 px-6 md:px-16 flex flex-col items-start text-left max-w-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
          Elegância <span className="text-gold">Exclusiva</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-xl">
          Descubra nossa nova coleção de peças únicas, criadas para quem valoriza estilo e sofisticação.
        </p>
        <Button size="lg" className="gold-button" asChild>
          <Link href="/produtos">Explorar Coleção</Link>
        </Button>

        <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gold opacity-70 shimmer" />
      </div>
    </div>
  )
}

