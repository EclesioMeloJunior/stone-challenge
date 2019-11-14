const { invoiceModel } = require("../../models");

function buildDeleteInvoice(invoiceRepository) {
	return async function deleteInvoice(invoiceId) {
		try {
			const retrievedInvoice = await invoiceRepository.findById(invoiceId);

			if (!retrievedInvoice) {
				return {
					code: 404,
					message: "Invoice not found"
				};
			}

			const invoice = invoiceModel(retrievedInvoice);

			invoice.inativeInvoice();

			const updateResponse = invoiceRepository.update(invoiceId, invoice);
			const deactivatedInvoice = invoiceRepository.findById(invoiceId);

			if ((await updateResponse).rowCount > 0) {
				return {
					code: 200,
					data: await deactivatedInvoice
				};
			}

			return {
				code: 404,
				message: "Invoice not found"
			};
		} catch (exception) {
			return {
				code: 500,
				message: exception.message
			};
		}
	};
}

module.exports = buildDeleteInvoice;
