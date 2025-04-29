import { test, expect, request } from '@playwright/test';

test('Create PUT API request', async ({ request }) => {
  const apiContext = request;

  const response = await apiContext.put('user/changePassword', {
    data: {
        "currentPassword": " Admin@123",
        "newPassword": "Admin123"
      },
    });
    
    });