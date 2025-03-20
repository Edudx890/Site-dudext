"use server"

import type { Produto } from "@/tipos/produto"

// Simulação de dados do banco de dados
const produtos: Produto[] = [
  {
    id_produto: 1,
    id_categoria: 1,
    codigo_sku: "CAM-BAS-BRA-M",
    nome: "Camiseta Básica Branca",
    descricao: "Camiseta básica de algodão com corte regular e acabamento premium.",
    preco_custo: 25.0,
    preco_venda: 49.9,
    preco_promocional: null,
    tamanho: "M",
    cor: "Branco",
    material: "Algodão",
    genero: "Unissex",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/camiseta-branca.png",
  },
  {
    id_produto: 2,
    id_categoria: 1,
    codigo_sku: "CAM-BAS-PRE-G",
    nome: "Camiseta Básica Preta",
    descricao: "Camiseta básica de algodão com corte regular e acabamento premium.",
    preco_custo: 25.0,
    preco_venda: 49.9,
    preco_promocional: 39.9,
    tamanho: "G",
    cor: "Preto",
    material: "Algodão",
    genero: "Unissex",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/camiseta-preta.png",
  },
  {
    id_produto: 3,
    id_categoria: 2,
    codigo_sku: "CAL-JEA-AZU-38",
    nome: "Calça Jeans Slim",
    descricao: "Calça jeans modelo slim com lavagem média e acabamento premium.",
    preco_custo: 89.0,
    preco_venda: 159.9,
    preco_promocional: null,
    tamanho: "M",
    cor: "Azul",
    material: "Jeans",
    genero: "Feminino",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/calca-jeans.png",
  },
  {
    id_produto: 4,
    id_categoria: 3,
    codigo_sku: "VES-FLO-VER-P",
    nome: "Vestido Floral",
    descricao: "Vestido estampado floral com tecido leve e confortável.",
    preco_custo: 120.0,
    preco_venda: 229.9,
    preco_promocional: 189.9,
    tamanho: "P",
    cor: "Verde",
    material: "Viscose",
    genero: "Feminino",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/vestido-floral.png",
  },
  {
    id_produto: 5,
    id_categoria: 4,
    codigo_sku: "JAQ-COU-PRE-G",
    nome: "Jaqueta de Couro",
    descricao: "Jaqueta de couro sintético com forro quente e bolsos funcionais.",
    preco_custo: 180.0,
    preco_venda: 299.9,
    preco_promocional: null,
    tamanho: "G",
    cor: "Preto",
    material: "Couro Sintético",
    genero: "Masculino",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/jaqueta-couro.png",
  },
  {
    id_produto: 6,
    id_categoria: 5,
    codigo_sku: "BOL-COU-MAR-UN",
    nome: "Bolsa Transversal",
    descricao: "Bolsa transversal de couro sintético com alça ajustável.",
    preco_custo: 75.0,
    preco_venda: 149.9,
    preco_promocional: 129.9,
    tamanho: "Único",
    cor: "Marrom",
    material: "Couro Sintético",
    genero: "Feminino",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/bolsa-transversal.png",
  },
  {
    id_produto: 7,
    id_categoria: 1,
    codigo_sku: "CAM-EST-AZU-P",
    nome: "Camiseta Estampada",
    descricao: "Camiseta com estampa exclusiva e tecido de alta qualidade.",
    preco_custo: 35.0,
    preco_venda: 69.9,
    preco_promocional: null,
    tamanho: "P",
    cor: "Azul",
    material: "Algodão",
    genero: "Unissex",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/camiseta-estampada.png",
  },
  {
    id_produto: 8,
    id_categoria: 2,
    codigo_sku: "CAL-SOC-PRE-40",
    nome: "Calça Social",
    descricao: "Calça social de alfaiataria com caimento perfeito.",
    preco_custo: 95.0,
    preco_venda: 179.9,
    preco_promocional: 149.9,
    tamanho: "G",
    cor: "Preto",
    material: "Poliéster",
    genero: "Masculino",
    data_cadastro: new Date().toISOString(),
    imagem: "/imagens/calca-social.png",
  },
]

interface OpcoesConsulta {
  categoria?: number
  ordenar?: string
  pagina?: number
  itensPorPagina?: number
}

export async function obterProdutos(opcoes: OpcoesConsulta = {}) {
  // Simulando uma chamada ao banco de dados
  await new Promise((resolve) => setTimeout(resolve, 300))

  let produtosFiltrados = [...produtos]

  // Filtrar por categoria
  if (opcoes.categoria) {
    produtosFiltrados = produtosFiltrados.filter((p) => p.id_categoria === opcoes.categoria)
  }

  // Ordenar
  if (opcoes.ordenar) {
    switch (opcoes.ordenar) {
      case "preco-menor":
        produtosFiltrados.sort((a, b) => a.preco_venda - b.preco_venda)
        break
      case "preco-maior":
        produtosFiltrados.sort((a, b) => b.preco_venda - a.preco_venda)
        break
      case "recentes":
      default:
        produtosFiltrados.sort((a, b) => new Date(b.data_cadastro).getTime() - new Date(a.data_cadastro).getTime())
        break
    }
  }

  // Paginação
  const pagina = opcoes.pagina || 1
  const itensPorPagina = opcoes.itensPorPagina || 10
  const inicio = (pagina - 1) * itensPorPagina
  const fim = inicio + itensPorPagina

  return {
    itens: produtosFiltrados.slice(inicio, fim),
    total: produtosFiltrados.length,
    paginaAtual: pagina,
    totalPaginas: Math.ceil(produtosFiltrados.length / itensPorPagina),
  }
}

export async function obterProdutosDestaque(): Promise<Produto[]> {
  // Simulando uma chamada ao banco de dados
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Retorna produtos com promoção ou os primeiros 4
  const produtosPromocao = produtos.filter((p) => p.preco_promocional !== null)

  if (produtosPromocao.length >= 4) {
    return produtosPromocao.slice(0, 4)
  }

  return produtos.slice(0, 4)
}

export async function obterProdutoPorId(id: number): Promise<Produto | undefined> {
  // Simulando uma chamada ao banco de dados
  await new Promise((resolve) => setTimeout(resolve, 100))
  return produtos.find((p) => p.id_produto === id)
}

export async function obterProdutosRelacionados(id: number, categoriaId: number): Promise<Produto[]> {
  // Simulando uma chamada ao banco de dados
  await new Promise((resolve) => setTimeout(resolve, 200))

  return produtos.filter((p) => p.id_produto !== id && p.id_categoria === categoriaId).slice(0, 4)
}

