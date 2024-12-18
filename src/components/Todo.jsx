import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { addTask, removeTask, toggleTask, editTask } from '../AppStore/todoSlice';

Modal.setAppElement('#root'); // Accessibility feature for react-modal

const TodoApp = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal open state
  const [editText, setEditText] = useState(''); // Text for editing
  const [editingId, setEditingId] = useState(null); // ID of the task being edited

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const inputRef=useRef();
 
  // Add task
  const handleAddTask = () => {
    const task=inputRef.current.value
    if (task.trim()) {
      dispatch(addTask(task));
      inputRef.current.value="";
    }
  };

  // Open modal for editing
  const openModal = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setEditingId(null);
    setEditText('');
  };

  // Save changes from modal
  const saveEditTask = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: editingId, newText: editText })); // Dispatch editTask action
      closeModal();
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {/* Add Task Input */}
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter a task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button onClick={() => dispatch(toggleTask(todo.id))}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => openModal(todo.id, todo.text)}>Edit</button>
            <button onClick={() => dispatch(removeTask(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal for Editing Task */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task"
        style={{
          content: {
            width: '300px',
            height:'200px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          },
          overlay: {
            backgroundColor: 'rgba(193, 192, 192, 0.5)',
          },
        }}
      >
        <h2>Edit Task</h2>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="Edit your task"
        />
        <div style={{ marginTop: '20px' }}>
          <button onClick={saveEditTask} style={{ marginRight: '10px' }}>
            Save
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoApp;
