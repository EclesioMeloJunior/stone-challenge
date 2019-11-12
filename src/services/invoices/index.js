const invoiceRepository = require("../../repositories/invoice.repository");
const buildAddInvoice = require("./addInvoice");
const buildUpdateInvoice = require("./updateInvoice");
const buildDeleteInvoice = require("./deleteInvoice");

const addInvoice = buildAddInvoice(invoiceRepository());
const updateInvoice = buildUpdateInvoice(invoiceRepository());
const deleteInvoice = buildDeleteInvoice(invoiceRepository());

module.exports = { addInvoice, updateInvoice, deleteInvoice };
