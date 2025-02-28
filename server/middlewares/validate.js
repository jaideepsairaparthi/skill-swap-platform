const { validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validation rules
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // No errors, proceed to the next middleware/controller
    }

    // Return validation errors
    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = validate;