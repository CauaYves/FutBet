import Joi from "joi";

export const participantSchema = Joi.object({
  name: Joi.string().max(16).required(),
  balance: Joi.number().min(1000).required()
});
 
