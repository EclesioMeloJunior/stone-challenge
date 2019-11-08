const invoiceController = require("../controllers/invoice.controller");

module.exports = router => {
	router.use("/v1/invoices", invoiceController(router));

	return router;
};
