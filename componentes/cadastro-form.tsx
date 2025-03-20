"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function CadastroForm() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [aceitarTermos, setAceitarTermos] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem")
      return
    }

    if (!aceitarTermos) {
      setErro("Você precisa aceitar os termos e condições")
      return
    }

    setCarregando(true)

    // Simulação de cadastro
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulando cadastro bem-sucedido
      localStorage.setItem("usuarioLogado", JSON.stringify({ email, nome }))

      router.push("/")
      router.refresh()
    } catch (error) {
      setErro("Ocorreu um erro ao criar sua conta. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Card className="border-gold/20">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Cadastro</CardTitle>
        <CardDescription>Crie sua conta para uma experiência personalizada</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="luxury-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="luxury-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <div className="relative">
              <Input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="luxury-input pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
            <Input
              id="confirmarSenha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              className="luxury-input"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="termos"
              checked={aceitarTermos}
              onCheckedChange={(checked) => setAceitarTermos(checked as boolean)}
              className="data-[state=checked]:bg-gold data-[state=checked]:border-gold"
            />
            <Label htmlFor="termos" className="text-sm cursor-pointer">
              Eu aceito os{" "}
              <Link href="/termos" className="text-gold hover:underline">
                termos e condições
              </Link>
            </Label>
          </div>

          {erro && <div className="text-destructive text-sm">{erro}</div>}

          <Button type="submit" className="w-full gold-button" disabled={carregando}>
            {carregando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar Conta"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold/20"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" className="border-gold/20 hover:bg-gold/5">
            Google
          </Button>
          <Button variant="outline" className="border-gold/20 hover:bg-gold/5">
            Facebook
          </Button>
        </div>

        <div className="text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Faça login
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

