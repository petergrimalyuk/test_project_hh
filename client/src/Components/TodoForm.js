import { useState, useEffect } from 'react'
import ModalInput from './ModalInput';
import TodoSearch from './TodoSearch';
import TodoList from './TodoList';


function Todoform({ todoLength }) {
    const [modalActive, setModalActive] = useState(false)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [todos, setTodos] = useState([])
    const [userInput, setUserInput] = useState('')
    const [userInputUpdate, setUserInputUpdate] = useState('')
    const [todo, setTodo] = useState([])
    const [isChecked, setIsChecked] = useState(false);
   
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = () => {        
        fetch('http://localhost:8000/', {
            method: 'GET',
        })

            .then(res => res.json())
            .then(

                (result) => {
                    const key = 'id';
                    const sorted = result.sort((res1,res2) => res1[key] > res2[key] ? 1 : -1);
                    setIsLoaded(true);
                    setTodos(sorted);
                    todoLength(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }

    const createTodo = () => {
        fetch('http://localhost:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo_text: userInput,
                complete: false
            }),
        })
            .then((res) => res.json())
            .then(result => {
                setTodos([...todos, result])
                getTodos()
            },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    const updateTodo = (id, todo_text, completed) => {
     
        fetch(`http://localhost:8000/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo_text: todo_text,
                completed: completed,
                id: id
            }),
        })
            .then((res) => res.json())
            .then(result => {
                setTodos([...todos])
                getTodos()
            },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }



    const removeTodo = (id) => {
        console.log(id);
        fetch(`http://localhost:8000/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            }),
        })
            .then(data => {
              
                getTodos()
            })
    }
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (userInput) {
            setUserInput('')
            createTodo()
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }
    const handleModalChange = (e) => {
        setUserInputUpdate(e.currentTarget.value)
    }
    const handleModalSubmit = (event) => {
        event.preventDefault()
        if (userInputUpdate) {
            setUserInputUpdate('')
            updateTodo(todo[0], userInputUpdate, isChecked)
            setModalActive(false)
        }

    }
    const handleKeyPressmodal = (e) => {
        if (e.key === 'Enter') {
            handleModalSubmit(e)
        }
    }




    let indexStart = 0;
    const [currentCard, setCurrentCard] = useState(null)



     const dragStartHandler = (e,entry, index,  complete) =>{
 
         indexStart = index;
    
        setCurrentCard(entry);
       
       }

    function dragEndHandler(e){
        console.log(indexStart);
    
      }
      function dragOverHandler(e){
       e.preventDefault()
       
      }

      function dropHandler(e,entry, index, complete){



        let temp;
        let temp_completed;

        for(let i = 0 ; i < todos.length ; i++){
          if(todos[i].todo_text === currentCard){
           console.log("ID : ",todos[i].id);
            indexStart = todos[i].id;
            temp = todos[i].todo_text;
            temp_completed = todos[i].completed;
           
        }
        }

     


        if(index != indexStart){
            if(indexStart > index){
            updateTodo(indexStart, entry, complete);
            updateTodo(index, temp, temp_completed);
            }
            else if(indexStart< index) {
             updateTodo(index, temp, temp_completed);
                updateTodo(indexStart, entry, complete);

            }


            return;
          }
    }
    const [filtered, setFiltered] = useState([]);

    const search = val => {

        //текущие задачи и новые отфильтрованные задачи
        let currentTodos = [], newList = [];
      let an_currentTodos = todos;
        if (val !== "") {
          //делаем копию нашего стейта
          currentTodos = todos;
          //фильтруем стейт в поисках совпадений
          newList = currentTodos.filter(todo => {
            // значение которое пользователь ввел и которое у нас
            // в стейте делаем строчными буквами чтобы конфликтов не было
            // мало ли пользователь ввель строчными буквами а у нас заглавные
            const lc = todo.todo_text.toLowerCase();
           
            const filter = val.toLowerCase();
            // проверяем есть ли у нас этот элемент если есть возвращаем его
            return lc.includes(filter);
          });
        
        }  else {
          // если в input ничего нету то есть пользователь стер то
          // что ввел тогда возвращаем все задачи
         newList = todos;
         console.log(an_currentTodos);
         getTodos();
        
        }
        setTodos(newList);
    
      };
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else if (todos) {

        return (
            

            
            <div>
                
                <TodoSearch {...{search}} />
                <form onSubmit={handleSubmit}>
                
                    <input
                        className='input'
                        value={userInput}
                        type="text"
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Введите текст"
                    />
                    <button className="item-save">Сохранить</button>
                </form>
               
            
                {
                
                todos
                 .map((todo) => {

                    return (
                        
                    <div className="todos"
                    onDragStart={(e)=>{dragStartHandler(e,todo.todo_text, todo.id, todo.completed)}}
                    onDragLeave={(e)=>{dragEndHandler(e)}}
                    onDragEnd={(e)=>{dragEndHandler(e)}}
                    onDragOver= {(e)=>{dragOverHandler(e)}}
                    onDrop={(e)=>{dropHandler(e,todo.todo_text,  todo.id, todo.completed)}}
                    draggable= {true} 
                    key={todo.id} 
                    >
                        <div key={todo.id} className="item-todo" >
                            <li className={todo.complete ? "item-text strike" : "item-text"} >
                              {todo.todo_text}  {todo.complete}
                            </li>
                           

                            <div className='todo-checkbox'>
                                <input className='checkbox' type="checkbox" checked={todo.completed ? true : false} onChange={() => { updateTodo(todo.id, todo.todo_text, !todo.completed); setIsChecked(!todo.completed) }} />
                            </div>
                        </div>
                        
                        <button className="item-update" onClick={() => { setModalActive(true); setTodo([todo.id, todo.todo_text, todo.completed]); setUserInputUpdate(todo.todo_text); setIsChecked(todo.completed) }}>
                            Изменить
                        </button>
                        <button className="item-delete" onClick={ () =>{ removeTodo(todo.id)}}>
                            X
                        </button>
                     
                    </div>
                    
                    )
                })}

                <ModalInput active={modalActive} setActive={setModalActive}>
                    <form onSubmit={handleModalSubmit}>
                        <input
                            className='input'
                            value={userInputUpdate}
                            type="text"
                            onChange={handleModalChange}
                            onKeyDown={handleKeyPressmodal}
                            placeholder="Введите текст"
                        />
                        <input className='checkbox' type="checkbox" checked={isChecked ? true : false} onChange={handleOnChange} />
                        <button className="item-save">Сохранить</button>
                    </form>
                </ModalInput>
            </div>
        )
    }
}

export default Todoform
