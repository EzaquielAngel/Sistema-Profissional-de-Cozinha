
# 🍣 Cozinha Japonesa - Sistema de Gerenciamento Full-Stack

Este repositório contém uma aplicação web completa voltada ao gerenciamento e controle de estoque de um restaurante de Cozinha Japonesa.

O objetivo deste projeto é demonstrar na prática a integração **Full-Stack**: desde a modelagem relacional do banco de dados até a criação de rotas RESTful em Node.js e uma interface web moderna e responsiva.

---

## 📌 Status do Projeto
⚠️ **Em desenvolvimento (Ativo)**: A estrutura de Back-end, integração MySQL e a interface web inicial para listagem de pratos e insumos já estão operacionais. As próximas etapas incluem o desenvolvimento dos formulários de cadastro e a lógica de consumo automático de estoque.

---

## 🗄️ Estrutura do Banco de Dados
O modelo de dados contempla a gestão de pratos, equipe de cozinheiros, histórico de preparo e controle de insumos/estoque:

- **`pratos`**: Armazena o cardápio (nome, tipo/categoria e tempo de preparo).
- **`cozinheiros`**: Registra os profissionais da cozinha, nível de experiência e especialidade.
- **`preparo`**: Tabela associativa que registra a produção diária, vinculando o cozinheiro ao prato e quantidade.
- **`ingredientes`**: Mantém o controle e saldo atual de insumos do restaurante.
- **`receitas`**: Mapeamento N:M conectando cada prato aos ingredientes e quantidades necessárias para o preparo.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5, JavaScript (Fetch API / Async-Await), Tailwind CSS (CDN)
- **Back-end:** Node.js, Express, Nodemon
- **Banco de Dados:** MySQL (Driver `mysql2`)
- **Versionamento:** Git & GitHub

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado
- Servidor MySQL rodando localmente (com o schema `cozinha_japonesa` criado)

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/EzaquielAngel/Sistema-Profissional-de-Cozinha.git](https://github.com/EzaquielAngel/Sistema-Profissional-de-Cozinha.git)
   cd Sistema-Profissional-de-Cozinha
