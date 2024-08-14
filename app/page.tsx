"use client";
import React, { useEffect, useState } from "react";
import './globals.css'; // This should be in _app.tsx or _app.jsx


type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };

function Home(){
  const [data, setData] = useState<Post[] | undefined>(undefined);
  const[currentIndex, setCurrentIndex] = useState<number>(0);

  const getAPIData=async()=>{
    const url="https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(url);
    const result = (await response.json()) as Post[];
    setData(result);
    console.log(result);
  };

  useEffect(()=>{
    getAPIData();
  },[]);

  const showNextUser = () => {
    if (data && data.length > 0)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  return(
    <div className='container'>
      <h1 className='heading'>List of API's</h1>
      {data && data.length > 0 ?(
        <div className="postItem">
          <p>UserId: {data[currentIndex].userId}</p>
          <p>Id: {data[currentIndex].id}</p>
          <p>Title: {data[currentIndex].title}</p>
          <p>Body: {data[currentIndex].body}</p>
        </div>
      ) : (
        <p className="loading">Loading..</p>
      )}
      <button className="button" onClick={showNextUser}>Click Me</button>
    </div>
  );
    
  
}
export default Home;
