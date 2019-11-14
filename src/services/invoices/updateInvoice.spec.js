const builderUpdateInvoice = require("./updateInvoice");

describe("When update an invoice", () => {
	test("When invoice not exists should return 404 (Not Found)", async () => {
		const fakerRepository = {
			findById: jest.fn().mockReturnValueOnce(null)
		};

		const updateInvoice = builderUpdateInvoice(fakerRepository);
		const updateInvoiceResponse = await updateInvoice(-10, {});

		expect(updateInvoiceResponse).toHaveProperty("code");
		expect(updateInvoiceResponse).toHaveProperty("message");

		expect(updateInvoiceResponse.code).toBe(404);
	});

	test("When invoice was found should return 200 and data payload", async () => {
		const fakerUpdatedInvoice = {
			id: 9,
			referenceMonth: 1,
			referenceYear: 2018,
			document: "Document",
			description: "example",
			amount: "190.00",
			isActive: true,
			createdAt: "2019-11-11T19:46:02.124Z",
			deactivatedAt: null
		};

		const fakerRepository = {
			update: async (id, invoice) => {
				return {
					rowCount: 1
				};
			},

			findById: async id => fakerUpdatedInvoice
		};

		const updateInvoice = builderUpdateInvoice(fakerRepository);
		const updateInvoiceResponse = await updateInvoice(1, {});

		expect(updateInvoiceResponse).toHaveProperty("code");
		expect(updateInvoiceResponse).toHaveProperty("data");

		expect(updateInvoiceResponse.code).toBe(200);
		expect(updateInvoiceResponse.data).toMatchObject(fakerUpdatedInvoice);
	});
});
