import { test, expect, request } from '@playwright/test';

test('Create PUT API request', async ({ request }) => {
  const apiContext = request;

  const response = await apiContext.put('user/editProfile', {
    data: {
        "first_name": "John@123",
        "last_name": "Doe",
        "city": "New York"
      },
    });
    
    });