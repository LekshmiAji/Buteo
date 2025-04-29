import { test, expect } from '@playwright/test';
import { getAuthHeaders } from '../../utils/auth.js'; // Adjust path as needed

test('Create DELETE API request', async ({ request }) => {
  const headers = getAuthHeaders(); // ✅ No await needed if it's a sync function

  const response = await request.delete('/user/contact/10', { headers });

  if (response.ok()) {
    const data = await response.json();
    console.log('Contact Data:', data);
  } else {
    console.error('Failed to fetch contact data:', response.status());
  }

  expect(response.ok()).toBeTruthy(); // Optional assertion
});
