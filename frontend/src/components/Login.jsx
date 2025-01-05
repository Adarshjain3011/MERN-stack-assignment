import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';
import toast from 'react-hot-toast';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        usernameOrEmail: '', // This field can be email or username
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        const response = await axios.post('http://localhost:4000/api/login',formData,{

            withCredentials: true, // Include cookies
            
        });

        console.log("res",response.data);
        

        // Reset form after submission
        setFormData({
            usernameOrEmail: '',
            password: '',
        });

        toast.success('Login successful!');
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl md:p-10">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

            {/* Form */}
            <form className="space-y-6" onSubmit={submitHandler}>
                {/* Identifier (Email or Username) */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="usernameOrEmail">
                        Email or Username
                    </label>
                    <Input
                        type="text"
                        name="usernameOrEmail"
                        placeholder="Enter your email or username"
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                >
                    Login
                </button>

                {/* Forgot Password */}
                <div className="flex justify-end mt-2">
                    <a href="#" className="text-sm text-blue-500 underline">
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;


