// QUERIES
const GET_ALL_USERS = 'SELECT * FROM users ORDER BY id ASC';

const GET_ONE_USER = user_id => `SELECT * FROM users WHERE id = ${user_id}`;

const INSERT_NEW_USER = (
	first_name,
	last_name,
	email,
	password,
	createdAt,
	updatedAt,
) => `
	INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
	VALUES('${first_name}', '${last_name}', '${email}', '${password}', '${createdAt}', '${updatedAt}')
`;

const UPDATE_USER = (user_id, params) => {
	console.log(params);
	return `
		UPDATE users SET
		first_name = '${params.first_name}',
		last_name = '${params.last_name}',
		email = '${params.email}',
	  	password = '${params.password}',
		updated_at = '${params.updatedAt}'
		WHERE id = ${userId};
	`;
};

const DELETE_USER = user_id => `DELETE FROM users WHERE id = ${user_id}`;

module.exports.GET_ALL_USERS = GET_ALL_USERS;
module.exports.GET_ONE_USER = GET_ONE_USER;
module.exports.INSERT_NEW_USER = INSERT_NEW_USER;
module.exports.UPDATE_USER = UPDATE_USER;
module.exports.DELETE_USER = DELETE_USER;
