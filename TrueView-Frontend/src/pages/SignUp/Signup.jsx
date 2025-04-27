import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import logina1 from "../../assets/logina1.png";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import google from "../../assets/google.png";
import { signup } from '../../services/auth'; 
import { useNavigate } from 'react-router-dom';
export const Signup = () => {
  
  const navigate = useNavigate();
  // State to store form values
  const [formData, setFormData] = useState({
    username: '',
    provider: 'LOCAL',
    dateOfBirth: '',
    email: '',
    password: ''
  });
  

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(formData);
  
      if (result.success) {
        console.log('Signup successful:', result.data);
        // Optionally redirect to login page
        navigate('/login');
      } else {
        console.error('Signup failed:', result.error);
        alert(result.error); // Show error to user
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  return (
    <div className='flex h-screen'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-start px-16'>
        <a href="/" className="mb-5">
          <img src={logo} alt="TrueView-logo" className="w-[150px]" />
        </a>
        <div className="w-full max-w-[400px] ml-16">
          <h1 className="text-3xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-500 mb-6">
            Sign up to enjoy the feature of Revolutie
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* NAME Input */}
            <div>
              <Label htmlFor="name" className="text-gray-700 mb-2 block">
                Your name
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-[22px]"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <Label htmlFor="dateOfBirth" className="text-gray-700 mb-2 block">
                Date of birth
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="w-full border rounded-lg px-4 py-[22px]"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-gray-700 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-[22px]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-[22px]"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Sign-Up Button */}
            <Button className="bg-[#367AFF] text-white w-full cursor-pointer py-[22px] rounded-lg font-medium">
              Sign up
            </Button>

            {/* OR Divider */}
            <div className="flex items-center">
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
              <a href="/login" className="text-blue-600 underline font-medium">
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
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
