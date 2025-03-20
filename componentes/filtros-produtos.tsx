"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export function FiltrosProdutos() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [precoRange, setPrecoRange] = useState([0, 1000])

  const aplicarFiltros = () => {
    // Implementação dos filtros
    console.log("Filtros aplicados:", { precoRange })
  }

  const limparFiltros = () => {
    setPrecoRange([0, 1000])
    router.push("/produtos")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={limparFiltros}>
          Limpar
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categorias", "tamanhos", "cores", "preco"]}>
        <AccordionItem value="categorias">
          <AccordionTrigger>Categorias</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-camisetas" />
                <Label htmlFor="cat-camisetas">Camisetas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-calcas" />
                <Label htmlFor="cat-calcas">Calças</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-vestidos" />
                <Label htmlFor="cat-vestidos">Vestidos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-casacos" />
                <Label htmlFor="cat-casacos">Casacos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cat-acessorios" />
                <Label htmlFor="cat-acessorios">Acessórios</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tamanhos">
          <AccordionTrigger>Tamanhos</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="tam-pp" />
                <Label htmlFor="tam-pp">PP</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tam-p" />
                <Label htmlFor="tam-p">P</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tam-m" />
                <Label htmlFor="tam-m">M</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tam-g" />
                <Label htmlFor="tam-g">G</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tam-gg" />
                <Label htmlFor="tam-gg">GG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tam-xg" />
                <Label htmlFor="tam-xg">XG</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cores">
          <AccordionTrigger>Cores</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-black border border-gray-300" />
                <span className="text-xs mt-1">Preto</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-white border border-gray-300" />
                <span className="text-xs mt-1">Branco</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-blue-600 border border-gray-300" />
                <span className="text-xs mt-1">Azul</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-red-600 border border-gray-300" />
                <span className="text-xs mt-1">Vermelho</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-green-600 border border-gray-300" />
                <span className="text-xs mt-1">Verde</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-yellow-400 border border-gray-300" />
                <span className="text-xs mt-1">Amarelo</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-pink-500 border border-gray-300" />
                <span className="text-xs mt-1">Rosa</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-8 h-8 rounded-full bg-purple-600 border border-gray-300" />
                <span className="text-xs mt-1">Roxo</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="preco">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={precoRange} min={0} max={1000} step={10} onValueChange={setPrecoRange} />
              <div className="flex items-center justify-between">
                <span>R$ {precoRange[0]}</span>
                <span>R$ {precoRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={aplicarFiltros}>
        Aplicar Filtros
      </Button>
    </div>
  )
}

