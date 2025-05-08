import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

dotenv.config({ path: './tests/.env' });
const firstName=faker.person.firstName()
const dueDate = faker.date.soon(30).toISOString();
const customUrl = `https://${faker.internet.domainName()}/path/to/resource`;
const TOKEN_PATH = path.join(process.cwd(), 'token.txt'); // Absolute path
//const phoneNumber = faker.phone.number('+1-###-###-####');
test('Load another page using saved token', async ({ request }) => {
  console.log('✅ Checking if token file exists at:', TOKEN_PATH);

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error('❌ Token file not found. Please run the login test first.');
  }

  const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
  console.log('✅ Loaded Token:', token);

  try {
    const response = await request.post('http://202.88.237.201:9988/task/create', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
       
  "title": "APITASK",
  "description": "Detailed description of the task",
  "matter_id": 1,
  "assigned_to": 2,
  "priority": "High",
  "due_date": dueDate,
  "status": "In Progress",
  "attachments": [
    {
      "id": 21,
      "url": customUrl,
      "name": "NewImage"
    }
  ]
      },
    });

    const responseBody1 = await response.json();
    console.log(responseBody1);
    
  } catch (error) {
    console.error('❌ Error accessing protected route:', error);
  }
});

            
            
            
            
            
            
            
            
            
            
            
            
  