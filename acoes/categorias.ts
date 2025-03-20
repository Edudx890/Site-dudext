"use server"

import type { Categoria } from "@/tipos/categoria"

// Simulação de dados do banco de dados
const categorias: Categoria[] = [
  {
    id_categoria: 1,
    nome: "Camisetas",
    descricao: "Camisetas de diversos modelos e estilos",
    data_criacao: new Date().toISOString(),
    imagem: "/imagens/categoria-camisetas.png",
  },
  {
    id_categoria: 2,
    nome: "Calças",
    descricao: "Calças jeans, sociais e esportivas",
    data_criacao: new Date().toISOString(),
    imagem: "/imagens/categoria-calcas.png",
  },
  {
    id_categoria: 3,
    nome: "Vestidos",
    descricao: "Vestidos para diversas ocasiões",
    data_criacao: new Date().toISOString(),
    imagem: "/imagens/categoria-vestidos.png",
  },
  {
    id_categoria: 4,
    nome: "Casacos",
    descricao: "Casacos e jaquetas para o inverno",
    data_criacao: new Date().toISOString(),
    imagem: "/imagens/categoria-casacos.png",
  },
  {
    id_categoria: 5,
    nome: "Acessórios",
    descricao: "Cintos, bolsas e outros acessórios",
    data_criacao: new Date().toISOString(),
    imagem: "/imagens/categoria-acessorios.png",
  },
]

export async function obterCategorias(): Promise<Categoria[]> {
  // Simulando uma chamada ao banco de dados
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categorias
}

export async function obterCategoriaPorId(id: number): Promise<Categoria | undefined> {
  // Simulando uma chamada ao banco de dados
  await new Promise((resolve) => setTimeout(resolve, 100))
  return categorias.find((cat) => cat.id_categoria === id)
}

