import React from 'react';
import { FaSadTear, FaSmile, FaMeh } from 'react-icons/fa';
import { useStateContext } from '../context/ContextProvider';

const Card = ({ comment }) => {
  const {darkMode, setDarkMode} = useStateContext();
  // console.log(darkMode)
  return (
    <div className={`${darkMode==='dark'?'bg-gray-500':'bg-white'} shadow-md rounded-md p-4`}>
      {console.log(darkMode)}
      <div className="flex items-center justify-between">
        <div className="image w-20 h-20 rounded-md m-8"><img className="rounded-full" src={comment.imgUrl} alt="user"></img></div>  
        <div className="sentiment mx-8 w-6 h-6">
          {comment.sentiment==='positive'?<FaSmile className="w-6 h-6 text-green-300"/>:comment.sentiment==='negative'?<FaSadTear className="w-6 h-6 text-red-300"/>:comment.sentiment==='neutral'?<FaMeh className="w-6 h-6 text-yellow-300"/>:''}
        </div>
      </div>
      <p className={`text-gray-800 ${darkMode==='dark'?'text-black':''}`}>{comment.text}</p>
        <p className={`text-gray-600 ${darkMode==='dark'?'text-white':''} text-sm`}>{comment.author}</p>
    </div>
  );
};

export default Card;
