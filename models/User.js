const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const variables = require('../utils/environmentVars');

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(variables.POSTGRES_CONNECTION_STRING);

// setup User model and its fields.
const User = sequelize.define(
	'users',
	{
		first_name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		last_name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		hooks: {
			beforeCreate: user => {
				const salt = bcrypt.genSaltSync();
				user.password = bcrypt.hashSync(user.password, salt);
			}
		},
		instanceMethods: {
			validPassword: function(password) {
				return bcrypt.compareSync(password, this.password);
			}
		}
	}
);

// create all the defined tables in the specified database.
sequelize
	.sync()
	.then(() =>
		console.log(
			"users table has been successfully created, if one doesn't exist"
		)
	)
	.catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;
