const express = require("express");

const app = express();
app.use(express.json());

function calcularCLT(bruto) {
  const inss = bruto * 0.10;
  const irrf = bruto * 0.075;
  return bruto - (inss + irrf);
}

function calcularPJ(bruto) {
  const das = bruto * 0.06;
  const iss = bruto * 0.05;
  const irrf = bruto * 0.075;
  const inss = bruto * 0.11;
  return bruto - (das + iss + irrf + inss);
}

function cltToPj(cltBruto) {
  const cltLiquido = calcularCLT(cltBruto);
  let pjBruto = cltBruto;

  while (true) {
    const pjLiquido = calcularPJ(pjBruto);

    if (pjLiquido >= cltLiquido) {
      return pjBruto;
    }

    pjBruto += 100;
  }
}

function pjToClt(pjBruto) {
  const pjLiquido = calcularPJ(pjBruto);

  let cltBruto = pjBruto;

  while (true) {
    const cltLiquido = calcularCLT(cltBruto);

    if (cltLiquido >= pjLiquido) {
      return cltBruto;
    }

    cltBruto += 100;
  }
}

app.post("/calculate", (req, res) => {
  const { type, value } = req.body;

  let result;

  if (type === "CLT_TO_PJ") {
    result = cltToPj(value);
  } else if (type === "PJ_TO_CLT") {
    result = pjToClt(value);
  } else {
    return res.status(400).json({ error: "Tipo inválido" });
  }

  // LOG COMPLETO
  console.log("===== LOG =====");
  console.log("Tipo:", type);
  console.log("Entrada:", value);
  console.log("Resultado:", result);
  console.log("Data:", new Date());
  console.log("================");

  return res.json({ result });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});