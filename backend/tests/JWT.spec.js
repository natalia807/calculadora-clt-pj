const { test, expect } = require('@playwright/test');

test('não deve calcular sem token', async ({ request }) => {

  const response = await request.post(
    'http://localhost:3000/calculate',
    {
      data: {
        type: 'CLT_TO_PJ',
        value: 5000
      }
    }
  );

  expect(response.status()).toBe(401);
});