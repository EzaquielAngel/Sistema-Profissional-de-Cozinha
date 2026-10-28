# 🍣 Cozinha Japonesa - Sistema de Gerenciamento de Restaurante (SQL)

![Status do Projeto](https://img.shields.io/badge/status-em_desenvolvimento-yellow)
![Tecnologia](https://img.shields.io/badge/database-MySQL-blue)

Este repositório contém o modelo relacional e os scripts DDL/DML para a criação de um banco de dados voltado ao gerenciamento de um restaurante de **Cozinha Japonesa**. 

O objetivo deste projeto é demonstrar na prática conceitos fundamentais de modelagem de dados, criação de tabelas, controle de estoque, associação através de chaves estrangeiras (`FOREIGN KEY`) e estruturação de rotinas em SQL.

---

## 📌 Status do Projeto
> ⚠️ **Em desenvolvimento:** Este projeto faz parte do meu portfólio de estudos de Banco de Dados. A estrutura base e os relacionamentos principais foram modelados, e novas tabelas, procedimentos e scripts de povoamento estão sendo adicionados incrementalmente.

---

## 🗄️ Estrutura do Banco de Dados

O modelo de dados contempla a gestão de pratos, equipe de cozinheiros, histórico de preparo de refeições e controle de insumos/ingredientes.

### Diagrama Entidade-Relacionamento (Simplificado)

- **`pratos`**: Armazena o cardápio (nome, tipo/categoria e tempo de preparo).
- **`cozinheiros`**: Registra os profissionais da cozinha, nível de experiência e especialidade.
- **`preparo`**: Tabela associativa que registra a produção diária, vinculando qual cozinheiro preparou determinado prato, a quantidade e a data.
- **`ingredientes`**: Mantém o controle do estoque atual de insumos do restaurante.
- **`receitas`** *(em desenvolvimento)*: Mapeará a relação *N:M* entre pratos e ingredientes necessários para a produção.

---

## 🛠️ Tecnologias Utilizadas

* **SQL / MySQL** (DDL para criação do schema e DML para manipulação)
* **Git & GitHub** para controle de versão

---

## 🚀 Como Executar o Script Localmente

1. Certifique-se de ter um SGBD instalado (ex: MySQL Workbench, DBeaver ou phpMyAdmin).
2. Clone este repositório:
   ```bash
   git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
