const migrationQuery = /* sql */ `
  CREATE TABLE IF NOT EXISTS public."Invoices" (
    id serial,
    "referenceMonth" int4 NULL,
    "referenceYear" int4 NULL,
    "document" varchar(14) NULL,
    "description" varchar(256) NULL,
    "amount" numeric(16,2) NULL,
    "isActive" bool NULL DEFAULT true,
    "createdAt" timestamptz NULL,
    "deactivatedAt" timestamptz NULL,
    CONSTRAINT invoices_pk PRIMARY KEY (id)
  );
`;

async function executeMigration(database) {
	await database.query(migrationQuery);
}

module.exports = executeMigration;
