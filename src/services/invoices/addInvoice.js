const buildInvoice = require("../../models");

function buildAddInvoice(invoiceRepository) {
	return async function addInvoice(invoiceDto) {
		return {
			code: 201,
			data: {
				referenceMonth: 2,
				referenceYear: 2019,
				amount: 10,
				document: "Faker invoice",
				createdAt: new Date(),
				deactivatedAt: null,
				id: 1,
				description: null,
				isActive: true
			}
		};
	};
}

module.exports = buildAddInvoice;
