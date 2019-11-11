const { invoiceModel } = require("../../models");

function buildAddInvoice(invoiceRepository) {
	return async function addInvoice(invoiceDto) {
		const invoice = invoiceModel(invoiceDto);

		try {
			const newInvoice = await invoiceRepository.add(invoice);
			return {
				code: 201,
				data: { ...newInvoice }
			};
		} catch (exception) {
			return {
				code: 500,
				message: exception.message
			};
		}
	};
}

module.exports = buildAddInvoice;
