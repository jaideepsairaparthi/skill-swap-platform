import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export const storeAuthToken = () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem('authToken', token); // Store token in local storage
      console.log('Token stored in local storage:', token);
    } else {
      localStorage.removeItem('authToken'); // Clear token if user logs out
    }
  });
};
