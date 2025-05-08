import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });

// Generate random start and end times using Faker
const startTime = faker.date.soon().toISOString(); // Start date within a few days
const endTime = faker.date.future(0.01, startTime).toISOString(); // End date shortly after start

const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    const response = await request.post('http://202.88.237.201:9988/calendar/create/event', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
      "title": "Team Meeting",
  "priority": "High Priority",
  "status": " 123 ",
  "description": "Discuss project updates.",
  "matter_id": 1,
  "task_id": 2,
  "start_time": startTime,
  "end_time": endTime,
  "created_by": 1,
  "location": "india",
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
      "is_optional": true
    }
  ]
      },
    });

    const responseBody1 = await response.json();
    console.log('Response:', responseBody1);
    
  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});
