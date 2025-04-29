// utils/auth.js
export function getAuthHeaders() {
  return {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJzZXNzaW9uX2lkIjoiNGRmNTA2MTUtMDQ3Ni00ZDhjLTk2MTMtYzg0NzJkZmMzZmQzIiwiaXNDbGllbnQiOmZhbHNlLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInNvdXJjZSI6ImFjY2Vzcy10b2tlbiIsImlhdCI6MTc0NTkwMDc0NSwiZXhwIjoxNzQ1OTg3MTQ1fQ.LOKRIZ4Rp8QgCvQLQmd2Y-LBdVDpOOZe1KBt3cHDeRM',
  };
}
/*export async function registerTestUser(request) {
  return await request.post('/user/register', {
    data: { email, password}
  });
}

export async function loginTestUser(request) {
  return await request.post('/user/login', {
    data: { email, password }
  });
}*/
