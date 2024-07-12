import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");

  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setMessage("Login successful! Redirecting to home...");
          setError("");
          toast.success("Login successful");

          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate("/");
        } else {
          setError(res.data.message || "Login failed");
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Credentials ,check username and password");
        toast.error("Invalid Credentials ");

        setMessage("");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <ToastContainer />
      <form
        className="w-1/3 p-6 border rounded shadow-sm bg-white"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-3xl font-bold mb-4">Login Page</p>

        <label className="block mb-2 font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="w-full p-2 border mb-4 rounded-sm"
          type="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="w-full p-2 border mb-4 rounded-sm"
          type="password"
          value={password}
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-bold"
          type="submit"
        >
          LOGIN
        </button>

        <p className="mt-4">Create an account?</p>
        <Link className="text-blue-600 cursor-pointer font-bold" to="/register">
          Register
        </Link>

        {err && <p className="text-red-500 mt-4">{err}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
