import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  if (!token) {
    throw new Error('❌ Token is empty. Please check the login process.');
  }
  console.log('✅ Loaded Token:', token);

  try {
    const apiContext = request;

    // Make sure you are sending the token in the authorization header
    const response = await apiContext.put('http://202.88.237.201:9988/user/editProfile', {
      headers: {
        'Authorization': `Bearer ${token}`, // Send token as Bearer
      },
      data: {
        "first_name": firstName,    // Using dynamic firstName
        "last_name": lastName,      // Using dynamic lastName
        "city": "New York@123",     // Special character might need URL encoding
      },
    });

    const responseBody1 = await response.json();
    console.log('Response:', responseBody1);
    expect(response.ok()).toBeTruthy(); // Ensure the request was successful

  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});
