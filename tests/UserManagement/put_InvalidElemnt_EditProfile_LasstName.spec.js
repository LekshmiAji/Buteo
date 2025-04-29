import { test, expect, request } from '@playwright/test';

test('Create PUT API request', async ({ request }) => {
  const apiContext = request;

  const response = await apiContext.put('user/editProfile', {
    data: {
        "first_name": "John",
        "last_name": "Doe@123",
        "city": "New York"
      },
    });
    
    });