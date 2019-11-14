const {
	addInvoice,
	getInvoices,
	updateInvoice,
	deleteInvoice,
	getInvoiceById
} = require("../services/invoices");

const {
	invoicePostSchema,
	invoicePutSchema,
	invoicePatchSchema,
	invoiceGetSchema
} = require("../schemas/invoices");

module.exports = router => {
	router.get("/", async (request, response) => {
		console.log(request.user);

		const { page, itemsPerPage, sort, filter } = request.query;

		const getInvoicesPayload = {
			page,
			itemsPerPage
		};

		if (sort) {
			const sortBy = sort.split(",").map(sortRequest => {
				const [field, orientation] = sortRequest.split(":");

				const defineOrientation = orientation => {
					if (!orientation) return false;
					if (orientation === "desc") return true;
					if (orientation === "asc") return false;

					return null;
				};

				return { name: field, desc: defineOrientation(orientation) };
			});

			getInvoicesPayload["sortBy"] = sortBy;
		}

		if (filter) {
			const filterBy = filter.split(",").map(filterRequest => {
				const [field, value] = filterRequest.split(":");
				return { name: field, value: value || null };
			});

			getInvoicesPayload["filterBy"] = filterBy;
		}

		const requestPayload = invoiceGetSchema.validate(getInvoicesPayload);

		if (requestPayload.error) {
			return response.status(400).json(requestPayload.error);
		}

		const getInvoicesResponse = await getInvoices(requestPayload.value);
		return response.status(200).json(getInvoicesResponse);
	});

	router.get("/:id", async (request, response) => {
		const invoiceId = request.params.id;
		const getInvoiceByIdResponse = await getInvoiceById(invoiceId);

		return response
			.status(getInvoiceByIdResponse.code)
			.json(getInvoiceByIdResponse);
	});

	router.post("/", async (request, response) => {
		const invoiceDto = request.body;

		const schemaValidation = invoicePostSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.error);
		}

		const addInvoiceResponse = await addInvoice(invoiceDto);
		return response.status(addInvoiceResponse.code).json(addInvoiceResponse);
	});

	router.put("/:id", async (request, response) => {
		const invoiceDto = request.body;
		const invoiceId = request.params.id;

		const schemaValidation = invoicePutSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.error);
		}

		const updateInvoiceResponse = await updateInvoice(
			invoiceId,
			schemaValidation.value
		);

		return response
			.status(updateInvoiceResponse.code)
			.json(updateInvoiceResponse);
	});

	router.patch("/:id", async (request, response) => {
		const invoiceDto = request.body;
		const invoiceId = request.params.id;

		const schemaValidation = invoicePatchSchema.validate(invoiceDto);

		if (schemaValidation.error) {
			return response.status(400).json(schemaValidation.error);
		}

		const updateInvoiceResponse = await updateInvoice(invoiceId, invoiceDto);

		return response
			.status(updateInvoiceResponse.code)
			.json(updateInvoiceResponse);
	});

	router.delete("/:id", async (request, response) => {
		const invoiceId = request.params.id;

		const deletedInvoiceResponse = await deleteInvoice(invoiceId);

		return response
			.status(deletedInvoiceResponse.code)
			.json(deletedInvoiceResponse);
	});

	return router;
};
