const { test, expect } = require('@playwright/test');

test('deve realizar login', async ({ request }) => {

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

  const response = await request.post(
    'http://localhost:3000/login',
    {
      data: {
        email,
        password: '123456'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.token).toBeDefined();
});