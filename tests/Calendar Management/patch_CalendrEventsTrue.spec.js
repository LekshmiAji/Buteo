import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });

const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

// ✅ Function to get Authorization header with token
function getAuthHeaders() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  return {
    Authorization: `Bearer ${token}`,
  };
}

// ✅ Playwright Test Block
test('Update calendar event using PATCH request', async ({ request }) => {
  // Generate dynamic start and end times using Faker
  const startTime = faker.date.soon().toISOString(); // Start date within a few days
  const endTime = faker.date.future(0.01, startTime).toISOString(); // End date shortly after start

  try {
    const response = await request.patch('http://202.88.237.201:9988/calendar/update/event/1', {
      headers: getAuthHeaders(), // Using the function for Authorization
      data: {
        "title": "New Meeting",
        "priority": "High Priority",
        "status": "In Progress",
        "description": "Discuss project updates.",
        "matter_id": 1,
        "task_id": 2,
        "start_time": startTime,
        "end_time": endTime,
        "created_by": 1,
        "attachments": [
          {
            "id": 21,
            "url": "https://fastly.picsum.photos/id/118/200/300.jpg?hmac=y5ur5cobUmPTuS2C6FvS8uE6IYI07GiElMbvlmulnUA",
            "name": "NewImage"
          }
        ],
        "attendees": [
          {
            "attendee": 2,
            "email": "attendee@example.com",
            "is_optional": true
          }
        ]
      },
    });

    const responseBody1 = await response.json();
    console.log('✅ Response:', responseBody1);
    expect(response.ok()).toBeTruthy(); // Ensure the request was successful
    
  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});
