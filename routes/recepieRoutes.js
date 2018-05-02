const express = require('express');
const router = express.Router();
const pg = require('pg');
const queries = require('./QUERIES');

const connectionString =
	process.env.DATABASE_URL ||
	'postgresql://recepiesadmin:zlatko1060@localhost:5432/recepiebookdb';

const pool = new pg.Pool({ connectionString });

// ROUTES
// GET all recepies Route
router.get('/', async (req, res, next) => {
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
router.get('/:id', async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			queries.GET_ONE_RECIPE(req.params.id)
		);
		res.status(200).json({ result: response.rows });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// POST Route
router.post('/', async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			queries.INSERT_NEW_RECIPE(
				req.body.name,
				req.body.ingredients,
				req.body.directions
			)
		);
		res.status(200).json({ result: 'successfully created' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// UPDATE Route
router.put('/:id', async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			queries.UPDATE_RECIPE(req.params.id, {
				name: req.body.name,
				ingredients: req.body.ingredients,
				directions: req.body.directions
			})
		);
		res.status(200).json({ result: 'successfully updated' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

// DELETE Route
router.delete('/:id', async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			queries.DELETE_RECIPE(req.params.id)
		);
		res.status(200).json({ result: 'successfully deleted' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

module.exports = router;
