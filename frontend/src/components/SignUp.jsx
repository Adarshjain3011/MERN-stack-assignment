import React, { useState } from "react";
import Input from "../components/common/Input";
import toast from "react-hot-toast";

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    interests: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors for the field being updated
  };

  const handleInterestsChange = (e) => {
    const interestsArray = e.target.value
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest); // Remove empty interests
    setFormData({ ...formData, interests: interestsArray });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (formData.interests.length === 0)
      newErrors.interests = "Please provide at least one interest.";
    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please correct the errors before submitting.");
      return;
    }

    console.log("Form submitted:", formData);
    toast.success("Form submitted successfully!");

    // Reset form
    setFormData({
      username: "",
      email: "",
      password: "",
      interests: "",
    });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl md:p-10">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Register
      </h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={submitHandler}>
        {/* Username */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Interests */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="interests"
          >
            Interests (comma separated)
          </label>
          <Input
            type="text"
            name="interests"
            placeholder="Enter your interests"
            value={Array.isArray(formData.interests) ? formData.interests.join(', ') : ''} // Safeguard
            onChange={handleInterestsChange}
            required
            className={`${
              errors.interests ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.interests && (
            <p className="text-sm text-red-500">{errors.interests}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
        >
          Register
        </button>

        {/* Terms and Conditions */}
        <p className="text-center text-sm text-gray-500 mt-4">
          By continuing, you agree to the{" "}
          <a href="#" className="text-blue-500 underline">
            Terms & Conditions
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default SignUpComponent;
