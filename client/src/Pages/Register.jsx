import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import url from '../port'
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate()

  useEffect(()=>{
    let token = localStorage.getItem('token')
    if(token){
      navigate('/')
    }
  })

  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const errors = [];

    if (!/(?=.*[a-z])/.test(value)) {
      errors.push("Lowercase letter missing");
    }

    if (!/(?=.*[A-Z])/.test(value)) {
      errors.push("Uppercase letter missing");
    }

    if (!/(?=.*\d)/.test(value)) {
      errors.push("Number missing");
    }

    if (!/(?=.*[!@#$%^&*()_+])/.test(value)) {
      errors.push("Symbol missing");
    }

    if (value.length < 8) {
      errors.push("Password too short (minimum 8 characters)");
    }

    setPasswordErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
    };

    try {
       await axios.post(`${url}/user/Register`,formData)
      toast.success('User Registered Successfully')
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error)
    }
    setSubmitted(true);
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
      <div className="mt-10 flex items-center justify-center">
        <div className="border-2 border-stone-600 mx-1 grid grid-cols-1 items-center gap-10 p-5 rounded-2xl ">
          <div className="max-w-80 grid gap-5">
            <h1 className="text-5xl font-bold text-center text-black">
              Register
            </h1>
            <p className="font-semibold">
              Already Have an Account?{" "}
              <NavLink
                to="/login"
                className="text-cyan-400 hover:text-cyan-600 font-semibold hover:font-bold cursor-pointer"
              >
                Login Here
              </NavLink>
            </p>
            <div className="">
              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block relative">
                  <input
                    type="text"
                    className={`w-full md:w-80 block py-1 px-1 text-lg bg-inherit border-b-2 focus:ring-0 focus:bg-inherit focus:border-cyan-500 outline-none`}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="block relative">
                  <input
                    type="email"
                    className={`w-full md:w-80 block py-1 px-1 text-lg bg-inherit border-b-2 focus:ring-0 focus:bg-inherit focus:border-cyan-500 outline-none`}
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="block relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full md:w-80 block py-1 px-1 text-lg bg-inherit border-b-2 focus:ring-0 focus:bg-inherit focus:border-cyan-500 outline-none pr-10 ring-0`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} color="#26C6DA" />
                    ) : (
                      <FaEye size={20} color="#26C6DA" />
                    )}
                  </button>
                </label>
                <div className="text-sm text-red-500 ">
                  {(passwordErrors.length > 0 || submitted) &&
                    passwordErrors.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-cyan-300 w-full md:w-80 font-semibold rounded-full py-2 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-400"
                >
                  Register
                </button>
              </form>
            </div>

            <p className="text-center font-semibold text-2xl">OR</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleGoogleAuth}>
                <FcGoogle className="rounded-full " size={42} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
