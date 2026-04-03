import { useState } from "react";
import { login, register } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      onLogin(data.token);
    } else {
      alert(data.error || "Erro no login");
    }
  }

  async function handleRegister() {
    const data = await register(email, password);

    if (data.message) {
      alert("Usuário cadastrado com sucesso!");
    } else {
      alert(data.error || "Erro ao cadastrar");
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 w-100" style={{ maxWidth: "400px" }}>

        <h2 className="text-center mb-4">Login</h2>

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100 mb-2"
          onClick={handleLogin}
        >
          Entrar
        </button>

        <button
          className="btn btn-secondary w-100"
          onClick={handleRegister}
        >
          Cadastrar
        </button>

      </div>
    </div>
  );
}

export default Login;