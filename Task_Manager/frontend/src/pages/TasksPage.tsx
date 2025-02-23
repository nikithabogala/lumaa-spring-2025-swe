// frontend/src/pages/TasksPage.tsx
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // State for editing
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDesc, setEditingDesc] = useState('');

  const token = localStorage.getItem('token') || '';

  const fetchTasks = async () => {
    const data = await getTasks(token);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask(token, newTitle, newDesc);
    setNewTitle('');
    setNewDesc('');
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(token, id);
    fetchTasks();
  };

  const handleToggleComplete = async (task: Task) => {
    await updateTask(token, task.id, { 
      title: task.title, 
      description: task.description, 
      isComplete: !task.isComplete 
    });
    fetchTasks();
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDesc(task.description || '');
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTitle('');
    setEditingDesc('');
  };

  const saveEditing = async (id: number) => {
    await updateTask(token, id, {
      title: editingTitle,
      description: editingDesc,
      // Preserve current isComplete status
      isComplete: tasks.find((t) => t.id === id)?.isComplete || false,
    });
    cancelEditing();
    fetchTasks();
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <form onSubmit={handleCreateTask}>
        <input 
          type="text" 
          placeholder="Task title" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Task description" 
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '1rem 0' }}>
            {editingTaskId === task.id ? (
              // Editing mode: show input fields and Save/Cancel buttons
              <div>
                <input 
                  type="text" 
                  value={editingTitle} 
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <input 
                  type="text" 
                  value={editingDesc} 
                  onChange={(e) => setEditingDesc(e.target.value)}
                />
                <button onClick={() => saveEditing(task.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              // Normal display mode
              <div>
                <strong style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
                  {task.title}
                </strong>
                {task.description && <p>{task.description}</p>}
                <button 
                  onClick={() => handleToggleComplete(task)} 
                  style={{ marginRight: '1rem' }}
                >
                  {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => startEditing(task)} 
                  style={{ marginRight: '1rem' }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
