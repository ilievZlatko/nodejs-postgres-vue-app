const { Recepie } = require('../models')

module.exports = {
  async loadSingleRecepie (req, res, next) {
    try {
      const recepies = await Recepie.find({
        where: {
          id: req.params.id
        }
      })
      const recepiesJson = recepies.toJSON()

      res.send({
        result: recepiesJson
      })
    } catch (err) {
      res.status(403).send({
        error: err,
        message: 'bad requiest'
      })
    }
  },

  async loadRecepies (req, res, next) {
    try {
      const recepies = await Recepie.findAll({
        attributes: ['id', 'userId', 'name', 'photoUrl', 'ingredients', 'directions']
      })

      res.send({
        result: recepies
      })
    } catch (err) {
      res.status(403).send({
        error: err,
        message: 'bad requiest'
      })
    }
  },

  async createRecepie (req, res, next) {
    try {
      const recepie = await Recepie.create(req.body)
      const recepieJson = recepie.toJSON()

      res.send({
        recepie: recepieJson,
        message: `Recepie was successfully created!`
      })
    } catch (err) {
      res.status(400).send({
        error: err,
        message: 'bad request'
      })
    }
  },

  async updateRecepie (req, res, next) {
    try {
      const recepieUpdated = await Recepie.update(
        {
          name: req.body.name,
          photoUrl: req.body.photoUrl,
          ingredients: req.body.ingredients,
          directions: req.body.directions
        },
        { returning: true, where: { id: req.params.id } }
      )

      const recepie = recepieUpdated[1][0].toJSON()

      res.send({
        result: recepie,
        message: 'recepie was successfully updated.'
      })
    } catch (err) {
      res.status(400).send({
        error: err,
        message: 'bad request'
      })
    }
  },

  async deleteRecepie (req, res, next) {
    try {
      await Recepie.destroy({
        where: { id: req.params.id }
      })

      res.send({
        message: 'recepie was successfully deleted.'
      })
    } catch (err) {
      res.status(400).send({
        error: err,
        message: 'bad request'
      })
    }
  }
}
