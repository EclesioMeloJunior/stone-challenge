const authController = require("../controllers/auth.controller");
const invoiceController = require("../controllers/invoice.controller");

const { authMiddleware } = require("./middleware");

module.exports = router => {
	router.use("/v1/auth", authController(router));
	router.use("/v1/invoices", authMiddleware, invoiceController(router));

	return router;
};
