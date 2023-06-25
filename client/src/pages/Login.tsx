import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<object>({});
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    console.log(res.data);
    setUser(res.data);
    setRole(res.data.role);

    if (role === "teacher") {
      navigate("/teacher");
    } else {
      navigate("/parent");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          className="email-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="password-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onSubmit={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
