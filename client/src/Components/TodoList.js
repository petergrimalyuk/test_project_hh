const TodoList = ({todos}) => {

    return (
        <>

             
                
    {todos.map((todo) => (

    

        <div className="todos"
      
        key={todo.id} 
        >
            <div key={todo.id} className="item-todo" >
                <li className={todo.complete ? "item-text strike" : "item-text"} 
                
            


                >

                    {todo.todo_text}  {todo.complete}
                </li>
             
             
            </div>
         
        </div>
        
    ))
    
    }
    </>
    );
    
};
export default TodoList;
