import { test, expect } from '@playwright/test';
import { getAuthHeaders } from '../utils/auth.js';

test('GET user contact with auth', async ({ request }) => {
  const headers = getAuthHeaders(); // Correct usage
  const response = await request.get('/user/contact/10', { headers });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  console.log(data);
});
