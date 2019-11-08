function buildInvoiceModel() {
	return function invoiceModel({
		id,
		referenceMonth,
		referenceYear,
		document,
		description,
		amount,
		isActive,
		createdAt,
		deactivatedAt
	} = {}) {
		const invoiceObject = {
			getId: () => id,
			getReferenceMonth: () => referenceMonth,
			getReferenceYear: () => referenceYear,
			getDocument: () => document,
			getDescription: () => description,
			getAmount: () => amount,
			getIsActive: () => {
				isActive && !deactivatedAt;
			},
			getCreatedAt: () => createdAt,
			getDeactivatedAt: () => deactivatedAt,

			inativeInvoice: () => {
				isActive = false;
				deactivatedAt = new Date();
			}
		};

		return Object.freeze(invoiceObject);
	};
}
