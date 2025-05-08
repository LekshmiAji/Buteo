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
//const phoneNumber = faker.phone.number('+1-###-###-####');
test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    const response = await request.post('http://202.88.237.201:9988/client/add-client', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
       "first_name":firstName,
  "last_name": lastname,
  "email": randomEmail,
   "phone_number": "857^&&330",
  "street": "789 Pine St",
  "state": "1233",
  "country": "India",
  "postal_code": "695011",
  "client_type": 12
      },
    });

    const responseBody1 = await response.json();
    console.log(responseBody1);
    
  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});

            
            
            
            
            
            
            
            
            
            
            
            
  