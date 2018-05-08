const express = require('express');
const router = express.Router();
const pg = require('pg');
const queries = require('../utils/recepieQueries');
const variables = require('../utils/environmentVars');

const pool = new pg.Pool({
	user: variables.USER,
	host: variables.HOST,
	database: variables.DATABASE,
	password: variables.PASSWORD,
	port: variables.PORT,
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
		res.redirect('/');
	} else {
		next();
	}
};

// ROUTES
// GET all recepies Route
router.get('/', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(queries.GET_ALL_RECEPIES);
		res.status(200).json({ result: response.rows });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// GET one recipe by ID
router.get('/:id', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(queries.GET_ONE_RECIPE(req.params.id));
		res.status(200).json({ result: response.rows });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// POST Route
router.post('/', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			queries.INSERT_NEW_RECIPE(
				req.body.name,
				req.body.ingredients,
				req.body.directions,
				req.body.userId,
			),
		);
		res.status(200).json({ result: 'successfully created' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// UPDATE Route
router.put('/:id', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			queries.UPDATE_RECIPE(req.params.id, {
				name: req.body.name,
				ingredients: req.body.ingredients,
				directions: req.body.directions,
				user_id: req.body.userId,
			}),
		);
		res.status(200).json({ result: 'successfully updated' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// DELETE Route
router.delete('/', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(queries.DELETE_RECIPE(req.body.id));
		res.status(200).json({ result: 'successfully deleted' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

module.exports = router;
