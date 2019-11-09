const { addInvoice } = require("../services/invoices");
const invoiceSchema = require("../schemas/invoice.schema");

module.exports = router => {
	router.get("/", (request, response) => {
		return response.json({ message: "Olá" });
	});

	router.post("/", (request, response) => {
		const invoiceDto = request.body;

		const schemaValidation = invoiceSchema.validate(invoiceDto);

		const addInvoice = addInvoice(invoiceDto);
	});

	return router;
};
