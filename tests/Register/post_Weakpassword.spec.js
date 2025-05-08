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

  try {
    const response = await request.post('http://202.88.237.201:9988/auth/register', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        "first_name":"Sivani",
        "last_name": "Sivani",
        "email": "sivni@gmail.com",
        "country": "India",
        "organization_id": 1,
        "role_id": 0.2,
        "password":"ammu123",
        "confirmPassword": "ammu123",
        "description": "new User"
      },
    });

    const status = response.status();
    console.log('✅ Protected Page Status:', status);
    expect(status).toBe(200);

    const pageContent = await response.text();
    console.log('✅ Protected Page Content:', pageContent);
  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});

            
            
            
            
            
            
            
            
            
            
            
            
  