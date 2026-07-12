import Joi from "joi";

export const createOrderSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  phone: Joi.string().trim().min(3).max(30).required(),
  address: Joi.string().trim().max(200).allow("").allow(null).optional(),
  message: Joi.string().trim().max(1000).allow("").allow(null).optional(),
  bouquetId: Joi.number().integer().positive().allow(null).optional(),
  bouquetTitle: Joi.string().trim().max(200).allow("").allow(null).optional(),
  quantity: Joi.number().integer().min(1).max(100).default(1),
  totalPrice: Joi.number().positive().allow(null).optional(),
});