-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS loja_roupas;
USE loja_roupas;

-- Tabela de categorias
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos
CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT,
    codigo_sku VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_custo DECIMAL(10, 2) NOT NULL,
    preco_venda DECIMAL(10, 2) NOT NULL,
    tamanho ENUM('PP', 'P', 'M', 'G', 'GG', 'XG') NOT NULL,
    cor VARCHAR(30) NOT NULL,
    material VARCHAR(50),
    genero ENUM('Masculino', 'Feminino', 'Unissex') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Tabela de estoque
CREATE TABLE estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT,
    quantidade INT NOT NULL DEFAULT 0,
    localizacao VARCHAR(50),
    ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de clientes
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(15),
    data_nascimento DATE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de endereços
CREATE TABLE enderecos (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado CHAR(2) NOT NULL,
    tipo_endereco ENUM('Entrega', 'Cobrança', 'Ambos') DEFAULT 'Ambos',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_endereco_entrega INT,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_pedido ENUM('Aguardando Pagamento', 'Pagamento Aprovado', 'Em Separação', 'Enviado', 'Entregue', 'Cancelado') DEFAULT 'Aguardando Pagamento',
    valor_total DECIMAL(10, 2) NOT NULL,
    metodo_pagamento ENUM('Cartão de Crédito', 'Boleto', 'Pix', 'Transferência') NOT NULL,
    codigo_rastreio VARCHAR(50),
    observacoes TEXT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_endereco_entrega) REFERENCES enderecos(id_endereco)
);

-- Tabela de itens do pedido
CREATE TABLE itens_pedido (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    desconto DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de promoções
CREATE TABLE promocoes (
    id_promocao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo_desconto ENUM('Percentual', 'Valor Fixo') NOT NULL,
    valor_desconto DECIMAL(10, 2) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    ativa BOOLEAN DEFAULT TRUE
);

-- Tabela de produtos em promoção
CREATE TABLE produtos_promocao (
    id_produto_promocao INT AUTO_INCREMENT PRIMARY KEY,
    id_promocao INT,
    id_produto INT,
    FOREIGN KEY (id_promocao) REFERENCES promocoes(id_promocao),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de fornecedores
CREATE TABLE fornecedores (
    id_fornecedor INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100),
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(15),
    contato_nome VARCHAR(100)
);

-- Tabela de compras (de fornecedores)
CREATE TABLE compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_fornecedor INT,
    data_compra DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    status_compra ENUM('Pendente', 'Aprovada', 'Recebida', 'Cancelada') DEFAULT 'Pendente',
    nota_fiscal VARCHAR(50),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedores(id_fornecedor)
);

-- Tabela de itens da compra
CREATE TABLE itens_compra (
    id_item_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_compra INT,
    id_produto INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_compra) REFERENCES compras(id_compra),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
);

-- Tabela de funcionários
CREATE TABLE funcionarios (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(15),
    cargo VARCHAR(50) NOT NULL,
    data_contratacao DATE NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

-- Tabela de vendas (associadas a funcionários)
CREATE TABLE vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_funcionario INT,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comissao DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id_funcionario)
);

-- Inserindo dados de exemplo
-- Categorias
INSERT INTO categorias (nome, descricao) VALUES 
('Camisetas', 'Camisetas de diversos modelos e estilos'),
('Calças', 'Calças jeans, sociais e esportivas'),
('Vestidos', 'Vestidos para diversas ocasiões'),
('Casacos', 'Casacos e jaquetas para o inverno'),
('Acessórios', 'Cintos, bolsas e outros acessórios');

-- Produtos
INSERT INTO produtos (id_categoria, codigo_sku, nome, descricao, preco_custo, preco_venda, tamanho, cor, material, genero) VALUES 
(1, 'CAM-BAS-BRA-M', 'Camiseta Básica', 'Camiseta básica de algodão', 25.00, 49.90, 'M', 'Branco', 'Algodão', 'Unissex'),
(1, 'CAM-BAS-PRE-G', 'Camiseta Básica', 'Camiseta básica de algodão', 25.00, 49.90, 'G', 'Preto', 'Algodão', 'Unissex'),
(2, 'CAL-JEA-AZU-38', 'Calça Jeans Slim', 'Calça jeans modelo slim', 89.00, 159.90, 'M', 'Azul', 'Jeans', 'Feminino'),
(3, 'VES-FLO-VER-P', 'Vestido Floral', 'Vestido estampado floral', 120.00, 229.90, 'P', 'Verde', 'Viscose', 'Feminino'),
(4, 'JAQ-COU-PRE-G', 'Jaqueta de Couro', 'Jaqueta de couro sintético', 180.00, 299.90, 'G', 'Preto', 'Couro Sintético', 'Masculino');

