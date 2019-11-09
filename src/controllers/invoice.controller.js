const { addInvoice } = require("../services/invoices");
const invoiceSchema = require("../schemas/invoice.schema");

module.exports = router => {
	router.get("/", (request, response) => {
		return response.json({ message: "Olá" });
	});

	router.post("/", async (request, response) => {
		const invoiceDto = request.body;

		const schemaValidation = invoiceSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.errors);
		}

		try {
			const addInvoiceResponse = await addInvoice(invoiceDto);
			return response
				.status(addInvoiceResponse.code)
				.json(addInvoiceResponse.data);
		} catch (exception) {
			return response.status(500).json(exception);
		}
	});

	return router;
};
