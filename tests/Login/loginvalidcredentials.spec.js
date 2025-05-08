import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config({ path: './tests/.env' });

const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Create Post API request', async ({ request }) => {
  const baseURL = process.env.BASE_URL;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  //const loginUrl = `${baseURL}/auth/login`;
  const loginUrl = `${process.env.BASE_URL}/auth/login`;
console.log(loginUrl);
  try {
    const postResponse1 = await request.post('http://202.88.237.201:9988/auth/login', {
     
      data: {
        email: adminEmail,
        password: adminPassword,
        type: 'platform',
      },
    });

    const status = postResponse1.status();
    console.log('✅ Login Status:', status);

    const rawText = await postResponse1.text();
    console.log('✅ Raw Response Text:', rawText);

    if (postResponse1.headers()['content-type']?.includes('application/json')) {
      const jsonData = JSON.parse(rawText);
      console.log('✅ Parsed JSON:', jsonData);

      const token = jsonData.data?.token;

      if (token) {
        fs.writeFileSync(TOKEN_PATH, token);
        console.log('✅ Token saved successfully at:', TOKEN_PATH);
      } else {
        console.error('❌ Token not found in the response. Full Response:', JSON.stringify(jsonData, null, 2));
      }
    } else {
      console.error('❌ Response is not JSON. Check the endpoint or credentials.');
    }
  } catch (error) {
    console.error('❌ Error during login request:', error);
  }
});

