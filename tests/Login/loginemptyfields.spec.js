import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './tests/.env' });

test('Create Post API request', async ({ request }) => {
  //const baseURL = process.env.BASE_URL;
    const postResponse1 = await request.post('http://202.88.237.201:9988/auth/login', {
      data: {
      email: "",
      password: "",
      type: 'platform', // Uncomment if needed
    },
      });
 
  const status = postResponse1.status();
  console.log('Status:', status);

 const contentType = postResponse1.headers()['content-type'];
  console.log('Content-Type:', contentType);

  const rawText = await postResponse1.text();
  console.log('Raw Response Text:', rawText);

  if (contentType && contentType.includes('application/json')) {
    const jsonData = JSON.parse(rawText);
    console.log('Parsed JSON:', jsonData);
  } else {
    console.warn('Response is not JSON. Check the endpoint or credentials.');
  }
});
