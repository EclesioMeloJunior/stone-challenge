const {
	addInvoice,
	updateInvoice,
	deleteInvoice,
	getInvoiceById
} = require("../services/invoices");

const {
	invoicePostSchema,
	invoicePutSchema,
	invoicePatchSchema
} = require("../schemas/invoices");

module.exports = router => {
	router.get("/", (request, response) => {
		return response.json({ message: "Olá" });
	});

	router.get("/:id", async (request, response) => {
		const invoiceId = request.params.id;
		const getInvoiceByIdResponse = await getInvoiceById(invoiceId);

		return response
			.status(getInvoiceByIdResponse.code)
			.json(getInvoiceByIdResponse);
	});

	router.post("/", async (request, response) => {
		const invoiceDto = request.body;

		const schemaValidation = invoicePostSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.error);
		}

		const addInvoiceResponse = await addInvoice(invoiceDto);
		return response.status(addInvoiceResponse.code).json(addInvoiceResponse);
	});

	router.put("/:id", async (request, response) => {
		const invoiceDto = request.body;
		const invoiceId = request.params.id;

		const schemaValidation = invoicePutSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.error);
		}

		const updateInvoiceResponse = await updateInvoice(
			invoiceId,
			schemaValidation.value
		);

		return response
			.status(updateInvoiceResponse.code)
			.json(updateInvoiceResponse);
	});

	router.patch("/:id", async (request, response) => {
		const invoiceDto = request.body;
		const invoiceId = request.params.id;

		const schemaValidation = invoicePatchSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.error);
		}

		const updateInvoiceResponse = await updateInvoice(invoiceId, invoiceDto);

		return response
			.status(updateInvoiceResponse.code)
			.json(updateInvoiceResponse);
	});

	router.delete("/:id", async (request, response) => {
		const invoiceId = request.params.id;

		const deletedInvoiceResponse = await deleteInvoice(invoiceId);

		return response
			.status(deletedInvoiceResponse.code)
			.json(deletedInvoiceResponse);
	});

	return router;
};
