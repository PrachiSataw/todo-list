"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Nav from "../Components/Nav";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const page = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setmainTask] = useState([]);
  const [edit, setedit] = useState(null);

  const updateMainTask = (filteredTasks) => {
    setmainTask(filteredTasks);
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    if (!edit) {
      setmainTask([
        ...mainTask,
        { id: uuidv4(), title, desc, completed: false },
      ]);
      console.log(mainTask);
      setdesc("");
      settitle("");
    }
    else {
      updateTodo(title, desc, edit.id, edit.completed);
    }
  }

  const toggleComplete = (id) => {
    const updatedTasks = mainTask.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setmainTask(updatedTasks);
    console.log(setmainTask);
  };

  
  const deleteHandler = (taskTodelete) => {
    // let copytask = [...mainTask];
    // copytask.splice(task.id, 1);
    // setmainTask(copytask);

    const updatedTasks = mainTask.filter((task) => task.id !== taskTodelete.id);
    setmainTask(updatedTasks);
  };


  

  const editHandler = (task) => {
    setedit(task);
    console.log(setedit);
  };

  const updateTodo = (updatedtitle, updateddesc, id, completed) => {
    //
    const updatedTasks = mainTask.map((task) =>
      task.id === id
        ? { ...task, title: updatedtitle, desc: updateddesc, completed }
        : task
    );
    setmainTask(updatedTasks);
    setedit(null);
  };

  useEffect(() => {
    if (edit) {
      settitle(edit.title);
      setdesc(edit.desc);
    } else {
      settitle("");
      setdesc("");
    }
  }, [edit]);

  

  let renderTask = <div></div>;
  if (mainTask.length > 0) {
  }
  renderTask = mainTask.map((task) => {
    const editButtonClassName = edit && edit.id === task.id

    ? "edit bg-pink-700 text-white rounded font-bold"
    : "edit bg-green-400 text-white rounded font-bold";
    
     // Get the current date and time
     const currentDate = new Date();
     const formattedDate = currentDate.toLocaleString(); // Use toLocaleString to include both date and time

    return (
      <div className="list">
        <li key={task.id} className="flex py-2 px-2 justify-between">
          <div className="content">
          <small>{formattedDate}</small>
            <h5 className="text-2xl font-semibold">{task.title}</h5>
            <h6 className="text-lg font-normal">{task.desc}</h6>
          </div>
          <div className="listbutton">
            <button
              onClick={() => {
                toggleComplete(task.id);
              }}
              className={`check rounded font-bold ${
                task.completed
                  ? "bg-purple-900 text-white"
                  : "bg-pink-700 text-white"
              }`}
            >
              <i class="ri-checkbox-line"></i>
            </button>
            <button
              onClick={() => {
                editHandler(task);
              }}
              className={editButtonClassName}
            >
              <i class="ri-edit-line"></i>
            </button>
            <button
              onClick={() => {
                deleteHandler(task);
              }}
              className="delete bg-pink-700 text-white rounded  "
            >
             <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </li>
      </div>
    );
  });

  const submitButtonText = edit ? "Edit" : "Add Task";

  return (
    <>
      <div className="container">
        <div className="app-wrraper">
          <div>
            {/* <Nav /> */}
            <Nav mainTask={mainTask} updateMainTask={updateMainTask}  />

          </div>
          <div className="homepage">
            <form onSubmit={submitHandler}>
              <div className="forminput">
              <input
                className="input rounded"
                type="text"
                required
                placeholder="Enter Title Here"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
              <input
                className="input rounded"
                type="text"
                // required 
                placeholder="Enter Description Here"
                value={desc}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
              />
              </div>
              <div className="inputbutton">
              <button className="homepagebutton   text-2xl font-bold rounded mb-5">
                {submitButtonText}
              </button>
              </div>
            </form>
            <hr />
            <div className="todolist">
              <ul>{renderTask}</ul>
            </div>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
};

export default page;
