import { test, expect, request } from '@playwright/test';

test('Create PUT API request', async ({ request }) => {
  const apiContext = request;

  const response = await apiContext.put('user/invalidEmail', {
    data: {
        "email": "admin@com",
        "password": "Admin@123"
      },
    });
    
    });