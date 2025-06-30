const Joi = require('joi');

const validator = {
  userSchema: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().max(100).required(),
    phone_number: Joi.string().pattern(/^\+\d{10,15}$/).allow(''),
    intent: Joi.string().valid('buyer', 'seller', 'renter').required()
  }),

  otpSchema: Joi.object({
    email: Joi.string().email().max(100).required(),
    otp: Joi.string().length(6).required()
  }),

  propertySchema: Joi.object({
    type: Joi.string().valid('open_plot', 'constructed_shed', 'ready_to_operate').required(),
    size: Joi.number().positive().required(),
    location_description: Joi.string().required(),
    city: Joi.string().max(100).required(),
    area: Joi.string().max(100).allow(''),
    images: Joi.array().items(Joi.string().uri()).allow(null),
    contact_number: Joi.string().pattern(/^\+\d{10,15}$/).required(),
    price: Joi.number().positive().required(),
    status: Joi.string().valid('rent', 'buy', 'sell').required()
  }),

  commercialSchema: Joi.object({
    type: Joi.string().valid('bank', 'atm', 'shop', 'eatery', 'medical').required(),
    size: Joi.number().positive().required(),
    location_description: Joi.string().required(),
    city: Joi.string().max(100).required(),
    images: Joi.array().items(Joi.string().uri()).allow(null),
    contact_number: Joi.string().pattern(/^\+\d{10,15}$/).required(),
    price: Joi.number().positive().required()
  }),

  inquirySchema: Joi.object({
    name: Joi.string().max(100).required(),
    contact: Joi.string().pattern(/^\+\d{10,15}$/).required(),
    details: Joi.string().required()
  })
};

module.exports = validator;