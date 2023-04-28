import { useState } from 'react'
import Todoform from './Components/TodoForm'
import TodoList from './Components/TodoList';
import TodoSearch from './Components/TodoSearch';


function App() {
  const [todo, setTodo] = useState([])
  const [filtered, setFiltered] = useState([]);

 
  const todoLength = (todos) => {
    if (todos) {
      setTodo(todos)
    }
  }
  return (
    <div className="App">

      <header>
        <h1>Список задач: {todo.length} </h1>
      </header>

      <Todoform todoLength={todoLength} />
      
    </div>
  );
}

export default App;
