const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);

const ENDPOINT = "/api/v1/invoices";

describe("[GET] Request all invoices", () => {
	describe("When request without filters", () => {
		test("should return invoices paginated", async () => {
			const response = await request.get(ENDPOINT);

			expect(typeof response).toBe("object");
		});
	});
});
