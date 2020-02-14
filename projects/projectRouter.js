const express = require('express')
const projectDb = require('../data/helpers/projectModel')

const projectRouter = express.Router()

projectRouter.get('/', (req, res) => {
  projectDb.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(error => {
      res.status(500).json({
        message: "The project information could not be retrieved."
      })
    })  
})

projectRouter.get('/:id', (req, res) => {
  console.log(`getting id ${req.params.id}`)
  projectDb.get(req.params.id)
    .then(project => {
      project.id !== null ? res.status(200).json(project) : res.status(404).json({
        message: "The project with the specified ID does not exist."
      })
    })
    .catch(error => {
      res.status(500).json({message: "The project information could not be retrieved."})
    })
})


projectRouter.post('/', (req, res) => {
  projectDb.insert(req.body)
  .then(project => {
    res.status(201).json(project)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "There was an error while saving the project to the database"})
  })
})

projectRouter.put('/:id', (req, res) => {
  projectDb.update(req.params.id, req.body)
    .then(updatedProject => {
      res.status(200).json(updatedProject)
    })
    .catch(error => {
      res.status(500).json({message:"unable to update project"})
    })
});

projectRouter.delete('/:id', (req, res) => {
  projectDb.remove(req.params.id)
    .then(deleted => {
        res.status(200).json({message: `removed ${deleted} item`})
    })
    .catch(error=> {
      res.status(500).json({message: "unable to delete project"})
    })
});



module.exports = projectRouter