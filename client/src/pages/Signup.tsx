import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { api } from "../utils/axios.ts";

const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [role, setRole] = useState<"teacher" | "parent">("parent");
  const [checked, setChecked] = useState<boolean>(false);
  const [school, setSchool] = useState<string>("");
  const [user, setUser] = useState<object>({});

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedRole = checked ? "teacher" : "parent";

    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
      role: selectedRole,
    });
    console.log(res.data);
    setUser(res.data);

    if (role === "teacher") {
      navigate("/teacher");
    } else {
      navigate("/parent");
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter your name"
          className="name-input"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="email-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="password-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          className="password-input"
          onChange={(e) => setConfirm(e.target.value)}
        />
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            setRole("teacher");
          }}
        />
        Are you a teacher?
        {checked && (
          <input
            type="text"
            placeholder="Enter your school"
            className="school-input"
            onChange={(e) => setSchool(e.target.value)}
          />
        )}
        <button onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
