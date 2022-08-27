import Joi from "joi";

export const validateContactSubmission = Joi.object({
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
    subject: Joi.string().optional(),
    message: Joi.string().optional()
});