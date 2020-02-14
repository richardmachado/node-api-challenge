const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
const projectRouter = require('./projects/projectRouter')
const actionRouter = require('./actions/actionRouter')


const server = express();

// 3rd party middleware

server.use(express.json())
server.use(helmet())
server.use(logger)
server.use(cors())


server.use('/api/projects/', projectRouter)
server.use('/api/actions/', actionRouter)


server.get('/', (req, res) => {
  res.send(`Sprint Challenge`);
});

function logger(req, res, next) {
  console.log(`Method ${req.method}, the URL was ${req.url}, ${Date(Date.now).toString()}`)
  next()
}


module.exports = server;