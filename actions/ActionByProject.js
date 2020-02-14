const express = require('express')
const projectDb = require('../data/helpers/projectModel')

const router = express.Router()

router.get('/:id', validateProjectId, (req, res) => {
  console.log('actions', req.params.id)
  projectDb.getActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(error => {
      res.status(500).json({
        message: "The action information could not be retrieved."
      })
    })  
})

function validateProjectId(req, res, next){
  const id = req.params.id

  projectDb.get(id)
  .then(exists =>{
      !exists && res.status(400).json({message: "validateProjectID Project does not exist"})
  })

  next()
}

module.exports = router