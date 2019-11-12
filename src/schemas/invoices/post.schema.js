const Joi = require("@hapi/joi");

const postInvoiceSchema = Joi.object({
	referenceMonth: Joi.number()
		.min(1)
		.max(12)
		.required(),

	referenceYear: Joi.number()
		.min(1900)
		.max(2100)
		.required(),

	amount: Joi.number().required(),

	document: Joi.string().required(),

	description: Joi.string(),

	isActive: Joi.boolean()
});

module.exports = postInvoiceSchema;
