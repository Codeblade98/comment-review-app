import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'; // Adjust import paths as per your project structure
import CommentForm from './pages/CommentForm'; // Adjust import paths as per your project structure
import Navbar from './components/Navbar'; // Adjust import paths as per your project structure
import { useStateContext } from './context/ContextProvider'; // Adjust import paths as per your project structure
import { useState } from 'react';

function App() {
  // const {darkMode, setDarkMode} = useStateContext();
  const [comments, setComments] = useState([]);
  const {darkMode, setDarkMode} = useStateContext();
  const addComment = async (newComment) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const data = await response.json();
      setComments([data, ...comments]); // Update state with new comment
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  return (
    <div className={`w-full m-0 p-0 ${darkMode==='dark'?'bg-gray-800':''}`}>
    <Navbar/>
    <div>
      <Routes>
            <Route path="/" element={(<HomePage />)} />
            <Route path="/reviews" element={(<CommentForm onSubmit={addComment}/>)} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
