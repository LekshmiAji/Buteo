import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  const headers = getAuthHeaders(); // ✅ No await needed if it's a sync function

  try {
    const response = await request.delete('http://202.88.237.201:9988/client/remove-client/1', {
      headers,
    });

    if (response.ok()) {
      const data = await response.json();
      console.log('✅ Contact Deleted Successfully:', data);
    } else {
      console.error('❌ Failed to delete contact:', response.status(), await response.text());
    }

    expect(response.ok()).toBeTruthy(); // Optional assertion
  } catch (error) {
    console.error('❌ Error during request:', error);
  }
});

            
            
            
            
            
            
            
            
            
            
            
  