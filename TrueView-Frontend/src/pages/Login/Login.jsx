import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import logina1 from "../../assets/logina1.png";
import google from "../../assets/google.png";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { login as loginService } from "../../services/auth.js"; // Renamed to avoid confusion
import { useAuth } from "../../context/AuthContext";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await loginService({ email, password });

    setIsLoading(false);

    if (res.success) {
      authLogin(res.token); 
      setEmail("");
      setPassword("");
      navigate("/profile"); 
    } else {
      setError(res.error || "Something went wrong");
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-16">
        <a href="/" className="mb-10">
          <img src={logo} alt="TrueView-logo" className="w-[150px]" />
        </a>

        <div className="w-full max-w-[400px] ml-16">
          <h1 className="text-3xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-500 mb-6">Please login to continue to your account.</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <Label htmlFor="remember" className="text-gray-600">Keep me logged in</Label>
            </div>

            <Button
              className="bg-[#367AFF] text-white w-full py-6 cursor-pointer rounded-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 px-4">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <Button className="border border-gray-300 w-full cursor-pointer bg-white text-[#232323] hover:text-white py-6 rounded-lg flex items-center justify-center space-x-2">
              <img src={google} alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </Button>

            <p className="text-gray-600 text-center mt-4">
              Need an account?{" "}
              <a href="/signup" className="text-blue-600 underline font-medium">Create one</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <img src={logina1} alt="Modern building" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
