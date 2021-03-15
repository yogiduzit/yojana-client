export const API_URL = process.env.NODE_ENV === 'production' ? 
  'http://comp-4911-pms-backend-project-management-system.apps.okd4.infoteach.ca/api' : 
  'http://localhost:8080/comp4911-pms-backend/api';

export const ACCESS_TOKEN = 'accessToken';