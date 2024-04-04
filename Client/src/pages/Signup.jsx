import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    fullName: "",
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
          <div>
            <p className="text-center fw-bold fs-3">SIGN UP</p>
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control name="email" onChange={handleInput} id="fullName" />
            <Form.Label htmlFor="email" className="mt-3">
              Email
            </Form.Label>
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
            <button
              className="btn btn-primary mt-4 w-100"
              // onClick={handleLogin}
            >
               Submit
            </button>
             <Link to="/signin" className="d-inline-block mt-3 text-decoration-none">back to login</Link>
          </div>
        </div>
      </div>
    </>
  );
};
