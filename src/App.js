import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [updatedId, setUpdatedId] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedCompleted, setUpdatedCompleted] = useState('');


  useEffect(() => {


    return () => {
      // fetchTodos();
    }
  }, [])



  const fetchTodos = async () => {
    try {
      await fetch('https://fakestoreapi.com/products').then(async (response) => {
        const data = await response.json();
        console.log(data)
        setTodos(data)
      }).catch(e => { throw e })
     

    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  

  // create a post request for sending data
  const createTodo = async () => {

    const title = document.getElementById('titleInput').value;
    const completed = document.getElementById('completedCheckbox').checked;

    try {
      await axios.post('http://localhost:5000/todos', {
        title: title,
        completed: completed
      }).then(d => {
        window.location.reload();
      }).catch(error => {
        console.log(error)
      })
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  // edit created items
  const handleEditClick = (todoId) => {
    setEditMode(true);
    setUpdatedId(todoId)
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = async (event) => {
    // Perform the update logic
    // You can use a state management library or make an API request here

    event.preventDefault();

    const updatedFields = {
      title: updatedTitle,
      completed: updatedCompleted
    };
    try {
      await axios.put(`http://localhost:5000/todos/${updatedId}`, updatedFields).then(d => {
        window.location.reload()
      }).catch((error) => {
        console.error('Error updating todo:', error);
      })
    } catch (error) {
      console.error('Error updating todo:', error);
    }

    console.log('Updated title:', updatedTitle);
    console.log('Updated completed status:', updatedCompleted);

    setEditMode(false);
  };

  // delet items
  const handleDeleteClick = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todoId}`).then(d => {
        window.location.reload()
      }).catch((error) => {
        console.error('Error updating todo:', error);
      })
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  // sort feature
  const handleSortClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos/sorted');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }

  }


  return (
    <div>
      <h1>Todo List</h1>
      <input
        id='titleInput'
        className="todo-input"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        type='checkbox'
        id='completedCheckbox'
      />
      <button className="add-button" onClick={createTodo}>
        Add
      </button>
      <button className="add-button" onClick={handleSortClick}>
        Sort
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button className="add-button" onClick={() => { handleEditClick(todo.id) }}>
              Edit
            </button>
            <button className="add-button" onClick={() => { handleDeleteClick(todo.id) }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div>
        {editMode ? (
          <div>
            <label>Title:</label>
            <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
            <br />
            <label>Completed:</label>
            <input type="checkbox" checked={updatedCompleted} onChange={(e) => setUpdatedCompleted(e.target.checked)} />
            <br />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <div>

          </div>
        )}
      </div>
    </div>

    

  );
};

export default App;
