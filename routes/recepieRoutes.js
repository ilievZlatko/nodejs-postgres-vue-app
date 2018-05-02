const express = require('express');
const router = express.Router();
const pg = require('pg');

const connectionString =
	process.env.DATABASE_URL ||
	'postgresql://recepiesadmin:zlatko1060@localhost:5432/recepiebookdb';

const pool = new pg.Pool({ connectionString });

router.get('/', async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			'SELECT * FROM recepies ORDER BY id ASC'
		);
		res.status(200).json({ result: response.rows });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

router.post('/', async (req, res, next) => {
	const client = await pool.connect();

	try {
		const response = await client.query(
			`INSERT INTO recepies (name, ingredients, directions) VALUES('${
				req.body.name
			}', '${req.body.ingredients}', '${req.body.directions}')`
		);
		res.status(200).json({ result: 'successfully created' });
		client.release();
	} catch (err) {
		res.status(500).json({ result: err });
		client.release();
	}
});

module.exports = router;
