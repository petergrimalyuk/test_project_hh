const PORT =  8000
const express = require('express') 
const app = express()
require('./routes/todo.routes')(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) 

