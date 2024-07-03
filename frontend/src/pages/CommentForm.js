import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [comment, setComment] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation: Check if fields are not empty
    if (name.trim() === '' || gender.trim() === '' || comment.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare new comment object
    const newComment = {
      "author": name,
      "gender":gender,
      "text": comment,
    };

    // Call onSubmit prop function to add new comment to server
    await onSubmit(newComment);

    // Reset form fields
    setName('');
    setGender('');
    setComment('');
    setImgUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment"
          className="w-full h-24 mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
