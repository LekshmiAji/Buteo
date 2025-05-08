import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });
const firstName=faker.person.firstName()
const lastname = faker.person.lastName()
const randomEmail = faker.internet.email();
const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    const response = await request.post('http://202.88.237.201:9988/user/contact', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        "first_name": firstName,
  "middle_name": "M",
  "last_name": lastname,
  "profile": "/profile/img.jpeg",
  "company_name": "tech",
  "title": "v",
  "emails": [
    {
      "email_id": randomEmail,
      "primary": true,
      "type": "work"
    }
  ],
  "phones": [
    {
      "phone": "",
      "primary": true,
      "type": "home"
    }
  ],
  "websites": [
    {
      "websitUrl": "http://202.88.237.201:9988/user/contact",
      "primary": true,
      "type": "home"
    }
  ],
  "address": [
    {
      "street": "Sringar",
      "city": "tvm",
      "state": "kerala",
      "postal_code": "123456",
      "country": "",
      "type": "work"
    }
  ]
      },
    });

    const responseBody1 = await response.json();
    console.log(responseBody1);
    
  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});

            
            
            
            
            
            
            
            
            
            
            
            
  