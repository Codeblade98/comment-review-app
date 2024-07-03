import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; 
import { useStateContext } from '../context/ContextProvider';

const Homepage = () => {
  const [comments, setComments] = useState([]);
  const {darkMode, setDarkMode} = useStateContext();

  // Fetch comments from server when component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  // Function to fetch comments from server
  const fetchComments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/comments');
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data); // Update state with fetched comments
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Function to add new comment to server and update state


  return (
    <div className={`container mx-auto mt-4`}>
      <h1 className={`text-2xl font-bold mb-4 ${darkMode==='dark'?'text-gray-50':''}`}>Comments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comments.map((comment) => (
          <Card key={comment.id} comment={comment}/>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
