const { Recepie } = require('../models')

module.exports = {
  async loadSingleRecepie (req, res, next) {
    try {
      const recepies = Recepie.find({
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
      const recepies = Recepie.findAll()
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

  async createRecepie (req, res, next) {
    try {
      const recepie = Recepie.create(req.body)
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
      const recepie = Recepie.update(
        req.body,
        { where: { id: req.params.id } }
      )
      const recepieJson = recepie.toJSON()

      res.send({
        recepie: recepieJson,
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
      Recepie.destroy({
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
