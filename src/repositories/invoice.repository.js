const database = require("../database");

function invoiceRepository() {
	const add = async invoice => {
		const query = /*sql*/ `
      INSERT INTO 
        public."Invoices"
        ("referenceMonth", "referenceYear", "document", "amount", "isActive", "createdAt", "deactivatedAt")
      VALUES  
        ($1, $2, $3, $4, $5, $6, $7)
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

		await database.db.query(query, replacements);
	};

	return Object.freeze({ add });
}

module.exports = invoiceRepository;
