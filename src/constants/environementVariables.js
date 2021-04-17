export const API_URL = process.env.NODE_ENV === 'production' ? 
  'http://yojana-backend-project-management-system.apps.okd4.infoteach.ca/api' : 
  'http://localhost:8080/yojana-backend/api';

export const ACCESS_TOKEN = 'accessToken';
export const ROLES = [];