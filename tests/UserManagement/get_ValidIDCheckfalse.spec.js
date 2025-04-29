import { test, expect, request } from '@playwright/test';

test('Create GET API request', async ({ request }) => {
  const apiContext = request; // use the injected `request` fixture

  const response = await apiContext.get('user/profile/0');

  if (response.ok()) {
    const data = await response.json();
    console.log('Contact Data:', data);
  } else {
    console.error('Failed to fetch contact data:', response.status());
  }
});
