import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: './tests/.env' });

const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Change password using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    const response = await request.put('http://202.88.237.201:9988/user/changePassword', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      json: {
        currentPassword: "Admin@123", // ✅ Removed leading space
        newPassword: "Admin123",
      },
    });

    console.log('✅ Change Password Response Status:', response.status());

    if (!response.ok()) {
      console.error(`❌ Change password failed with status: ${response.status()}`);
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      return;
    }

    const responseBody = await response.json();
    console.log('✅ Change Password Response:', responseBody);

    // ✅ Assertions
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message'); // Adjust based on expected response structure

  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});
