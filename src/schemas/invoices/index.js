const invoicePostSchema = require("./post.schema");
const invoicePutSchema = require("./put.schema");
const invoicePatchSchema = require("./patch.schema");
const invoiceGetSchema = require("./get.schema");

module.exports = {
	invoiceGetSchema,
	invoicePostSchema,
	invoicePutSchema,
	invoicePatchSchema
};
