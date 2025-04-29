import { test, expect } from '@playwright/test';

test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('auth/login', {
    data: {
      "email": "",
      "password": "Admin@123",
      "type": "platform"
    },
  });

});