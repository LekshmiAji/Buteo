import { test, expect } from '@playwright/test';
import { getAuthHeaders } from '../../utils/auth.js'; // Adjust path as needed
test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('auth/register', {
    data: {
        
      "first_name":"LekshmiMohan",
  "last_name": "Sivani",
  "email": "",
  "country":"India",
  "organization_id": 1,
  "role_id": 2,
  "password":"Ammu@123",
  "confirmPassword": "Ammu@123",
  "description": "dnew USer"
        },
    });
    const responseBody1 = await postResponse1.json();
    console.log(responseBody1);
  });
