const Joi = require("@hapi/joi");

const invoiceSchema = Joi.object({
	referenceMonth: Joi.number()
		.min(1)
		.max(12),

	referenceYear: Joi.number()
		.max(1900)
		.max(2100),

	amount: Joi.number()
		.not()
		.negative(),

	document: Joi.string()
		.not()
		.empty()
});

module.exports = invoiceSchema;
