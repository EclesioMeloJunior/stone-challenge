const migrationQuery = `
  CREATE TABLE IF NOT EXISTS public."Invoices" (
    id int4 NOT NULL,
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

module.exports = async database => {
	await database.query(migrationQuery);
};
