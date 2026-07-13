import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "https://bulk-mail-app-react.onrender.com/login",
                {
                    email,
                    password,
                }
            );

            if (response.data.success) {
                localStorage.setItem("isLoggedIn", true);

                navigate("/");
            }
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                    Login
                </button>

            </div>
        </div>
    );
}

export default Login;