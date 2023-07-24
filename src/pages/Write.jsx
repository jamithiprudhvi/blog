import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-7 flex flex-col lg:flex-row gap-10 justify-center items-center mx-5 lg:mx-20">
      <div className="lg:flex-5 flex flex-col gap-5 w-full lg:w-2/3 m-4">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-md px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="h-80 overflow-scroll border rounded-lg shadow-md">
          <ReactQuill
            className="h-full"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/3 m-4">
        <div className="border p-4 shadow mt-4">
          <h1 className="text-gray-900 text-xl font-semibold">Category</h1>
          <div className="flex gap-2">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          {/* ... (Publish) ... */}
        </div>
        <div className="flex flex-col border p-4 shadow">
          <h1 className="text-gray-900 text-xl font-semibold">Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="cursor-pointer " htmlFor="file">
            Upload Image
          </label>
          <div className="flex justify-between">
            <button className="max-w-max px-4 py-1 border border-teal-300 text-teal-500 hover:bg-teal-200 hover:text-black">
              Save as a draft
            </button>
            <button
              className="max-w-max px-4 py-1 border border-teal-300 hover:text-teal-500 hover:bg-white bg-teal-500 text-white"
              onClick={handleClick}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
