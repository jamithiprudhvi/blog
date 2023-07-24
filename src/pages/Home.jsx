import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="">
      <div className="flex flex-col items-center gap-4 justify-center">
        {posts.map((post) => (
          <div
            className={`flex flex-col sm:flex-row sm:max-w-[600px] md:max-w-[800px] sm:max-h-[150px] md:max-h-[300px] justify-center items-center mt-5 shadow-md m-4 `}
            key={post.id}
          >
            <div className=" w-full h-64 sm:w-full md:w-1/2">
              <img
                src={`../upload/${post.img}`}
                alt="poster"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="h-full w-2/3 flex flex-col justify-between m-3 ">
              <div>
                <Link className="link" to={`/post/${post.id}`}>
                  <h1 className="text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    {post.title}
                  </h1>
                </Link>
              </div>
              <p className="text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base">
                {getText(post.desc)}
              </p>
              <button className="max-w-max mb-2 px-4 py-2 border border-slate-600 text-slate-900 -200 hover:bg-slate-900 hover:text-white">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
