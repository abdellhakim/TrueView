import React from "react";
import logo from "../../assets/logo.png";
import logina1 from "../../assets/logina1.png";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import google from "../../assets/google.png";


export const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-16">
        {/* Logo */}
        <a href="/" className="mb-10">
          <img src={logo} alt="TrueView-logo" className="w-[150px]" />
        </a>

        {/* Sign-In Section */}
        <div className="w-full max-w-[400px] ml-16">
          <h1 className="text-3xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-500 mb-6">
            Please login to continue to your account.
          </p>

          {/* Form */}
          <form className="space-y-5 ">
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-6"
              />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-6"
              />
            </div>

            {/* Keep Me Logged In */}
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <Label htmlFor="remember" className="text-gray-600">
                Keep me logged in
              </Label>
            </div>

            {/* Sign-In Button */}
            <Button className="bg-[#367AFF] text-white w-full py-6 rounded-lg font-medium">
              Sign in
            </Button>

            {/* OR Divider */}
            <div className="flex items-center ">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 px-4">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Sign in with Google */}
            <Button className="border border-gray-300 w-full bg-white text-[#232323] hover:text-white py-6 rounded-lg flex items-center justify-center space-x-2">
              <img
                src={google}
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </Button>

            {/* Sign Up Link */}
            <p className="text-gray-600 text-center mt-4">
              Need an account?{" "}
              <a href="/signup" className="text-blue-600 underline font-medium">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <img
          src={logina1}
          alt="Modern building"
          className="w-full h-full object-cover "
        />
      </div>
    </div>
  );
};
