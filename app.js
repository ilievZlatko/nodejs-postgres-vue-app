const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const recipeRoutes = require('./routes/recepieRoutes');
const User = require('./models/User');

const app = express();

const PORT = process.env.PORT || 5000;

// Set public folder
// app.use(express.static(path.join(__dirname, 'client/build')));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
	session({
		key: 'user_sid',
		secret: 'somerandonstuffs',
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 600000
		}
	})
);

// Allow CORS header config
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

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
	if (req.cookies.user_sid && !req.session.user) {
		res.clearCookie('user_sid');
	}
	next();
});

// Routes
app.use('/api/recepies', recipeRoutes);

// Start Server
app.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});
