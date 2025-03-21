const admin = require('../firebaseAdmin');

const authenticate = async (req, res, next) => {
  console.log("Auth Headers:", req.headers.authorization); // Debugging

  const idToken = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!idToken) {
    console.error("Unauthorized: No token provided");
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken); // Verify token using Firebase Admin
    req.user = { uid: decodedToken.uid }; // Attach Firebase UID to the request object
    console.log("Authentication successful for user:", decodedToken.uid);
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;
