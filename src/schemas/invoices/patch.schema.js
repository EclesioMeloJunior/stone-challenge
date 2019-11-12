const Joi = require("@hapi/joi");

const putInvoiceSchema = Joi.object({
	referenceMonth: Joi.number()
		.min(1)
		.max(12),

	referenceYear: Joi.number()
		.min(1900)
		.max(2100),

	amount: Joi.number(),
	document: Joi.string(),
	isActive: Joi.boolean(),
	description: Joi.string()
});

module.exports = putInvoiceSchema;
