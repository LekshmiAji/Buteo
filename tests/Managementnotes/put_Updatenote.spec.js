import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });
const TOKEN_PATH = path.join(process.cwd(), 'token.txt');

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

// ✅ Test Block
test.describe('API Tests - Update Task Assignment', () => {
  test('Update task assignment using PATCH request', async ({ request }) => {
    try {
      const taskUrl = 'http://202.88.237.201:9988/matter/note';
      const response = await request.put(taskUrl, {
        headers: getAuthHeaders(),
        data: {
          note_id: 1,
          note_title: "testj",
          note: "note",
          matter_id: 1
        },
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      console.log('✅ Task Updated:', data);
      expect(data.statusCode).toBe(200);
      expect(data.message).toBe('Notes updated.');

    } catch (error) {
      console.error('❌ Error during request:', error.message);
      throw error; // Re-throw to ensure test fails
    }
  });
});
