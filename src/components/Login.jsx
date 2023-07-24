import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // console.log(inputs);

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      // console.log(err)
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md ">
        <h1 className="mt-6 text-center text-3xl font-normal text-gray-900">
          Login
        </h1>
        <form className="mt-8 space-y-6">
          <input
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
            <button
              className="w-32 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              onClick={handleSubmit}
            >
              Login
            </button>
            {err && <p> {err} </p>}
            <div className="text-center">
              <p className="Don't you have an account?">
                Don't you have an account?
              </p>
              <Link className="font-medium text-teal-600 hover:text-teal-500" to="/register">Register</Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
