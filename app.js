const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const recepies = require('./routes/recepieRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Set public folder
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	req.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
		return res.status(200).json({});
	}
	next();
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/recepies', recepies);

// Server
app.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});
