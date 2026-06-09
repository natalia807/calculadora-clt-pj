const { test, expect } = require('@playwright/test');

test('deve cadastrar usuário', async ({ request }) => {

  const email = `teste_${Date.now()}@email.com`;

  const response = await request.post(
    'http://localhost:3000/register',
    {
      data: {
        email,
        password: '123456'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.message).toBe(
    'Usuário criado com sucesso'
  );
});