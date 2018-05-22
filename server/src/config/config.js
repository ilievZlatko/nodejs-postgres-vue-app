module.exports = {
  PORT: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || 'recepiebook',
    user: process.env.DB_USER || 'recepieadmin',
    password: process.env.DB_PASS || 'Lucky1060',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
      storage: './recepiebook.postgres',
      operatorsAliases: false
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
