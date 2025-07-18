import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login:", { email, password });
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2  flex flex-col justify-center items-center p-8 md:p-12 ">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-3xl border shadow-md">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Trenzic</h2> 
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋🏻</h2>
          <p className="text-center mb-6">
            Enter your email and password to login.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="Enter your email address"
            ></input>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full p-2 border rounded-xl"
              placeholder="Enter your password"
            ></input>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 p-2 text-white rounded-xl font-semibold hover:bg-amber-700 transition"
          >
            Sign In
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have an account? {" "}
            <Link to="/register" className="text-blue-500 underline">Register</Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
            <div className="h-full flex flex-col justify-center items-center">
                <img src={login} alt="Login to Account" className="h-[750px] w-full object-cover"></img>
            </div>
      </div>
    </div>
  );
};

export default Login;
