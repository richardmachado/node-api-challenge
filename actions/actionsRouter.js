const express = require("express");

const Actions = require("../data/helpers/actionModel.js");
const Projects = require("../data/helpers/projectModel.js");

const router = express.Router;

// GET all  --------------------------

router.get("/", (req,res) => {
    Actions.get()
    .then(actions => {
       res.status(200).json(actions);
    })
    .catch(err => {
        console.error(err); 
        res.status(500).json({ error: "Error getting projects"});
    });
});
