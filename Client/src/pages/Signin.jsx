import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import toast from "react-hot-toast";
import { base } from "../api";
import { useAuthContext } from "../context/auth";
import Loader from "../components/Loader";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setToken } = useAuthContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (!loginInfo.email) toast.error("Email missing!");
    else if (!loginInfo.password) toast.error("Password missing");
    else {
      setLoading(true);
      fetch(base + "/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      })
        .then(async (res) => {
          if (res.ok) return res.json();
          else {
            const data = await res.json();
            throw new Error(data.error);
          }
        })
        .then((result) => {
          setToken(result.token);
          localStorage.setItem("token", result.token);
          localStorage.setItem("fullName", result.fullName);
          localStorage.setItem("image", result.image);
          navigate("/");
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="border p-4 rounded bg-white" style={{ width: "340px" }}>
        <p className="text-center fw-bold fs-3">Sign In</p>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control name="email" onChange={handleInput} id="email" />

        <Form.Label htmlFor="password" className="mt-3">
          Password
        </Form.Label>
        <div className="input-group border rounded d-flex align-items-center bg-white">
          <Form.Control
            onChange={handleInput}
            type={showPassword ? "text" : "password"}
            name="password"
            className="border-0"
            id="password"
          />
          <div className="input-group-append">
            <span
              className="input-group-text bg-white border-0"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </span>
          </div>
        </div>
        <Button
          className="bg-submit mt-4 rounded-2 w-100 d-flex justify-content-center align-items-center gap-1"
          onClick={handleLogin}
        >
          <span> {loading ? <Loader /> : <FiLogIn />}</span>
          <span> SIGN IN</span>
        </Button>

        <Link to="/signup" className="mt-3 d-inline-block text-decoration-none">
          Registration?
        </Link>
      </div>
    </div>
  );
};
