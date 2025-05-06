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
      const errorData = await response.json().catch(() => ({}));
      return { 
        error: errorData.message || `Request failed with status ${response.status}`,
        status: response.status
      };
    }

    return response.status === 204 
      ? { data: null }
      : { data: await response.json() };
  } catch (error) {
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


export const requestSkillSwap = async (targetUserId, skillName) => {
  const { data, error, status } = await fetchWithAuth(`${API_BASE_URL}/skill-swap/request`, {
    method: 'POST',
    body: JSON.stringify({ targetUserId, skillName })
  });

  if (error) {
    return { 
      error,
      isDuplicate: status === 400 
    };
  }

  return { data };
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

export const startVideoCall = async (matchId) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    const token = await user.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}/start-call`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to start video call');
    }

    return await response.json();
  } catch (error) {
    console.error("Error starting video call:", error);
    throw error;
  }
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
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) {
      console.error("No authenticated user found");
      return { error: "User not authenticated" };
    }

    const token = await user.getIdToken();
    
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}/status`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || `HTTP Error: ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    console.error("Network error while updating match status:", error);
    return { error: "Network error" };
  }
};

    // Fetch Notifications
    export const fetchNotifications = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          console.log("No user logged in");
          return [];
        }
    
        const token = await user.getIdToken();
        const response = await fetch(`${API_BASE_URL}/notifications`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Notifications API response:', data);
        return data.notifications || [];
      } catch (error) {
        console.error('Error fetching notifications:', error);
        toast.error("Failed to load notifications");
        return [];
      }
    };
    
    export const markNotificationAsRead = async (messageId) => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          console.error("No authenticated user found");
          return { error: "User not authenticated" };
        }
    
        const token = await user.getIdToken();
        const encodedId = encodeURIComponent(messageId);
        
        const response = await fetch(`${API_BASE_URL}/notifications/${encodedId}/read`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          return { error: errorData.message || `HTTP Error: ${response.status}` };
        }
    
        return await response.json();
      } catch (error) {
        console.error("Network error while marking notification as read:", error);
        return { error: "Network error" };
      }
    };

