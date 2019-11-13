const { invoiceModel } = require("../../models");

function buildGetInvoices(invoiceRepository) {
	return async function getInvoices({
		itemsPerPage,
		page,
		filterBy,
		sortBy
	} = {}) {
		try {
			const invoicesFetcheds = await invoiceRepository.find({
				itemsPerPage,
				page,
				filterBy,
				sortBy
			});

			const invoices = invoicesFetcheds.map(invoice =>
				invoiceModel(invoice).toObject()
			);

			return {
				code: 200,
				data: [...invoices]
			};
		} catch (exception) {
			return {
				code: 500,
				message: exception.message
			};
		}
	};
}

module.exports = buildGetInvoices;
