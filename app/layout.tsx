import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Cabecalho } from "../componentes/cabecalho"
import { Rodape } from "../componentes/rodape"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AcessibilidadeProvider } from "../componentes/acessibilidade-provider"

// Configuração da fonte Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

// Configuração da fonte Playfair Display
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "DUDEXT - Moda Exclusiva",
  description: "Loja de roupas exclusivas com estilo Farfetch",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={montserrat.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AcessibilidadeProvider>
            <div className="flex min-h-screen flex-col">
              <Cabecalho />
              <main className="flex-1">{children}</main>
              <Rodape />
            </div>
            <Toaster />
          </AcessibilidadeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'