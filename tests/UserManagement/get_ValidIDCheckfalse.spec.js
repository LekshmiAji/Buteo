import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: './tests/.env' });

const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

// ✅ Function to get Authorization header with token
function getAuthHeaders() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  return {
    Authorization: `Bearer ${token}`,
  };
}

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  const headers = getAuthHeaders(); // ✅ No await needed if it's a sync function

  const response = await request.get('http://202.88.237.201:9988/user/profile/0', {
    headers,
  });

  console.log('✅ Response Status:', response.status());
  const responseData = await response.json();
  console.log('✅ User Profile Response:', responseData);

  if (!response.ok()) {
    console.error(`❌ User profile fetch failed with status: ${response.status()}`);
    return;
  }

  // ✅ Assertions
  expect(response.status()).toBe(200);
  expect(responseData).toHaveProperty('data');
});
