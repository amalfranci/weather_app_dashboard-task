import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      })
      .then((res) => {
        if (res.data.status === 200) {
          setMessage("Registration successful! Redirecting to login...");
          toast.success(res.data.message);
          setErrors({});
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setErrors(res.data.errors || { general: "Registration failed" });
          setMessage("");
          toast.error("Check the credentials");
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
          toast.error("Check the credentials");
        } else {
          setErrors({ general: "An error occurred during registration" });
        }
        setMessage("");
      });
  };

  return (
    <div className="flex justify-center w-full items-center h-screen bg-gray-900">
      <ToastContainer />
      <form
        className="w-1/3  p-3  border rounded shadow-sm bg-white"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-3xl font-bold mb-4">Register Page</p>

        <label className="block mb-2 font-bold" htmlFor="name">
          Name
        </label>
        <input
          className={`w-full p-2 border mb-4 rounded-sm ${
            errors.name ? "border-red-500" : ""
          }`}
          type="text"
          value={name}
          required
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label className="block mb-2 font-bold" htmlFor="email">
          Email
        </label>
        <input
          className={`w-full p-2 border mb-4 rounded-sm ${
            errors.email ? "border-red-500" : ""
          }`}
          type="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="block mb-2 font-bold" htmlFor="password">
          Password
        </label>
        <input
          className={`w-full p-2 border mb-4 rounded-sm ${
            errors.password ? "border-red-500" : ""
          }`}
          type="password"
          value={password}
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <label className="block mb-2 font-bold" htmlFor="password_confirmation">
          Confirm Password
        </label>
        <input
          className={`w-full p-2 border mb-4 rounded-sm ${
            errors.password_confirmation ? "border-red-500" : ""
          }`}
          type="password"
          value={password_confirmation}
          required
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm">{errors.password_confirmation}</p>
        )}

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-bold"
          type="submit"
        >
          REGISTER
        </button>

        <p className="mt-4">Already have an account?</p>
        <Link className="text-blue-600 cursor-pointer font-bold" to="/login">
          Login
        </Link>

        {errors.general && (
          <p className="text-red-500 mt-4">{errors.general}</p>
        )}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
