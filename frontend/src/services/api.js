const API_URL = "http://localhost:3000";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return response.json();
}
export async function register(email, password) {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return response.json();
}
export async function calculate(token, type, value) {
  try {
    const response = await fetch(`${API_URL}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ type, value })
    });

    console.log("STATUS:", response.status);

    const text = await response.text(); // 👈 pega como texto primeiro
    console.log("RESPOSTA BRUTA:", text);

    const data = JSON.parse(text); // tenta converter

    return data;

  } catch (error) {
    console.error("ERRO NO FETCH:", error);
    throw error;
  }
}