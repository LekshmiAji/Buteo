import { test, expect, request } from '@playwright/test';

test('Create PUT API request', async ({ request }) => {
  const apiContext = request;

  const response = await apiContext.put('user/contact/12', {
    data: {
      first_name: "Sarika",
      middle_name: "M",
      last_name: "ddfsd",
      profile: "/profile/img.jpeg",
      company_name: "tech",
      title: "v",
      emails: [
        {
          email_id: "sarika@gmail.com",
          primary: true,
          type: "work"
        }
      ],
      phones: [
        {
          phone: "7358849967",
          primary: true,
          type: "home"
        }
      ],
      websites: [
        {
          websitUrl: "",
          primary: true,
          type: "home"
        }
      ],
      address: [
        {
          street: "Srinagar",
          city: "ngl",
          state: "tn",
          postal_code: "6409",
          country: "in",
          type: "work"
        }
      ]
    }
  });

  expect(response.ok()).toBeTruthy(); // Optional: check if the PUT was successful
  const responseBody = await response.json();
  console.log(responseBody);
});