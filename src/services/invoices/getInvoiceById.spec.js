const buildGetInvoiceById = require("./getInvoiceById");

describe("Give get invoice by id", () => {
	describe("When get and deleted invoice", () => {
		const fakerRepository = {
			findById: jest.fn().mockReturnValueOnce(null)
		};

		test("should return 404 not found invoice", async () => {
			const getInvoiceById = buildGetInvoiceById(fakerRepository);

			const getInvoiceResponse = await getInvoiceById(1);

			expect(fakerRepository.findById.mock.calls.length).toBe(1);
			expect(getInvoiceResponse).toHaveProperty("code");
			expect(getInvoiceResponse).toHaveProperty("message");

			expect(getInvoiceResponse.code).toBe(404);
		});
	});

	describe("When send an NaN invoiceId", () => {
		test("should return 400 bad request, invalid input", async () => {
			const getInvoiceById = buildGetInvoiceById({});

			const getInvoiceResponse = await getInvoiceById("a");

			expect(getInvoiceResponse).toHaveProperty("code");
			expect(getInvoiceResponse).toHaveProperty("message");

			expect(getInvoiceResponse.code).toBe(400);
		});
	});
});
