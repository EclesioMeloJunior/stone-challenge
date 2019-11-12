const database = require("../database");

function invoiceRepository() {
	const add = async invoice => {
		const query = /*sql*/ `
      INSERT INTO 
        public."Invoices"
        ("referenceMonth", "referenceYear", "document", "description", "amount", "isActive", "createdAt", "deactivatedAt")
      VALUES  
        ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING *
    `;

		const replacements = [
			invoice.getReferenceMonth(),
			invoice.getReferenceYear(),
			invoice.getDocument(),
			invoice.getDescription(),
			invoice.getAmount(),
			invoice.getIsActive(),
			new Date(),
			invoice.getDeactivatedAt()
		];

		const newInvoice = await database.db.query(query, replacements);
		return newInvoice.rows.length > 0 ? newInvoice.rows[0] : null;
	};

	const findById = async invoiceId => {
		const query = /*sql*/ `
      SELECT
        public."Invoices".*
      FROM 
        public."Invoices"
      WHERE
        public."Invoices".id = $1
    `;

		const replacements = [invoiceId];

		const invoice = await database.db.query(query, replacements);
		return invoice.rows.length > 0 ? invoice.rows[0] : null;
	};

	const update = async (invoiceId, invoice) => {
		const query = /* sql */ `
      UPDATE
        public."Invoices"
      SET
        "referenceMonth"=$1,
        "referenceYear"=$2,
        "document"=$3,
        "description"=$4,
        "amount"=$5,
        "isActive"=$6
      WHERE
        public."Invoices".id = $7
    `;

		const replacements = [
			invoice.getReferenceMonth(),
			invoice.getReferenceYear(),
			invoice.getDocument(),
			invoice.getDescription(),
			invoice.getAmount(),
			invoice.getIsActive(),
			invoiceId
		];

		const updatedInvoice = await database.db.query(query, replacements);

		return updatedInvoice;
	};

	return Object.freeze({ add, update, findById });
}

module.exports = invoiceRepository;
