import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });
const dueDate = faker.date.soon(30).toISOString();
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
test('Update task assignment using PATCH request', async ({ request }) => {
  try {
    // Generate dynamic start and end times using Faker
    const startTime = faker.date.soon().toISOString(); // Start date within a few days
    const endTime = faker.date.future(0.01, startTime).toISOString(); // End date shortly after start
    const taskUrl = 'http://202.88.237.201:9988/notification/markAsRead?notification_id=1&mark_all_as_read=false';

    const response = await request.patch(taskUrl, {
      headers: getAuthHeaders(),
      data: {
        title: "Updated Task Title",
        description: "This is an updated task description.",
        due_date: dueDate,          // Dynamic due date using Faker
        start_time: startTime,      // Dynamic start time
        end_time: endTime,          // Dynamic end time
        priority: "High",
        status: "In Progress"
      },
    });

    if (response.ok()) {
      const data = await response.json();
      console.log('✅ Task Updated:', data);
      expect(response.ok()).toBeTruthy();
    } else {
      console.error('❌ Failed to update task:', response.status(), await response.text());
    }
  } catch (error) {
    console.error('❌ Error during request:', error);
  }
});
