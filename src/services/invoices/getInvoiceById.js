const { invoiceModel } = require("../../models");

function buildGetInvoiceById(invoiceRepository) {
	return async function getInvoiceById(invoiceId) {
		if (Number.isNaN(Number(invoiceId))) {
			return {
				code: 400,
				message: "Invoice id must be a number"
			};
		}

		try {
			const retrievedInvoice = await invoiceRepository.findById(invoiceId);

			if (retrievedInvoice) {
				const invoice = invoiceModel(retrievedInvoice);

				return {
					code: 200,
					data: { ...invoice.toObject() }
				};
			}

			return {
				code: 404,
				message: "Invoice not found"
			};
		} catch (exception) {
			return {
				code: 500,
				message: exception
			};
		}
	};
}

module.exports = buildGetInvoiceById;
