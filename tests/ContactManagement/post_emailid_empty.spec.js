import { test, expect } from '@playwright/test';
test('Create Post API request', async ({ request }) => {
  const postResponse1 = await request.post('user/contact', {
    data: {
       "first_name": "Sarika",
  "middle_name": "M",
  "last_name": "Siva",
  "profile": "/profile/img.jpeg",
  "company_name": "",
  "title": "v",
  "emails": [
    {
      "email_id": "",
      "primary": true,
      "type": "work"
    }
  ],
  "phones": [
    {
      "phone": "7358849954",
      "primary": true,
      "type": "home"
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
