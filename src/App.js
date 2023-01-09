import './App.css';
import TaskForm from './TaskForm';
import Task from './Task';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);
  
 
  function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name, done:false}];
    });
  }

  function updateTaskDone(taskIndex, newDone){
    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }
  
  const complete = tasks.filter(t => t.done).length;
  const total = tasks.length;

  function getMessage(){
    const perc = complete/total*100;
    if (perc === 0) {
      return 'Try to do at least one Task !'
    }
    else if (perc === 100) {
      return 'Nice job for today !'
    }
    return 'Keep it going ';
  }


  return (
    <main>
      <h1>{complete}/ {total} Complete </h1>
      <h2> {getMessage()} </h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index)=> (
        <Task {...task} 
        onToggle={done=> updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
