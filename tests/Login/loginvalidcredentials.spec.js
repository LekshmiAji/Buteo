// Load Playwright module
import { test, expect } from '@playwright/test';

//const { test, expect } = require('@playwright/test');


// Write a test
test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('auth/login', {
    data: {
      "email": "admin@gmail.com",
      "password": "Admin@123",
      "type": "platform"
    }
  });

  const responseBody1 = await postResponse1.json();
  console.log(responseBody1);
});
