const database = require("../database");

function invoiceRepository() {
	const add = async invoice => {
		const query = /*sql*/ `
      INSERT INTO 
        public."Invoices"
        ("referenceMonth", "referenceYear", "document", "amount", "isActive", "createdAt", "deactivatedAt")
      VALUES  
        ($1, $2, $3, $4, $5, $6, $7)
			RETURNING *
    `;

		const replacements = [
			invoice.getReferenceMonth(),
			invoice.getReferenceYear(),
			invoice.getDocument(),
			invoice.getAmount(),
			invoice.getIsActive(),
			new Date(),
			invoice.getDeactivatedAt()
		];

		const newInvoice = await database.db.query(query, replacements);
		return newInvoice.rows.length > 0 ? newInvoice.rows[0] : null;
	};

	return Object.freeze({ add });
}

module.exports = invoiceRepository;
