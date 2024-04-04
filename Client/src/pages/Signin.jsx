import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
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

  return (
    <>
      <div className="d-flex justify-content-center py-5">
        <div className="bg-white d-flex justify-content-center mt-5 rounded-3 shadow p-5">
          <div className="">
            <p className="text-center fw-bold fs-3">SIGN IN</p>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleInput}
              id="email"
            />

            <Form.Label htmlFor="password" className="mt-3">Password</Form.Label>
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
            <button
                className="btn btn-primary mt-4 rounded-2 w-100"
                // onClick={handleLogin}
              >
                <FiLogIn /> SIGN IN
              </button>

              <Link to="/signup" className="mt-3 d-inline-block text-decoration-none">Registration?</Link>
          </div>
        </div>
      </div>
    </>
  );
};
