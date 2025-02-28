import { getAuth } from 'firebase/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Function to get the Firebase Token
const getFirebaseToken = async () => {
  const auth = getAuth();
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};

// Helper function for API requests
const fetchWithAuth = async (url, options = {}) => {
  const token = await getFirebaseToken();
  if (!token) {
    console.error('User not authenticated');
    return { error: 'Unauthorized' };
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error ${response.status}:`, errorData);
      return { error: errorData };
    }

    return await response.json();
  } catch (error) {
    console.error('Network error:', error);
    return { error: 'Network error' };
  }
};

// Fetch all users
export const fetchAllUsers = async () => {
  return await fetchWithAuth(`${API_BASE_URL}/users`); 
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
  return await fetchWithAuth(`${API_BASE_URL}/user/${id}`); 
};

// Create or update user profile
export const createOrUpdateUser = async (userData) => {
  return await fetchWithAuth(`${API_BASE_URL}/user`, { 
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

// Request Skill Swap
export const requestSkillSwap = async (userId) => {
  return await fetchWithAuth(`${API_BASE_URL}/skill-swap`, { 
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
};
