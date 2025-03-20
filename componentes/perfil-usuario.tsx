"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { Loader2, LogOut, User, ShoppingBag, Heart, CreditCard, MapPin } from "lucide-react"

interface Usuario {
  nome: string
  email: string
}

export function PerfilUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está logado
    const usuarioLogado = localStorage.getItem("usuarioLogado")

    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado))
    } else {
      router.push("/login")
    }

    setCarregando(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado")
    router.push("/")
    router.refresh()
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!usuario) {
    return null
  }

  const iniciais = usuario.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card className="border-gold/20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 border-2 border-gold">
                <AvatarImage src="" alt={usuario.nome} />
                <AvatarFallback className="bg-gold/10 text-gold text-xl">{iniciais}</AvatarFallback>
              </Avatar>

              <h2 className="text-xl font-serif font-medium">{usuario.nome}</h2>
              <p className="text-sm text-muted-foreground">{usuario.email}</p>

              <Button variant="outline" className="mt-6 w-full border-gold/20 hover:bg-gold/5" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>

            <div className="mt-8 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4 text-gold" />
                Meus Dados
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingBag className="mr-2 h-4 w-4 text-gold" />
                Meus Pedidos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4 text-gold" />
                Favoritos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4 text-gold" />
                Formas de Pagamento
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4 text-gold" />
                Endereços
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Tabs defaultValue="dados">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="dados" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Meus Dados
            </TabsTrigger>
            <TabsTrigger value="pedidos" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="enderecos" className="data-[state=active]:bg-gold data-[state=active]:text-white">
              Endereços
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dados">
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="font-serif">Informações Pessoais</CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" type="text" value={usuario.nome} className="luxury-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={usuario.email} className="luxury-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" type="tel" placeholder="(00) 00000-0000" className="luxury-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                      <Input id="dataNascimento" type="date" className="luxury-input" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" type="text" placeholder="000.000.000-00" className="luxury-input" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="gold-button">Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pedidos">
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="font-serif">Meus Pedidos</CardTitle>
                <CardDescription>Histórico e status dos seus pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gold/40" />
                  <p>Você ainda não realizou nenhum pedido.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enderecos">
            <Card className="border-gold/20">
              <CardHeader>
                <CardTitle className="font-serif">Meus Endereços</CardTitle>
                <CardDescription>Gerencie seus endereços de entrega</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gold/40" />
                  <p>Você ainda não cadastrou nenhum endereço.</p>
                  <Button className="mt-4 gold-button">Adicionar Endereço</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

