# 💻 Calculadora CLT x PJ

Aplicação full stack para comparar salários CLT e PJ, com autenticação de usuários e registro de logs das operações.

---

## 🚀 Funcionalidades

- 🔐 Cadastro e login de usuários (JWT)
- 📊 Cálculo CLT → PJ e PJ → CLT
- 🧾 Detalhamento completo dos descontos
- 🗄️ Registro automático de logs no banco de dados
- 📱 Interface responsiva (Bootstrap)
- 🔒 Rotas protegidas com autenticação

---

## 🛠️ Tecnologias

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (autenticação)
- Bcrypt (hash de senha)
- CORS

### Frontend
- React
- Bootstrap

---

## 📸 Telas da aplicação
<img width="1167" height="729" alt="login" src="https://github.com/user-attachments/assets/5ad68093-ddf7-481f-82b4-bf8d20dc8393" />
<img width="1167" height="729" alt="dashboard2" src="https://github.com/user-attachments/assets/27d20d12-1a7a-4ec5-b09e-b68feb4bae9c" />

<img width="1167" height="729" alt="dashboard1" src="https://github.com/user-attachments/assets/998ed849-4c06-4ffd-8bca-515a40d5bef7" />


## 🧾 Logs das operações

Todas as operações realizadas são registradas automaticamente no banco de dados PostgreSQL.

Cada cálculo gera um log contendo:

- Tipo da operação (CLT → PJ ou PJ → CLT)
- Valor informado pelo usuário
- Resultado calculado
- Data e hora da operação

### 📊 Exemplo:

```sql
SELECT * FROM logs;

# ⚙️ INSTALAÇÃO COMPLETA (PASSO A PASSO)

---

## 📦 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/calculadora-clt-pj.git
cd calculadora-clt-pj

🗄️ 2. Instalar PostgreSQL (Linux)
sudo apt update
sudo apt install postgresql postgresql-contrib -y

🔐 3. Acessar o PostgreSQL
sudo -u postgres psql
🏗️ 4. Criar banco de dados
CREATE DATABASE calculadora;
🔄 5. Conectar ao banco
\c calculadora
🧾 6. Criar tabelas
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  type TEXT,
  input_value NUMERIC,
  result_value NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🔧 7. Rodar o backend
cd backend
npm install
node server.js

Servidor rodando em:

http://localhost:3000
🎨 8. Rodar o frontend
cd frontend
npm install
PORT=3001 npm start

Acesse:

http://localhost:3001
🔑 COMO USAR O SISTEMA
👤 1. Cadastro

Na tela de login:

Digite email
Digite senha
Clique em Cadastrar
🔐 2. Login
Digite email e senha
Clique em Entrar
🧮 3. Cálculo
Escolha o tipo:
CLT → PJ
PJ → CLT
Digite o valor
Clique em Calcular
📊 4. Resultado

O sistema mostra:

CLT:
Bruto
INSS
IRRF
Líquido
PJ:
Bruto
DAS
ISS
IRRF
INSS
Líquido
🧾 5. Logs

Cada cálculo é salvo automaticamente no banco de dados.

🔎 Como visualizar logs
sudo -u postgres psql calculadora
SELECT * FROM logs;
📊 REGRAS DE NEGÓCIO
CLT
INSS: 10%
IRRF: 7.5%
PJ
DAS: 6%
ISS: 5%
IRRF: 7.5%
INSS: 11%
🔒 SEGURANÇA
Senhas criptografadas com bcrypt
Autenticação via JWT
Rotas protegidas com middleware
Token armazenado no frontend
