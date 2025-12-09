import './App.css';
import Task from './components/Task';
import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/Form';
import { getTasks, addTask, deleteTask, updateTask } from "./api/tasky-api";

function App() {
  // Task state
  const [taskState, setTaskState] = useState({ tasks: [] });

  // Load tasks from API when component mounts
  useEffect(() => {
    getTasks().then(tasks => {
      setTaskState({ tasks: tasks });
    });
  }, []);

  // Form state for new tasks
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low"
  });

  // Toggle task done status
  const doneHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    tasks[taskIndex].done = !tasks[taskIndex].done;
    updateTask(tasks[taskIndex]); // update on API
    setTaskState({ tasks });
  }

  // Delete task
  const deleteHandler = (taskIndex) => {
    const tasks = [...taskState.tasks];
    const id = tasks[taskIndex]._id; // use API _id
    tasks.splice(taskIndex, 1);
    deleteTask(id); // delete from API
    setTaskState({ tasks });
  }

  // Handle changes in the form
  const formChangeHandler = (event) => {
    let form = { ...formState };

    switch(event.target.name) {
      case "title":
        form.title = event.target.value;
        break;
      case "description":
        form.description = event.target.value;
        break;
      case "deadline":
        form.deadline = event.target.value;
        break;
      case "priority":
        form.priority = event.target.value;
        break;
      default:
        form = formState;
    }

    setFormState(form);
  }

  // Handle form submission
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const tasks = taskState.tasks ? [...taskState.tasks] : [];
    const form = { ...formState };

    const newTask = await addTask(form); // add task to API
    tasks.push(newTask);
    setTaskState({ tasks });

    // Reset form
    setFormState({ title: "", description: "", deadline: "", priority: "Low" });
  }

  return (
    <div className="container">
      <h1>Tasky</h1>
      {taskState.tasks.map((task, index) => (
        <Task 
          key={task._id} // use API _id
          title={task.title}
          description={task.description}
          deadline={task.deadline}
          priority={task.priority}
          done={task.done}
          markDone={() => doneHandler(index)}
          deleteTask={() => deleteHandler(index)}
        />
      ))}

      <AddTaskForm 
        submit={formSubmitHandler} 
        change={formChangeHandler} 
        formState={formState} 
      />
    </div>
  );
}

export default App;