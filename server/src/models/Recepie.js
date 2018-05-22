module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Recepie', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    ingredients: {
      type: DataTypes.TEXT,
      required: true
    },
    directions: {
      type: DataTypes.TEXT,
      required: true
    },
    photoUrl: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      required: true
    }
  })
}
