function buildAuthMiddleware({ key, jwtChecker }) {
	function searchForToken(request) {
		return request.headers["authorization"];
	}

	return function authMiddleware(request, response, next) {
		const bearerToken = searchForToken(request);

		if (!bearerToken) {
			return response.status(401).send({ message: "Unauthorized" });
		}

		const [_, token] = bearerToken.split(" ");

		try {
			const tokenDecodified = jwtChecker(token, key);
			request.user = { ...tokenDecodified };
			return next();
		} catch (exception) {
			return response.status(401).send({ message: "Unauthorized" });
		}
	};
}

module.exports = buildAuthMiddleware;
