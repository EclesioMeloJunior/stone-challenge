const buildGetInvoices = require("./getInvoices");

describe("Given get all invoices", () => {
	describe("When have no invoices", () => {
		const fakerRepository = {
			find: jest.fn().mockReturnValueOnce([])
		};

		test("should return OK with empty array", async () => {
			const getInvoices = buildGetInvoices(fakerRepository);
			const getInvoicesResponse = await getInvoices({});

			expect(getInvoicesResponse).toHaveProperty("code");
			expect(getInvoicesResponse).toHaveProperty("data");

			expect(getInvoicesResponse.data.length).toBe(0);
			expect(getInvoicesResponse.code).toBe(200);
		});
	});

	describe("When have at least 1 invoice", () => {
		const fakerRepository = {
			find: jest.fn().mockReturnValueOnce([{}])
		};

		test("should return OK with empty array", async () => {
			const getInvoices = buildGetInvoices(fakerRepository);
			const getInvoicesResponse = await getInvoices({});

			expect(getInvoicesResponse).toHaveProperty("code");
			expect(getInvoicesResponse).toHaveProperty("data");

			expect(getInvoicesResponse.data.length).toBe(1);
			expect(getInvoicesResponse.code).toBe(200);
		});
	});
});
