// Load Playwright module
import { test, expect } from '@playwright/test';

// Write a test
test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('auth/login', {
    data: {
        
            "email": " ",
           "password": " ",
            "type": "platform"
          
    },
  });

 
});