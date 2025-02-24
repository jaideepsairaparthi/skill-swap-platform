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

// Fetch all users
export const fetchAllUsers = async () => {
  const token = await getFirebaseToken();
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Attach token
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
  const token = await getFirebaseToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
  }
};

// Create or update user profile
export const createOrUpdateUser = async (userData) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating/updating user:', error);
  }
};