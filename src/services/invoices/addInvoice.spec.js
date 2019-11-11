const builderAddInvoice = require("./addInvoice");

describe("Add invoice rise an unexpected exception", () => {
	const fakerRepository = {
		add: async () => {
			throw new Error();
		}
	};

	const addInvoice = builderAddInvoice(fakerRepository);

	test("should return 500 code and a error message", async () => {
		const fakeInvoice = {
			document: "More then 14 caracters"
		};

		const addInvoiceResponse = await addInvoice(fakeInvoice);

		expect(addInvoiceResponse).toHaveProperty("code");
		expect(addInvoiceResponse).toHaveProperty("message");
		expect(addInvoiceResponse.code).toBe(500);
	});
});

describe("Success add an invoice to database", () => {
	const fakeCreatedInvoice = {
		id: 6,
		referenceMonth: 2,
		referenceYear: 2019,
		document: "document",
		description: null,
		amount: "10.00",
		isActive: null,
		createdAt: "2019-11-11T18:41:28.283Z",
		deactivatedAt: null
	};

	const fakerRepository = {
		add: async () => fakeCreatedInvoice
	};

	const addInvoice = builderAddInvoice(fakerRepository);

	test("should return 201 (Created) code and data payload", async () => {
		const fakeInvoice = {
			document: "More then 14 caracters"
		};

		const addInvoiceResponse = await addInvoice(fakeInvoice);

		expect(addInvoiceResponse).toHaveProperty("code");
		expect(addInvoiceResponse).toHaveProperty("data");
		expect(addInvoiceResponse.code).toBe(201);
		expect(addInvoiceResponse.data).toMatchObject(fakeCreatedInvoice);
	});
});
