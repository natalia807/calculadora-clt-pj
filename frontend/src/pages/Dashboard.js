import { useState } from "react";
import { calculate } from "../services/api";

function Dashboard() {
  const [type, setType] = useState("CLT_TO_PJ");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  async function handleCalculate() {
    const token = localStorage.getItem("token");

    const data = await calculate(token, type, Number(value));

    setResult(data);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  function format(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 w-100" style={{ maxWidth: "400px" }}>

        <button className="btn btn-danger mb-3" onClick={handleLogout}>
          Sair
        </button>

        <h2 className="text-center mb-4">Calculadora CLT & PJ</h2>

        <select
          className="form-select mb-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="CLT_TO_PJ">CLT → PJ</option>
          <option value="PJ_TO_CLT">PJ → CLT</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Digite o valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={handleCalculate}>
          Calcular
        </button>

        {result && (
          <div className="mt-4">

            <div className="alert alert-primary">
              <h5>CLT</h5>
              <p>Bruto: {format(result.clt.bruto)}</p>
              <p>INSS: -{format(result.clt.inss)}</p>
              <p>IRRF: -{format(result.clt.irrf)}</p>
              <strong>Líquido: {format(result.clt.liquido)}</strong>
            </div>

            <div className="alert alert-success">
              <h5>PJ</h5>
              <p>Bruto: {format(result.pj.bruto)}</p>
              <p>DAS: -{format(result.pj.das)}</p>
              <p>ISS: -{format(result.pj.iss)}</p>
              <p>IRRF: -{format(result.pj.irrf)}</p>
              <p>INSS: -{format(result.pj.inss)}</p>
              <strong>Líquido: {format(result.pj.liquido)}</strong>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;