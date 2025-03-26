import React from 'react'
import logo from "../../assets/logo.png";
import logina1 from "../../assets/logina1.png";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import google from "../../assets/google.png";

export const Signup = () => {
  return (
    <div className='flex h-screen'>

      <div className='w-full md:w-1/2 flex flex-col justify-center items-start px-16'>
         <a href="/" className="mb-10">
                  <img src={logo} alt="TrueView-logo" className="w-[150px]" />
                </a>
                <div className="w-full max-w-[400px] ml-16">
          <h1 className="text-3xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-500 mb-6">
          Sign up to enjoy the feature of Revolutie
          </p>

          {/* Form */}
          <form className="space-y-3.5">
             {/* NAME Input */}
             <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Your name
              </Label>
              <Input
                id="email"
                type="date"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-[22px]"
              />
            </div>
            {/* Date Input */}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Date of birth
              </Label>
              <Input
                id="email"
                type="date"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-[22px]"
              />
            </div>
            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-[22px]"
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
                className="w-full border rounded-lg px-4 py-[22px]"
              />
            </div>

           

            {/* Sign-In Button */}
            <Button className="bg-[#367AFF] text-white w-full py-[22px] rounded-lg font-medium">
              Sign up
            </Button>

            {/* OR Divider */}
            <div className="flex items-center ">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 px-4">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Sign in with Google */}
            <Button className="border border-gray-300 w-full bg-white text-[#232323] hover:text-white py-[22px] rounded-lg flex items-center justify-center space-x-2">
              <img
                src={google}
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign up with Google</span>
            </Button>

            {/* Sign Up Link */}
            <p className="text-gray-600 text-center mt-4">
            Already have an account?{" "}
              <a href="/signup" className="text-blue-600 underline font-medium">
              Sign in
              </a>
            </p>
          </form>
        </div>

      </div>
<div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <img
          src={logina1}
          alt="Modern building"
          className="w-full h-full object-cover "
        />
      </div>

    </div>
  )
}
