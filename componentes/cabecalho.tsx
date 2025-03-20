"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, User, Heart, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useCarrinho } from "../hooks/use-carrinho"
import { BotaoAcessibilidade } from "./botao-acessibilidade"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Logo } from "./logo"

interface Usuario {
  nome: string
  email: string
}

export function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const { itens } = useCarrinho()
  const router = useRouter()

  const toggleMenu = () => setMenuAberto(!menuAberto)

  useEffect(() => {
    // Verificar se o usuário está logado
    const usuarioLogado = localStorage.getItem("usuarioLogado")

    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado")
    setUsuario(null)
    router.refresh()
  }

  const iniciais = usuario
    ? usuario.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : ""

  return (
    <header className="border-b border-gold/10 sticky top-0 bg-background z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu} aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>

          <Logo tamanho="medio" className="lg:mr-8" />

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-gold">
              Início
            </Link>
            <Link href="/produtos" className="font-medium hover:text-gold">
              Produtos
            </Link>
            <Link href="/categorias" className="font-medium hover:text-gold">
              Categorias
            </Link>
            <Link href="/promocoes" className="font-medium hover:text-gold">
              Promoções
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative w-64">
              <Input placeholder="Buscar produtos..." className="pr-8 luxury-input" />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>

            <BotaoAcessibilidade />

            {usuario ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 border border-gold/20">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={usuario.nome} />
                      <AvatarFallback className="bg-gold/10 text-gold text-xs">{iniciais}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-gold/20">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gold/10" />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer">
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil?tab=pedidos" className="cursor-pointer">
                      Meus Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favoritos" className="cursor-pointer">
                      Favoritos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gold/10" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild>
              <Link href="/favoritos">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/carrinho" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itens.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itens.length}
                  </span>
                )}
              </Link>
            </Button>
          </div>

          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>

            {usuario ? (
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0" asChild>
                <Link href="/perfil">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gold/10 text-gold text-xs">{iniciais}</AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" asChild aria-label="Login">
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild aria-label="Carrinho">
              <Link href="/carrinho" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itens.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itens.length}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Menu móvel */}
      {menuAberto && (
        <div className="fixed inset-0 bg-background z-50 lg:hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-8">
              <Logo tamanho="medio" />

              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Fechar menu">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="mb-6">
              <Input placeholder="Buscar produtos..." className="luxury-input" />
            </div>

            <nav className="flex flex-col space-y-6">
              <Link href="/" className="text-xl font-medium" onClick={toggleMenu}>
                Início
              </Link>
              <Link href="/produtos" className="text-xl font-medium" onClick={toggleMenu}>
                Produtos
              </Link>
              <Link href="/categorias" className="text-xl font-medium" onClick={toggleMenu}>
                Categorias
              </Link>
              <Link href="/promocoes" className="text-xl font-medium" onClick={toggleMenu}>
                Promoções
              </Link>

              <div className="pt-4 border-t border-gold/10 flex items-center space-x-4">
                {usuario ? (
                  <Button variant="outline" className="border-gold/20" asChild>
                    <Link href="/perfil" onClick={toggleMenu}>
                      Meu Perfil
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="border-gold/20" asChild>
                    <Link href="/login" onClick={toggleMenu}>
                      Entrar
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="icon" className="border-gold/20" asChild>
                  <Link href="/favoritos" onClick={toggleMenu}>
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                <BotaoAcessibilidade />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

