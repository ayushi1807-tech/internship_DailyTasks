const Joi = require("joi");

const validator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.number().integer().min(18).max(45).required(),
    course: Joi.string().min(1).max(100).required(),
    country_name: Joi.string().required(),
    state_name: Joi.string().required(),
    city_name: Joi.string().required(),

  }).unknown(true);

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,   
    allowUnknown: true,  
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }

  next();
};

module.exports = validator;
