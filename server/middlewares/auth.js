// middlewares/auth.js
const authenticate = (req, res, next) => {
    // Add your token verification logic here
    console.log("Authentication successful");
    next();
  };
  
  module.exports = authenticate;
  