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
    console.log('Making request to:', url, 'with options:', options); // Debugging
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
      return { error: errorData.message || `HTTP Error: ${response.status}` };
    }

    // Handle empty responses (e.g., 204 No Content)
    if (response.status === 204) {
      return { data: null };
    }

    return { data: await response.json() };
  } catch (error) {
    console.error('Network error:', error);
    return { error: 'Network error' };
  }
};

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    const { data, error } = await fetchWithAuth(`${API_BASE_URL}/users`);
    if (error) {
      console.error('Error fetching users:', error);
      return []; // Return an empty array in case of error
    }

    // Log the response for debugging
    console.log('API Response:', data);

    // Ensure the response contains an array of users
    if (Array.isArray(data?.users)) {
      return data.users; // Return the users array
    } else {
      console.error('Invalid data format received from the server:', data);
      return []; // Return an empty array if the data format is invalid
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; // Return an empty array in case of error
  }
};

// Fetch a single user by Firebase UID
export const fetchUserById = async (firebaseUID) => {
  if (!firebaseUID) {
    console.error('Firebase UID is required');
    return null;
  }

  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/user/${firebaseUID}`);
  if (error) {
    console.error('Error fetching user:', error);
    return null; // Return null in case of error
  }
  return data; // Return the user object
};

// Create or update user profile
export const createOrUpdateUser = async (userData) => {
  if (!userData || !userData.firebaseUID) {
    console.error('Invalid user data');
    return null;
  }

  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  if (error) {
    console.error('Error creating/updating user:', error);
    return null; // Return null in case of error
  }
  return data; // Return the updated user object
};

// Request Skill Swap
export const requestSkillSwap = async (targetUserId, skillName) => {
  if (!targetUserId || !skillName) {
    console.error('Target user ID and skill name are required');
    return null;
  }

  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/skill-swap/request`, {
    method: 'POST',
    body: JSON.stringify({ targetUserId, skillName }),
  });

  if (error) {
    console.error('Error requesting skill swap:', error);
    return null;
  }

  console.log('Skill swap request successful:', data);
  return data;
};

// Update Device Token
export const updateDeviceToken = async (token) => {
  if (!token) {
    console.error('Device token is required');
    return { error: 'Device token is required' };
  }

  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/user/update-device-token`, {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  if (error) {
    console.error('Error updating device token:', error);
    return { error };
  }

  return { data };
};


export const addReview = async (reviewData) => {
  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
  if (error) {
    console.error('Error adding review:', error);
    return null;
  }
  return data;
};

export const fetchMatches = async (userId) => {
  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/matches/${userId}`);
  if (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
  return data;
};

    export const updateMatchStatus = async (matchId, status) => {
      const { data, error } = await fetchWithAuth(`${API_BASE_URL}/matches/${matchId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      if (error) {
        console.error('Error updating match status:', error);
        return null;
      }
      return data;
    };

    // Fetch Notifications
export const fetchNotifications = async () => {
  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/notifications`);
  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
  return data.notifications;
};



// Mark Notification as Read
export const markNotificationAsRead = async (messageId) => {
  if (!messageId) {
    console.error("Error: messageId is missing");
    return;
  }

  const encodedId = encodeURIComponent(messageId); // Encode to handle special characters

  const { data, error } = await fetchWithAuth(`${API_BASE_URL}/notifications/${encodedId}/read`, {
    method: "PATCH",
  });

  if (error) {
    console.error("Error marking notification as read:", error);
  } else {
    console.log("Mark as read response:", data);
  }
};




