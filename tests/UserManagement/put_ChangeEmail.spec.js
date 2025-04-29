import { test, expect, request } from '@playwright/test';

test('Create PUT API request', async ({ request }) => {
  const apiContext = request;

  const response = await apiContext.put('user/changeEmail', {
    data: {
        "email": "admin@gmail.com",
                "password": "Admin@123"
      },
    });
    
    });