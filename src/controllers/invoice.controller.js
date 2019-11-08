const { addInvoice } = require("../services/invoices");

module.exports = router => {
	router.get("/", (request, response) => {
		return response.json({ message: "Olá" });
	});

	router.post("/", (request, response) => {
		const invoiceDto = request.body;
		const addInvoice = addInvoice(invoiceDto);
	});

	return router;
};
