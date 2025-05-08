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
    'Content-Type': 'application/json',
  };
}

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  const headers = getAuthHeaders(); // ✅ This already has the token

  const response = await request.put('http://202.88.237.201:9988/user/changeEmail', {
    headers, // ✅ Using the headers with the token
    json: {
      email: 'admin@gmail.com',
      password: 'Admin@123'
    }
  });

  console.log('✅ Change Email Response Status:', response.status());

  if (!response.ok()) {
    console.error(`❌ Change email failed with status: ${response.status()}`);
    const errorText = await response.text();
    console.error('❌ Error Response:', errorText);
    return;
  }

  const changeEmailData = await response.json();
  console.log('✅ Change Email Response:', changeEmailData);

  // ✅ Assertions
  expect(response.status()).toBe(200);
  expect(changeEmailData).toHaveProperty('message'); // Adjust based on expected response
});
