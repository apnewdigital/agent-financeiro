-- ============================================================
-- INSERT DE CATEGORIAS COMPLETAS
-- Com aliases aprimorados e prontos para classificação automática
-- ============================================================

-- Limpa tabela antes de inserir (opcional no ambiente dev)
TRUNCATE categories RESTART IDENTITY CASCADE;

-- =====================
-- CATEGORIA: ALIMENTAÇÃO
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Alimentação',
    ARRAY[
        'mercado','supermercado','restaurante','lanche','burger','ifood','rappi','ubereats','comida',
        'almoço','almoco','janta','refeição','padaria','pao','café','cafeteria','pizza','sushi','fast food',
        'snack','mercearia','hortifruti','food','panificadora','açougue','acougue','lanchonete','delivery'
    ]
);

-- =====================
-- CATEGORIA: TRANSPORTE
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Transporte',
    ARRAY[
        'uber','99','taxi','carona','corrida','passagem','onibus','metrô','metro','trem',
        'combustivel','gasolina','etanol','diesel','estacionamento','pedagio','pedágio','carro','transporte',
        'uber moto','bicicleta','patinete','rota','viagem curta'
    ]
);

-- =====================
-- CATEGORIA: ASSINATURAS
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Assinaturas',
    ARRAY[
        'netflix','spotify','prime','amazon','amazon prime','hbo','globoplay','youtube premium','deezer',
        'canva','adobe','icloud','google storage','onedrive','dropbox','assinatura','mensalidade',
        'recorrência','recorrencia','plano'
    ]
);

-- =====================
-- CATEGORIA: CARTÃO DE CRÉDITO
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Cartão de Crédito',
    ARRAY[
        'cartao','cartão','fatura','credito','crédito','visa','master','nubank','inter','itaucard',
        'santander','bradesco','amex','hipercard'
    ]
);

-- =====================
-- CATEGORIA: SAÚDE
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Saúde',
    ARRAY[
        'farmacia','farmácia','remedio','remédio','consulta','plano de saúde','plano',
        'laboratorio','laboratório','clinica','clínica','hospital','exame','dentista','psicologo',
        'psicóloga','sessão','bem estar','bem-estar','vitamina','academia'
    ]
);

-- =====================
-- CATEGORIA: LAZER
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Lazer',
    ARRAY[
        'cinema','filme','parque','show','evento','balada','bar','pub','viagem','hotel','motel','passeio',
        'diversão','fun','parque de diversão','festa','boate','teatro'
    ]
);

-- =====================
-- CATEGORIA: EDUCAÇÃO
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Educação',
    ARRAY[
        'curso','ead','faculdade','universidade','escola','livro','apostila','material','aula','plataforma',
        'mentoria','coaching','workshop','palestra'
    ]
);

-- =====================
-- CATEGORIA: CASA
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Casa',
    ARRAY[
        'aluguel','condominio','condomínio','luz','energia','agua','água','internet','telefone','gas','gás',
        'moveis','móveis','decoracao','decoração','desk','cama','sofa','sofá','cozinha','utensilios',
        'eletrodomestico','eletrodoméstico'
    ]
);

-- =====================
-- CATEGORIA: COMPRAS / SHOPPING
-- =====================
INSERT INTO categories (name, aliases) VALUES
('Compras',
    ARRAY[
        'roupa','roupas','tenis','tênis','beauty','beleza','perfume','eletronico','eletrônico','celular',
        'shopping','maquiagem','cosmetico','cosmético','sapato','loja','shopee','aliexpress','presente',
        'camiseta','calça','bermuda','blusa'
    ]
);

