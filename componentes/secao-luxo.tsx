"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ImageIcon } from "lucide-react"

export function SecaoLuxo() {
  const [imagemErro, setImagemErro] = useState(false)

  return (
    <section className="my-16 py-12 md:py-16 bg-charcoal text-white rounded-lg overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gold opacity-70 shimmer" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gold opacity-70 shimmer" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
              Coleção <span className="text-gold">Exclusiva</span>
            </h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-gray-300">
              Nossa coleção exclusiva traz peças únicas, confeccionadas com os melhores materiais e acabamento
              impecável. Cada item é cuidadosamente selecionado para oferecer o que há de melhor em moda de luxo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="gold-button" size="lg" asChild>
                <Link href="/produtos?colecao=exclusiva">Explorar Coleção</Link>
              </Button>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10" size="lg" asChild>
                <Link href="/sobre">Nossa História</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mt-6 md:mt-0">
            {imagemErro ? (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal-light">
                <ImageIcon className="h-16 w-16 text-gray-600" />
              </div>
            ) : (
              <Image
                src="/placeholder.svg?height=400&width=600&text=Coleção+Exclusiva"
                alt="Coleção Exclusiva"
                fill
                className="object-cover"
                onError={() => setImagemErro(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 border-2 border-gold/30 m-4 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

