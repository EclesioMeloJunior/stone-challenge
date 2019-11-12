const Joi = require("@hapi/joi");

const putInvoiceSchema = Joi.object({
	referenceMonth: Joi.number()
		.min(1)
		.max(12)
		.required(),

	referenceYear: Joi.number()
		.max(1900)
		.max(2100)
		.required(),

	amount: Joi.number(),
	document: Joi.string().required(),
	isActive: Joi.boolean(),
	description: Joi.string()
});

module.exports = putInvoiceSchema;
