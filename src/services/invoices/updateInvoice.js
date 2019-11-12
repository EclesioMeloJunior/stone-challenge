const { invoiceModel } = require("../../models");

function buildUpdateInvoice(invoiceRepository) {
	return async function updateInvoice(invoiceId, invoiceDto) {
		const invoice = invoiceModel(invoiceDto);

		try {
			const updatedInvoice = await invoiceRepository.update(invoiceId, invoice);

			if (updatedInvoice.rowCount > 0) {
				const retrievedInvoice = invoiceRepository.findById(invoiceId);

				return {
					code: 200,
					data: await retrievedInvoice
				};
			}

			return {
				code: 404,
				data: "Invoice not found"
			};
		} catch (exception) {
			console.log(exception);
			return {
				code: 200,
				message: exception.message
			};
		}
	};
}

module.exports = buildUpdateInvoice;
