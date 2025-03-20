"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accessibility, Moon, Sun, ZoomIn, ZoomOut } from "lucide-react"
import { useAcessibilidade } from "../hooks/use-acessibilidade"
import { useTheme } from "next-themes"

export function BotaoAcessibilidade() {
  const { tamanhoFonte, aumentarFonte, diminuirFonte, altoContraste, toggleAltoContraste } = useAcessibilidade()

  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Opções de acessibilidade">
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acessibilidade</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={aumentarFonte}>
          <ZoomIn className="mr-2 h-4 w-4" />
          <span>Aumentar Fonte</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={diminuirFonte}>
          <ZoomOut className="mr-2 h-4 w-4" />
          <span>Diminuir Fonte</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleAltoContraste}>
          <span className="mr-2 h-4 w-4 flex items-center justify-center">{altoContraste ? "✓" : ""}</span>
          <span>Alto Contraste</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Tema Claro</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Tema Escuro</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

