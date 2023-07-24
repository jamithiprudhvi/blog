import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu flex flex-col gap-25 overflow-x-auto max-h-[calc(100vh*2)">
      <h1 className="text-2xl text-gray-500"> Recommended Posts </h1>

      {posts.map((post) => (
        <div className="post flex flex-col gap-3" key={post.id}>
          <img
            src={`../upload/${post.img}`}
            alt=""
            className="w-full h-150 object-cover"
          />
          <h2 className="text-gray-500"> {post.title} </h2>
          <button className="max-w-max mb-2 px-4 py-2 border border-slate-600 text-slate-900 -200 hover:bg-slate-900 hover:text-white">
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
