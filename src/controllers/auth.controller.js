const { authenticate } = require("../services/auth");
const { authMiddleware } = require("../router/middleware");

module.exports = router => {
	router.get("/user", authMiddleware, (request, response) => {
		return response.json({ user: request.user });
	});

	router.post("/token", async (request, response) => {
		const authenticateUser = await authenticate(request.body);
		return response.json(authenticateUser);
	});

	return router;
};
