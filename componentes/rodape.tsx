import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Logo } from "./logo"

export function Rodape() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-8">
          <Logo tamanho="grande" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold">Sobre Nós</h3>
            <p className="text-sm text-gray-300">
              Moda exclusiva com estilo único. Descubra as últimas tendências em roupas e acessórios de luxo.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/categorias" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Promoções
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Envio e Entrega
                </Link>
              </li>
              <li>
                <Link href="/devolucoes" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Devoluções
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-gray-300 hover:text-gold transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-4 text-gold">Contato</h3>
            <address className="not-italic text-sm text-gray-300">
              <p>Rua das Modas, 123</p>
              <p>São Paulo, SP</p>
              <p>CEP: 01234-567</p>
              <p className="mt-2">contato@dudext.com.br</p>
              <p>(11) 1234-5678</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gold/20 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DUDEXT. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

