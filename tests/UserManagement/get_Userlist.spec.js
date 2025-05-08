import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: './tests/.env' });

const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const userListUrl = 'http://202.88.237.201:9988/user/userList?limit=2&page=1';
  console.log('User List URL:', userListUrl);

  const userListResponse = await request.get(userListUrl, {
    headers,
  });

  const status = userListResponse.status();
  console.log('✅ User List Response Status:', status);

  if (userListResponse.headers()['content-type']?.includes('application/json')) {
    const userListData = await userListResponse.json();
    console.log('✅ User List Response Data:', userListData);

    expect(status).toBe(200);
    expect(userListData).toHaveProperty('data');
  } else {
    console.error('❌ Response is not JSON. Check the URL or token.');
  }
});
