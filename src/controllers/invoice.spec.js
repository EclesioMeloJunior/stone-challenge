const app = require("../server");
const supertest = require("supertest");
const config = require("../config");
const database = require("../database");

const request = supertest(app);
const ENDPOINT_INVOICES = "/api/v1/invoices";
const ENDPOINT_AUTH = "/api/v1/auth";

let AUTH_TOKEN = null;

beforeAll(async () => {
	await database.connect(config);

	const response = await request
		.post(`${ENDPOINT_AUTH}/token`)
		.send({ name: "User Tester", email: "user@testes.com" });

	AUTH_TOKEN = response.body.token;
});

describe("[GET] /api/v1/invoices", () => {
	describe("When request without filters", () => {
		test("should return invoices paginated", async () => {
			const response = await request
				.get(ENDPOINT_INVOICES)
				.set("Authorization", `Bearer ${AUTH_TOKEN}`);
			expect(typeof response).toBe("object");
		});
	});
});

describe("[POST] /api/v1/invoices", () => {
	describe("When request withouth required fields", () => {
		test("should return code 400 (Bad Request)", async () => {
			request
				.post(ENDPOINT_INVOICES)
				.set("Authorization", `Bearer ${AUTH_TOKEN}`)
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
			const response = await request
				.post(ENDPOINT_INVOICES)
				.set("Authorization", `Bearer ${AUTH_TOKEN}`)
				.send(fakerInvoice);

			expect(response.statusCode).toBe(201);
		});

		test("should return created object with id", async () => {
			const postInvoiceResponse = await request
				.post(ENDPOINT_INVOICES)
				.set("Authorization", `Bearer ${AUTH_TOKEN}`)
				.send({ ...fakerInvoice });

			const expectedResponse = {
				...fakerInvoice,
				...postInvoiceResponse.body.data
			};

			expect(postInvoiceResponse.body.data).toHaveProperty("id");
			expect(postInvoiceResponse.body.data).toMatchObject(expectedResponse);
		});
	});
});
