import { test, expect } from '@playwright/test';
test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('user/contact', {
    data: {
       "first_name": "111",
  "middle_name": "M",
  "last_name": "ddfsd",
  "profile": "/profile/img.jpeg",
  "company_name": "tech",
  "title": "v",
  "emails": [
    {
      "email_id": "sarcikn1n@gmail.com",
      "primary": true,
      "type": "work"
    }
  ],
  "phones": [
    {
      "phone": "7358849967",
      "primary": true,
      "type": "ho8888me"
    }
  ],
  "websites": [
    {
      "websitUrl": "{{base_url}}user/contact",
      "primary": true,
      "type": "home"
    }
  ],
  "address": [
    {
      "street": "566",
      "city": "777",
      "state": "kerala",
      "postal_code": "123456",
      "country": "india",
      "type": "work"
    }
  ]
      },
    });
    const responseBody1 = await postResponse1.json();
    console.log(responseBody1);
  });
