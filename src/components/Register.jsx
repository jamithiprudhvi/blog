import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(inputs);

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      // console.log(err)
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-center bg-cover">
      <div className="max-w-md w-full sm:w-80vw space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="mt-6 text-center text-3xl font-normal text-gray-900">Register</h1>
        <form className="mt-8 space-y-6">
          <input
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          />
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          />
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" onClick={handleSubmit}>Register</button>
          {err && <p>{err}</p>}
          <span className="mt-2 text-xs text-gray-500">
            Do you have an account?
            <Link className="font-medium text-teal-600 hover:text-teal-500" to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
