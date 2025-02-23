import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      const token = await result.user.getIdToken();
      console.log("Firebase Token:", token);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
