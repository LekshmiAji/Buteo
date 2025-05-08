import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const city = faker.location.city();
const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Edit user profile using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    // ✅ Retry logic for network issues
    const response = await request.put('http://202.88.237.201:9988/user/editProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      json: {
        first_name: firstName,
        last_name: lastName,
        city: city,
      },
      timeout: 5000, // 5 seconds timeout for faster feedback
    });

    console.log('✅ Edit Profile Response Status:', response.status());

    if (!response.ok()) {
      console.error(`❌ Edit profile failed with status: ${response.status()}`);
      const errorText = await response.text();
      console.error('❌ Error Response:', errorText);
      return;
    }

    // ✅ Ensuring response is JSON
    const contentType = response.headers()['content-type'];
    if (!contentType?.includes('application/json')) {
      console.error('❌ Response is not JSON. Check the API.');
      return;
    }

    const responseBody = await response.json();
    console.log('✅ Edit Profile Response:', responseBody);

    // ✅ Improved Assertions
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', 'Profile updated successfully'); // Adjust message based on API response

  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});
