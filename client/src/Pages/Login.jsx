import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import url from "../port";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");
    const formData = {
      email: email,
      password: password,
    };
    try {
      const resp = await axios.post(`${url}/user/login`,formData);
      toast.success('Login Successfull')
      localStorage.setItem('token',resp?.data?.token)
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
  };

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(token){
      navigate('/')
    }
  })

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleGoogleAuth = () => {
    try {
      window.location.href=`${url}/auth/google/callback`
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-center bg-slate-100">
        <div className="bg-black bg-opacity-0 border-2 border-stone-600 mx-1 grid grid-cols-1 items-center gap-10 p-5 rounded-2xl">
          <div className="max-w-80 grid gap-5">
            <h1 className="text-5xl font-bold text-center text-black">Login</h1>
            <p className="font-semibold">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-cyan-400 hover:text-cyan-600 font-semibold hover:font-bold cursor-pointer"
              >
                Register Here
              </NavLink>
            </p>
            <div className="">
              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block relative">
                  <input
                    type="email"
                    className={`w-full md:w-80 block py-1 px-1 text-lg bg-inherit border-b-2 focus:ring-0 focus:bg-inherit focus:border-cyan-500 outline-none ${
                      emailError ? "border-red-500" : ""
                    }`}
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </label>
                <label className="block relative">
                  <input
                    type="password"
                    className="w-full md:w-80 block py-1 px-1 text-lg bg-inherit border-b-2 focus:ring-0 focus:bg-inherit focus:border-cyan-500 outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-300 w-full md:w-80 font-semibold rounded-full py-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
                >
                  Login
                </button>
              </form>
            </div>
            <p className="text-center font-semibold text-2xl">OR</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleGoogleAuth}>
                <FcGoogle className="rounded-full hover:size:8" size={42} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
