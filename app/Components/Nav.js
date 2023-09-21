"use client";
import React, { useState, useEffect } from 'react';

const Nav = ({ mainTask, updateMainTask }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // setSearchQuery("")
  useEffect(() => {
    if (searchQuery === "") {
      // If search query is empty, reset the mainTask state to its original value
      updateMainTask(mainTask);
    } else {
      // Filter the tasks based on the search query
      const filteredTasks = mainTask.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    

    
    // Sort the filteredTasks to have exact matches at the beginning
    filteredTasks.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const queryLower = searchQuery.toLowerCase();

      if (aTitle === queryLower && bTitle !== queryLower) {
        return -1; // a comes first
      } else if (bTitle === queryLower && aTitle !== queryLower) {
        return 1; // b comes first
      } else {
        return 0; // no change in order
      }
    });
    
    // Concatenate filtered tasks and unfiltered tasks
    const updatedMainTask = [...filteredTasks, ...mainTask.filter((task) =>
      !task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )];
    
    // Update the mainTask state with the sorted filteredTasks
    updateMainTask(updatedMainTask);
    }
  }, [searchQuery, mainTask, updateMainTask]);

  return (
    <div className='nav'>
      <h1>To-do-list</h1>
      <input
        className="input rounded"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default Nav;



