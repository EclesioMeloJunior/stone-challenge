function buildAuthenticate({ key, jwtGenerator }) {
	return async function authenticate({ name, email, password } = {}) {
		return {
			code: 200,
			token: jwtGenerator(
				{
					name,
					email,
					password
				},
				key,
				{ expiresIn: "14h" }
			)
		};
	};
}

module.exports = buildAuthenticate;
