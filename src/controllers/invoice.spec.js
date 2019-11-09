const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

const ENDPOINT = "/api/v1/invoices";

describe("[GET] /api/v1/invoices", () => {
	describe("When request without filters", () => {
		test("should return invoices paginated", async () => {
			const response = await request.get(ENDPOINT);
			expect(typeof response).toBe("object");
		});
	});
});

describe("[POST] /api/v1/invoices", () => {
	describe("When request withouth required fields", () => {
		test("should return code 400 (Bad Request)", async () => {
			request
				.post(ENDPOINT)
				.send({})
				.expect(400);
		});
	});

	describe("When request with required fields", () => {
		const fakerInvoice = {
			referenceMonth: 2,
			referenceYear: 2019,
			amount: 10,
			document: "Faker invoice"
		};

		test("should return code 201 (Created)", async () => {
			const response = await request.post(ENDPOINT).send(fakerInvoice);
			expect(response.statusCode).toBe(201);
		});

		test("should return created object with id", async () => {
			const postInvoiceResponse = await request
				.post(ENDPOINT)
				.send({ ...fakerInvoice });

			const expectedResponse = {
				...postInvoiceResponse.body,
				...fakerInvoice
			};

			expect(postInvoiceResponse.body).toHaveProperty("id");
			expect(postInvoiceResponse.body).toMatchObject(expectedResponse);
		});
	});
});
