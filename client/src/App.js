import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    GetTodos();
  }, []);

  useEffect(() => {
    editTodo ? setNewTodo(editTodo.Todo) : setNewTodo("");
  }, [editTodo]);

  const GetTodos = async () => {
    try {
      const { data } = await axios.get("api/todos");
      setTodos(data[0]);
      console.log(data);
      console.log(todos);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async () => {
    if (!editTodo) {
      const data = await axios.post("api/todos", {
        ID: uuidv4(),
        Todo: newTodo,
      });
      setTodos([...todos, data]);
    } else {
      const updatedTodo = await axios.put(`api/todos/${editTodo.ID}`, {
        Todo: newTodo,
      });
      setEditTodo(null);
    }
    setNewTodo("");
    GetTodos();
  };

  const updateTodo = async (todo) => {
    setEditTodo(todo);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`api/todos/${id}`);
      GetTodos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div className="content">
        <h3 className="heading">Add Todos</h3>
        <input
          type="text"
          className="add-todo-input"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <div className="button" onClick={addTodo}>
          {editTodo ? "Update todo" : "Add todo"}
        </div>
      </div>
      <div className="todolist-box">
        {todos?.map((todo) => (
          <p key={todo.ID} className="todoitem">
            {todo.Todo}{" "}
            <button onClick={() => deleteTodo(todo.ID)} className="delete-btn">
              <i class="fas fa-trash-alt"></i>
            </button>
            <button onClick={() => updateTodo(todo)} className="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
