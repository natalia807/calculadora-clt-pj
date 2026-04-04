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
