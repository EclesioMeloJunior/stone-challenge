const Joi = require("@hapi/joi");

const invoiceSchema = Joi.object({
	id: Joi.number(),

	referenceMonth: Joi.number()
		.min(1)
		.max(12)
		.required(),

	referenceYear: Joi.number()
		.max(1900)
		.max(2100)
		.required(),

	amount: Joi.number().required(),

	document: Joi.string().required(),

	description: Joi.string(),

	isActive: Joi.boolean()
});

module.exports = invoiceSchema;
