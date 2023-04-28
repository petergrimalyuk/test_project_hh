const TodoSearch = props => {
    return (
        <input
          onChange={({ target: { value } }) => props.search(value)}
          type="text"
          placeholder="Поиск"
        />
      );
  };
  
  export default TodoSearch;