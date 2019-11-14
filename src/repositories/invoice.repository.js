const database = require("../database");
const format = require("pg-format");

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
      AND public."Invoices"."isActive" <> true
    `;

		const replacements = [invoiceId];

		const invoice = await database.db.query(query, replacements);
		return invoice.rows.length > 0 ? invoice.rows[0] : null;
	};

	const find = async findPayload => {
		const query = /* sql */ `
      SELECT 
        public."Invoices".*
      FROM 
        public."Invoices"
      WHERE
      %s
      ORDER BY
      %s
      LIMIT %L
      OFFSET %L
    `;

		const replacements = [
			findPayload.itemsPerPage,
			findPayload.itemsPerPage * findPayload.page,
			"true",
			`public."Invoices".id ASC`
		];

		if (findPayload.filterBy) {
			const whereClausule = findPayload.filterBy.map(find => {
				return `public."Invoices"."${find.name}"=${find.value}`;
			});

			replacements[2] = whereClausule.join(" AND ");
		}

		if (findPayload.sortBy) {
			const orderByClausule = findPayload.sortBy.map(sort => {
				return `public."Invoices"."${sort.name}" ${sort.desc ? "DESC" : "ASC"}`;
			});

			replacements[3] = orderByClausule.join(", ");
		}

		try {
			const formatedSQL = format(
				query,
				replacements[2],
				replacements[3],
				replacements[0],
				replacements[1]
			);

			return (await database.db.query(formatedSQL)).rows;
		} catch (exception) {
			console.log(exception);
			return [];
		}
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
        "isActive"=$6,
        "deactivatedAt"=$7
      WHERE
        public."Invoices".id = $8
        AND public."Invoices"."isActive" <> true
    `;

		const replacements = [
			invoice.getReferenceMonth(),
			invoice.getReferenceYear(),
			invoice.getDocument(),
			invoice.getDescription(),
			invoice.getAmount(),
			invoice.getIsActive(),
			invoice.getDeactivatedAt(),
			invoiceId
		];

		const updatedInvoice = await database.db.query(query, replacements);

		return updatedInvoice;
	};

	return Object.freeze({ add, update, findById, find });
}

module.exports = invoiceRepository;
