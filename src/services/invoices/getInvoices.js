function buildGetInvoices(invoiceRepository) {
	return async function getInvoices({
		itemsPerPage,
		page,
		filterBy,
		sortBy
	} = {}) {
		return await invoiceRepository.find({
			itemsPerPage,
			page,
			filterBy,
			sortBy
		});
	};
}

module.exports = buildGetInvoices;
