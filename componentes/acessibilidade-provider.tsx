"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface AcessibilidadeContextType {
  tamanhoFonte: number
  aumentarFonte: () => void
  diminuirFonte: () => void
  resetarFonte: () => void
  altoContraste: boolean
  toggleAltoContraste: () => void
}

const AcessibilidadeContext = createContext<AcessibilidadeContextType | undefined>(undefined)

export function AcessibilidadeProvider({ children }: { children: React.ReactNode }) {
  const [tamanhoFonte, setTamanhoFonte] = useState(100)
  const [altoContraste, setAltoContraste] = useState(false)

  const aumentarFonte = () => {
    if (tamanhoFonte < 150) {
      setTamanhoFonte((prev) => prev + 10)
    }
  }

  const diminuirFonte = () => {
    if (tamanhoFonte > 80) {
      setTamanhoFonte((prev) => prev - 10)
    }
  }

  const resetarFonte = () => {
    setTamanhoFonte(100)
  }

  const toggleAltoContraste = () => {
    setAltoContraste((prev) => !prev)
  }

  useEffect(() => {
    document.documentElement.style.fontSize = `${tamanhoFonte}%`
  }, [tamanhoFonte])

  useEffect(() => {
    if (altoContraste) {
      document.documentElement.classList.add("alto-contraste")
    } else {
      document.documentElement.classList.remove("alto-contraste")
    }
  }, [altoContraste])

  return (
    <AcessibilidadeContext.Provider
      value={{
        tamanhoFonte,
        aumentarFonte,
        diminuirFonte,
        resetarFonte,
        altoContraste,
        toggleAltoContraste,
      }}
    >
      {children}
    </AcessibilidadeContext.Provider>
  )
}

export function useAcessibilidade() {
  const context = useContext(AcessibilidadeContext)

  if (context === undefined) {
    throw new Error("useAcessibilidade deve ser usado dentro de um AcessibilidadeProvider")
  }

  return context
}

