import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase'; // Correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app); // Use the app object

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  const guestLogin = () => {
    const guestUser = {
      uid: 'guest',
      email: 'guest@skillswap.com',
      displayName: 'Guest User',
    };
    setCurrentUser(guestUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    login,
    logout,
    guestLogin, // Add guestLogin to the context
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);