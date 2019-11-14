const Joi = require("@hapi/joi");

const getInvoiceSchema = Joi.object({
	page: Joi.number().required(),
	itemsPerPage: Joi.number().required(),
	sortBy: Joi.array().items({
		name: Joi.string()
			.valid("referenceMonth")
			.valid("referenceYear")
			.valid("id")
			.valid("document"),
		desc: Joi.boolean()
	}),
	filterBy: Joi.array().items({
		name: Joi.string()
			.valid("referenceMonth")
			.valid("referenceYear")
			.valid("document")
			.valid("id")
			.required(),

		value: Joi.alternatives()
			.conditional("name", {
				is: "referenceMonth",
				then: Joi.number().required()
			})
			.conditional("name", {
				is: "id",
				then: Joi.number().required()
			})
			.conditional("name", {
				is: "referenceYear",
				then: Joi.number().required()
			})
			.conditional("name", {
				is: "document",
				then: Joi.string().required()
			})
	})
});

module.exports = getInvoiceSchema;
