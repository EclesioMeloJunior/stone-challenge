const buildInvoice = require("./invoice.model");
const invoiceModel = buildInvoice();

describe("Given the invoice", () => {
	it("When reference month is out of the range should rise an exception", () => {
		const invoice = invoiceModel({ referenceMonth: 13 });
		expect(invoice.getReferenceMonth).toThrow();
	});
});
