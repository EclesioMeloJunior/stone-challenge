const buildDeleteInvoice = require("./deleteInvoice");

describe("Given delete invoice action", () => {
	const fakerNotDeleteInvoice = {
		id: 5,
		referenceMonth: 2,
		referenceYear: 2019,
		document: "document",
		description: null,
		amount: "10.00",
		isActive: true,
		createdAt: "2019-11-11T18:41:26.994Z",
		deactivatedAt: null
	};

	describe("When delete with success a invoice", () => {
		const fakerDeletedInvoice = {
			...fakerNotDeleteInvoice,
			deactivatedAt: "2019-11-13T12:19:22.852Z",
			isActive: false
		};

		const fakerRepository = {
			findById: jest
				.fn()
				.mockReturnValueOnce(fakerNotDeleteInvoice)
				.mockReturnValue(fakerDeletedInvoice),
			update: jest.fn(() => ({ rowCount: 1 }))
		};

		test("should return 200 with invoice object", async () => {
			const deleteInvoice = buildDeleteInvoice(fakerRepository);
			const deleteInvoiceResponse = await deleteInvoice(1);

			expect(fakerRepository.findById.mock.calls.length).toBe(2);

			expect(deleteInvoiceResponse).toHaveProperty("code");
			expect(deleteInvoiceResponse).toHaveProperty("data");

			expect(deleteInvoiceResponse.code).toBe(200);
			expect(deleteInvoiceResponse.data).toMatchObject(fakerDeletedInvoice);
		});
	});

	describe("When delete a deleted invoice", () => {
		test("should block action and return 404 invoice not found", async () => {
			const fakerDeletedInvoice = {
				...fakerNotDeleteInvoice,
				deactivatedAt: "2019-11-13T12:19:22.852Z",
				isActive: false
			};

			const fakerRepository = {
				findById: jest.fn().mockReturnValueOnce(fakerDeletedInvoice)
			};

			const deleteInvoice = buildDeleteInvoice(fakerRepository);
			const deleteInvoiceResponse = await deleteInvoice(1);

			expect(fakerRepository.findById.mock.calls.length).toBe(1);

			expect(deleteInvoiceResponse).toHaveProperty("code");
			expect(deleteInvoiceResponse).toHaveProperty("message");

			expect(deleteInvoiceResponse.code).toBe(404);
		});
	});

	describe("When delete by an not found id", () => {
		test("should block action and return 404 invoice not found", async () => {
			const fakerRepository = {
				findById: jest.fn().mockReturnValueOnce(null)
			};

			const deleteInvoice = buildDeleteInvoice(fakerRepository);
			const deleteInvoiceResponse = await deleteInvoice(1);

			expect(fakerRepository.findById.mock.calls.length).toBe(1);

			expect(deleteInvoiceResponse).toHaveProperty("code");
			expect(deleteInvoiceResponse).toHaveProperty("message");

			expect(deleteInvoiceResponse.code).toBe(404);
		});
	});
});
