function buildAuthenticate({ key, jwtGenerator }) {
	return async function authenticate({ name, email } = {}) {
		return {
			code: 200,
			token: jwtGenerator(
				{
					name,
					email
				},
				key,
				{ expiresIn: "14h" }
			)
		};
	};
}

module.exports = buildAuthenticate;
