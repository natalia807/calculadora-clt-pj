// calcula CLT líquido
function calcularCLT(bruto) {
  const inss = bruto * 0.10;
  const irrf = bruto * 0.075;

  const liquido = bruto - (inss + irrf);

  return liquido;
}

// calcula PJ líquido
function calcularPJ(bruto) {
  const das = bruto * 0.06;
  const iss = bruto * 0.05;
  const irrf = bruto * 0.075;
  const inss = bruto * 0.11;

  const liquido = bruto - (das + iss + irrf + inss);

  return liquido;
}

// CLT -> PJ
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

//CLT -> PJ
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

function logOperation(type, input, result) {
  console.log("===== LOG =====");
  console.log("Tipo:", type);
  console.log("Entrada:", input);
  console.log("Resultado:", result);
  console.log("Data:", new Date());
  console.log("================");
}

// TESTE
const resultado = cltToPj(3000);
console.log("Para um CLT de 3000, o PJ mínimo é:", resultado);