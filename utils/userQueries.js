// QUERIES
const GET_ALL_USERS = 'SELECT * FROM users ORDER BY id ASC';

const GET_ONE_USER = userId => `SELECT * FROM users WHERE id = ${userId}`;

const INSERT_NEW_USER = (
	firstName,
	lastName,
	email,
	password,
	createdAt,
	updatedAt,
) => `
	INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
	VALUES('${firstName}', '${lastName}', '${email}', '${password}', '${createdAt}', '${updatedAt}')
`;

const UPDATE_USER = (userId, params) => {
	console.log(params);
	return `
		UPDATE users SET
		first_name = '${params.firstName}',
		last_name = '${params.lastName}',
		email = '${params.email}',
	  password = '${params.password}',
		updated_at = '${params.updatedAt}'
		WHERE id = ${userId};
	`;
};

const DELETE_USER = userId => `DELETE FROM users WHERE id = ${userId}`;

module.exports.GET_ALL_USERS = GET_ALL_USERS;
module.exports.GET_ONE_USER = GET_ONE_USER;
module.exports.INSERT_NEW_USER = INSERT_NEW_USER;
module.exports.UPDATE_USER = UPDATE_USER;
module.exports.DELETE_USER = DELETE_USER;
