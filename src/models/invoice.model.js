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
			getReferenceMonth: () => {
				if (referenceMonth < 1 || referenceMonth > 12) {
					throw new Error("Reference month is out of the range");
				}

				return referenceMonth;
			},
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

module.exports = buildInvoiceModel;
