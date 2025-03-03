import { getAuth } from 'firebase/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log('API Base URL:', API_BASE_URL);

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
  const response = await fetchWithAuth(`${API_BASE_URL}/users`);
  if (response.error) {
    console.error('Error fetching users:', response.error);
    return []; // Return an empty array in case of error
  }
  return response.users || []; // Return the users array
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/${id}`);
  if (response.error) {
    console.error('Error fetching user:', response.error);
    return null; // Return null in case of error
  }
  return response; // Return the user object
};

// Create or update user profile
export const createOrUpdateUser = async (userData) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (response.error) {
    console.error('Error creating/updating user:', response.error);
    return null; // Return null in case of error
  }
  return response; // Return the updated user object
};

// Request Skill Swap
export const requestSkillSwap = async (targetUserId, skillId) => {
  const response = await fetchWithAuth(`${API_BASE_URL}/skill-swap/request`, {
    method: 'POST',
    body: JSON.stringify({ targetUserId, skillId }),
  });
  if (response.error) {
    console.error('Error requesting skill swap:', response.error);
    return null; // Return null in case of error
  }
  return response; // Return the match object
};