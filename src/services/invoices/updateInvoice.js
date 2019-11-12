const { invoiceModel } = require("../../models");

function buildUpdateInvoice(invoiceRepository) {
	return async function updateInvoice(invoiceId, invoiceDto) {
		try {
			let retrievedInvoice = await invoiceRepository.findById(invoiceId);

			if (!retrievedInvoice) {
				return {
					code: 404,
					message: "Invoice not found"
				};
			}

			const retrivedInvoiceModel = invoiceModel(retrievedInvoice);

			if (!retrivedInvoiceModel.getIsActive()) {
				return {
					code: 404,
					message: "Invoice not found"
				};
			}

			const invoice = invoiceModel({ ...retrievedInvoice, ...invoiceDto });

			const updatedInvoice = invoiceRepository.update(invoiceId, invoice);
			retrievedInvoice = invoiceRepository.findById(invoiceId);

			if ((await updatedInvoice).rowCount > 0) {
				return {
					code: 200,
					data: await retrievedInvoice
				};
			}

			return {
				code: 404,
				message: "Invoice not found"
			};
		} catch (exception) {
			console.log(exception);
			return {
				code: 500,
				message: exception.message
			};
		}
	};
}

module.exports = buildUpdateInvoice;
