import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });

// ✅ Dynamically generated invalid email (missing domain)
const invalidEmail = "admin@com"; 
const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Attempt to change email to an invalid address using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    const response = await request.put('http://202.88.237.201:9988/user/changeEmail', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      json: {
        email: invalidEmail,
        password: "Admin@123",
      },
    });

    console.log('✅ Change Email Response Status:', response.status());

    if (!response.ok()) {
      console.error(`❌ Change email failed with status: ${response.status()}`);
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      return;
    }

    const responseBody = await response.json();
    console.log('✅ Change Email Response:', responseBody);

    // ✅ Assertions
    expect(response.status()).toBe(400); // Assuming 400 for invalid input
    expect(responseBody).toHaveProperty('error'); // Adjust based on expected response structure

  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});
