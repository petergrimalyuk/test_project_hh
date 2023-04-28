const { query } = require('express');
const db = require('../db')

class TodoController {
    async createTodo(req, res) {
        
        const { todo_text, completed } = req.body
        let id;
      const todos = await db.query('SELECT * FROM todos')
        if(todos.rows.length === undefined){
            id = 0;
        }
        else id = todos.rows.length;
       
        const newTodo = 
       await db.query({
            text: `INSERT INTO todos (todo_text, completed , id) VALUES ($1, $2, $3) RETURNING *`,
            values : [todo_text, completed, id]
        }).catch((e)=>
        console.log(e))

      
        res.status(200).send(newTodo.rows[0])
    }
 
    async getTodos(req, res) {
        
      const todos = await db.query('SELECT * FROM todos')
        
        res.status(200).send(todos.rows)
      
    }
    async getOneTodo(req, res) {
        const id = req.params.id
        const todos = await db.query(`SELECT * FROM todos WHERE id = $1`, [id])
        res.status(200).send(todos.rows[0])
    }
    async updateTodo(req, res) {
  
        const { id, todo_text, completed } = req.body
 
        const todos = await db.query('UPDATE todos set todo_text = $1, completed = $2 where id = $3 RETURNING *', [todo_text, completed, id])
        res.status(200).send(todos.rows[0])
    }
    async deleteTodo(req, res) {
       
        const id = req.body.id;
        console.log("id", req.params);
        const todos = await db.query(`DELETE FROM todos WHERE id = $1`, [id])
        res.status(200).send(todos.rows[0])
    }
}

module.exports = new TodoController()