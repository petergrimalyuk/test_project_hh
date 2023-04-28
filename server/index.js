const express = require('express')
const todoRouter = require('./routes/todo.routes')

const PORT =  8000

const app = express()
const mainRoutes = require('./routes/todo.routes'); 




app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 


app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');//'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });
app.use('/', todoRouter)





