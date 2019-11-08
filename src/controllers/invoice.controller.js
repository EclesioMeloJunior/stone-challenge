module.exports = router => {
	router.get("/", (request, response) => {
		return response.json({ message: "Olá" });
	});

	return router;
};
