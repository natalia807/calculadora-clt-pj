const { test, expect } = require('@playwright/test');

test('deve calcular CLT para PJ', async ({ request }) => {

  const email = `teste_${Date.now()}@email.com`;

  await request.post(
    'http://localhost:3000/register',
    {
      data: {
        email,
        password: '123456'
      }
    }
  );

  const login = await request.post(
    'http://localhost:3000/login',
    {
      data: {
        email,
        password: '123456'
      }
    }
  );

  const { token } = await login.json();

  const response = await request.post(
    'http://localhost:3000/calculate',
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        type: 'CLT_TO_PJ',
        value: 5000
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.clt).toBeDefined();
  expect(body.pj).toBeDefined();
});