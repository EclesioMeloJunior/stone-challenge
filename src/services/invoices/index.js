const invoiceRepository = require("../../repositories/invoice.repository");
const buildAddInvoice = require("./addInvoice");
const buildUpdateInvoice = require("./updateInvoice");

const addInvoice = buildAddInvoice(invoiceRepository());
const updateInvoice = buildUpdateInvoice(invoiceRepository());

module.exports = { addInvoice, updateInvoice };
