// QUERIES
const GET_ALL_RECEPIES = 'SELECT * FROM recepies ORDER BY id ASC';
const GET_ONE_RECIPE = id => `SELECT * FROM recepies WHERE id = ${id}`;
const INSERT_NEW_RECIPE = (name, ingredients, directions, userId, photoUrl) => `
	INSERT INTO recepies (name, ingredients, directions, user_id, photo_url)
	VALUES('${name}', '${ingredients}', '${directions}', '${userId}', '${photoUrl}')
`;
const UPDATE_RECIPE = (id, params) => `
	UPDATE recepies SET
	name = '${params.name}',
	ingredients = '${params.ingredients}',
	directions = '${params.directions}',
	photo_url = '${params.photoUrl}',
	WHERE id = ${id};
`;
const DELETE_RECIPE = id => `DELETE FROM recepies WHERE id = ${id}`;

const DELETE_ALL_USER_RECEPIES = userId =>
	`DELETE FROM recepies WHERE user_id = ${userId}`;

module.exports.GET_ALL_RECEPIES = GET_ALL_RECEPIES;
module.exports.GET_ONE_RECIPE = GET_ONE_RECIPE;
module.exports.INSERT_NEW_RECIPE = INSERT_NEW_RECIPE;
module.exports.UPDATE_RECIPE = UPDATE_RECIPE;
module.exports.DELETE_RECIPE = DELETE_RECIPE;
module.exports.DELETE_ALL_USER_RECEPIES = DELETE_ALL_USER_RECEPIES;