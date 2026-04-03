const express = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "segredo_super_secreto";

// TESTE DE CONEXÃO
pool.query("SELECT current_database()")
  .then(res => console.log("BANCO:", res.rows[0].current_database))
  .catch(err => console.error("ERRO AO CONECTAR NO BANCO:", err));

// =========================
// MIDDLEWARE
// =========================

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

// =========================
// FUNÇÕES DE CÁLCULO (DETALHADAS)
// =========================

function calcularCLT(bruto) {
  const inss = bruto * 0.10;
  const irrf = bruto * 0.075;
  const liquido = bruto - (inss + irrf);

  return { bruto, inss, irrf, liquido };
}

function calcularPJ(bruto) {
  const das = bruto * 0.06;
  const iss = bruto * 0.05;
  const irrf = bruto * 0.075;
  const inss = bruto * 0.11;
  const liquido = bruto - (das + iss + irrf + inss);

  return { bruto, das, iss, irrf, inss, liquido };
}

function cltToPj(cltBruto) {
  const clt = calcularCLT(cltBruto);
  let pjBruto = cltBruto;

  while (true) {
    const pj = calcularPJ(pjBruto);

    if (pj.liquido >= clt.liquido) {
      return { clt, pj };
    }

    pjBruto += 100;
  }
}

function pjToClt(pjBruto) {
  const pj = calcularPJ(pjBruto);
  let cltBruto = pjBruto;

  while (true) {
    const clt = calcularCLT(cltBruto);

    if (clt.liquido >= pj.liquido) {
      return { clt, pj };
    }

    cltBruto += 100;
  }
}

// =========================
// ROTAS
// =========================

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    return res.json({ message: "Usuário criado com sucesso" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no login" });
  }
});

// CALCULATE
app.post("/calculate", authMiddleware, async (req, res) => {
  try {
    const { type, value } = req.body;

    let result;

    if (type === "CLT_TO_PJ") {
      result = cltToPj(value);
    } else if (type === "PJ_TO_CLT") {
      result = pjToClt(value);
    } else {
      return res.status(400).json({ error: "Tipo inválido" });
    }

    await pool.query(
      "INSERT INTO logs (type, input_value, result_value) VALUES ($1, $2, $3)",
      [type, value, result.pj.bruto] // salvando valor final
    );

    return res.json(result);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao processar cálculo" });
  }
});

// START
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});