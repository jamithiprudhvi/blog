import React, { useContext, useEffect, useState } from "react";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-8 m-5 mx-16">
      <div className="w-full sm:w-3/5 h-full flex flex-col">
        <img
          src={`../upload/${post?.img}`}
          alt=""
          className="w-full h-80 object-cover shadow-md"
        />
        <div className="mt-4 flex items-center space-x-4 text-sm">
          {post.userImg && (
            <img
              src={post.userImg}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div className="font-bold">
            <span> {post.username} </span>
            <p>Posted {moment(post.date).fromNow()} </p>
          </div>
          {currentUser.username === post.username && (
            <div className="flex space-x-2">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" className="w-5 h-5 cursor-pointer" />
              </Link>
              <img
                onClick={handleDelete}
                src={Delete}
                alt=""
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          )}
        </div>
        <h1 className="text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">{post.title}</h1>
        <p className="text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base">{getText(post.desc)}</p>
      </div>
      <div className="w-full sm:w-1/5 mt-4 sm:mt-0">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
};

export default Single;
