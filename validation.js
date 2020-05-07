const Joi = require("@hapi/joi");

//Add User Validation
const postValidation = data => {
  const schema = {
    gender: Joi.number()
      .min(1)
      .max(3)
      .required(),
    userID: Joi.number()
      .min(0)
      .required(),
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    location: Joi.array().items(
      Joi.number()
        .min(-180)
        .max(180)
        .required(),
      Joi.number()
        .min(-90)
        .max(90)
        .required()
    )
  };
  return Joi.validate(data, schema);
};

module.exports.postValidation = postValidation;