-- Estoque
INSERT INTO estoque (id_produto, quantidade, localizacao) VALUES 
(1, 50, 'Prateleira A1'),
(2, 45, 'Prateleira A2'),
(3, 30, 'Prateleira B3'),
(4, 20, 'Prateleira C1'),
(5, 15, 'Prateleira D2');

-- Clientes
INSERT INTO clientes (nome, cpf, email, telefone, data_nascimento) VALUES 
('Maria Silva', '123.456.789-00', 'maria@email.com', '(11) 98765-4321', '1985-05-15'),
('João Santos', '987.654.321-00', 'joao@email.com', '(11) 91234-5678', '1990-10-20'),
('Ana Oliveira', '456.789.123-00', 'ana@email.com', '(11) 92345-6789', '1988-03-25');

-- Endereços
INSERT INTO enderecos (id_cliente, cep, logradouro, numero, bairro, cidade, estado, tipo_endereco) VALUES 
(1, '01234-567', 'Rua das Flores', '123', 'Jardim Primavera', 'São Paulo', 'SP', 'Ambos'),
(2, '09876-543', 'Avenida Central', '456', 'Centro', 'São Paulo', 'SP', 'Entrega'),
(3, '05678-901', 'Rua dos Pássaros', '789', 'Vila Nova', 'São Paulo', 'SP', 'Ambos');

-- Fornecedores
INSERT INTO fornecedores (razao_social, nome_fantasia, cnpj, email, telefone, contato_nome) VALUES 
('Têxtil Brasil LTDA', 'Brasil Têxtil', '12.345.678/0001-90', 'contato@brasiltextil.com', '(11) 3456-7890', 'Carlos Mendes'),
('Moda Express S.A.', 'Moda Express', '98.765.432/0001-10', 'vendas@modaexpress.com', '(11) 2345-6789', 'Patrícia Lima');

-- Funcionários
INSERT INTO funcionarios (nome, cpf, email, telefone, cargo, data_contratacao, salario) VALUES 
('Pedro Almeida', '111.222.333-44', 'pedro@loja.com', '(11) 97777-8888', 'Vendedor', '2022-01-15', 2500.00),
('Carla Souza', '555.666.777-88', 'carla@loja.com', '(11) 96666-7777', 'Gerente', '2021-06-10', 4500.00);

-- Pedidos
INSERT INTO pedidos (id_cliente, id_endereco_entrega, status_pedido, valor_total, metodo_pagamento) VALUES 
(1, 1, 'Pagamento Aprovado', 159.90, 'Cartão de Crédito'),
(2, 2, 'Entregue', 349.80, 'Boleto'),
(3, 3, 'Em Separação', 299.90, 'Pix');

-- Itens do pedido
INSERT INTO itens_pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES 
(1, 3, 1, 159.90),
(2, 1, 1, 49.90),
(2, 2, 1, 49.90),
(2, 4, 1, 229.90),
(3, 5, 1, 299.90);

-- Vendas
INSERT INTO vendas (id_pedido, id_funcionario, comissao) VALUES 
(1, 1, 8.00),
(2, 1, 17.50),
(3, 2, 15.00);

-- Promoções
INSERT INTO promocoes (nome, descricao, tipo_desconto, valor_desconto, data_inicio, data_fim) VALUES 
('Liquidação de Verão', 'Descontos em produtos de verão', 'Percentual', 20.00, '2023-01-10', '2023-02-10'),
('Black Friday', 'Descontos em toda a loja', 'Percentual', 30.00, '2023-11-25', '2023-11-27');

-- Produtos em promoção
INSERT INTO produtos_promocao (id_promocao, id_produto) VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 5);

-- Compras de fornecedores
INSERT INTO compras (id_fornecedor, data_compra, valor_total, status_compra, nota_fiscal) VALUES 
(1, '2023-01-05', 5000.00, 'Recebida', 'NF-12345'),
(2, '2023-02-10', 7500.00, 'Recebida', 'NF-67890');

-- Itens da compra
INSERT INTO itens_compra (id_compra, id_produto, quantidade, preco_unitario) VALUES 
(1, 1, 100, 20.00),
(1, 2, 100, 20.00),
(1, 3, 50, 80.00),
(2, 4, 30, 100.00),
(2, 5, 25, 160.00);

