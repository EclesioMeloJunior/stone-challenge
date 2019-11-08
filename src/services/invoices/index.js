const invoiceRepository = require("../../repositories/invoice.repository");
const buildAddInvoice = require("./addInvoice");

const addInvoice = buildAddInvoice(invoiceRepository());

module.exports = { addInvoice };
