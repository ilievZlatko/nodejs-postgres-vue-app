// QUERIES
const GET_ALL_RECEPIES = 'SELECT * FROM recepies ORDER BY id ASC';
const GET_ONE_RECIPE = id => `SELECT * FROM recepies WHERE id = ${id}`;
const INSERT_NEW_RECIPE = (body) => `
	INSERT INTO recepies (name, ingredients, directions, user_id, photo_url)
	VALUES('${body.name}', '${body.ingredients}', '${body.directions}', '${body.user_id}', '${body.photo_url}');
`;
const UPDATE_RECIPE = (id, body) => `
	UPDATE recepies SET
	name = '${body.name}',
	ingredients = '${body.ingredients}',
	directions = '${body.directions}',
	photo_url = '${body.photo_url}',
	user_id = '${body.user_id}'
	WHERE id = ${id};
`;
const DELETE_RECIPE = id => `DELETE FROM recepies WHERE id = ${id}`;

const DELETE_ALL_USER_RECEPIES = user_id =>
	`DELETE FROM recepies WHERE user_id = ${user_id}`;

module.exports.GET_ALL_RECEPIES = GET_ALL_RECEPIES;
module.exports.GET_ONE_RECIPE = GET_ONE_RECIPE;
module.exports.INSERT_NEW_RECIPE = INSERT_NEW_RECIPE;
module.exports.UPDATE_RECIPE = UPDATE_RECIPE;
module.exports.DELETE_RECIPE = DELETE_RECIPE;
module.exports.DELETE_ALL_USER_RECEPIES = DELETE_ALL_USER_RECEPIES;