const express = require('express');
const router = express.Router();
const pg = require('pg');
const bcrypt = require('bcrypt');
const queries = require('../utils/userQueries');
const { DELETE_ALL_USER_RECEPIES } = require('../utils/recepieQueries');
const variables = require('../utils/environmentVars');

// open db connection
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
		const response = await client.query(queries.GET_ALL_USERS);
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
		const response = await client.query(
			queries.GET_ONE_USER(req.params.userId),
		);
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
	const hashedPassword = bcrypt.hashSync(req.body.password, 10);

	try {
		const response = await client.query(
			queries.INSERT_NEW_USER(
				req.body.firstName,
				req.body.lastName,
				req.body.email,
				hashedPassword,
				new Date().toISOString(),
				new Date().toISOString(),
			),
		);

		res
			.status(200)
			.json({ result: response.rows, message: 'successfully created' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// UPDATE Route
router.put('/:id', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();
	const hashedPassword = bcrypt.hashSync(req.body.password, 10);

	try {
		const response = await client.query(
			queries.UPDATE_USER(req.params.id, {
				...req.body,
				password: hashedPassword,
				updatedAt: new Date().toISOString(),
			}),
		);
		res
			.status(200)
			.json({ result: response.rows, message: 'successfully updated' });
		client.release();
	} catch (err) {
		console.log(err);
		res.status(500).json({ result: err });
		client.release();
	}
});

// DELETE Route
router.delete('/', sessionChecker, async (req, res, next) => {
	const client = await pool.connect();

	try {
		await client.query(DELETE_ALL_USER_RECEPIES(req.body.userId));
		const response = await client.query(queries.DELETE_USER(req.body.userId));
		res.status(200).json({ result: 'successfully deleted' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

module.exports = router;
