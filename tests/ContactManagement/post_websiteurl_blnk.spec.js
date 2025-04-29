import { test, expect } from '@playwright/test';
test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('user/contact', {
    data: {
    "first_name": "Sarika",
  "middle_name": "M",
  "last_name": "ddfsd",
  "profile": "/profile/img.jpeg",
  "company_name": "tech",
  "title": "v",
  "emails": [
    {
      "email_id": "sarika@gmail.com",
      "primary": true,
      "type": "work"
    }
  ],
  "phones": [
    {
      "phone": "7358849967",
      "primary": true,
      "type": "home"
    }
  ],
  "websites": [
    {
      "websitUrl": "",
      "primary": true,
      "type": "home"
    }
  ],
  "address": [
    {
      "street": "Srinagar",
      "city": "ngl",
      "state": "tn",
      "postal_code": "6409",
      "country": "in",
      "type": "work"
    }
  ]
      },
    });
    const responseBody1 = await postResponse1.json();
    console.log(responseBody1);
  });
