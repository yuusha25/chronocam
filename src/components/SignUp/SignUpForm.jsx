import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Gmail from "../../assets/Gmail.png";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);

    try {
      const response = await fetch("https://chrono-sand.vercel.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup success:", data);
        navigate(`/verify-email?email=${formData.email}`);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-100 font-poppins">
      <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center">Sign Up</h2>
        <p className="text-gray-400 text-center mt-2 mb-6">
          Create your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className="mr-2 border border-gray-300 rounded"
              required
            />
            <label className="text-gray-600 text-sm">
              I agree with the terms of use
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 bg-[#365486] text-white rounded hover:bg-[#2a4675] transition duration-200"
          >
            Sign up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">or sign up with Google</p>
          <a
            href="https://chrono-sand.vercel.app/auth/google"
            className="mt-4 flex items-center justify-center w-full py-2 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition duration-200"
          >
            <img
              src={Gmail}
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </a>

          <p className="mt-4 text-gray-600">
            Already have an Account?
            <Link to="/signin" className="text-blue-600 ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
