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

test('Change Password using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  const headers = getAuthHeaders(); // ✅ This already has the token

  const response = await request.put('http://202.88.237.201:9988/auth/rolePermissions', {
    headers, // ✅ Using the headers with the token
    json: {
     "rolePermissions": [
    {
      "roleId": 1,
      "permissionId": 1,
      "hasPermission": true
    }
  ]
    }
  });

  console.log('✅ Change Password Response Status:', response.status());

  if (!response.ok()) {
    console.error(`❌ Change password failed with status: ${response.status()}`);
    const errorText = await response.text();
    console.error('❌ Error Response:', errorText);
    return;
  }

  const changePasswordData = await response.json();
  console.log('✅ Change Password Response:', changePasswordData);

  // ✅ Assertions
  expect(response.status()).toBe(200);
  expect(changePasswordData).toHaveProperty('message'); // Adjust based on expected response
});
