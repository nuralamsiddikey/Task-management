import { useState } from "react";
import Form from "react-bootstrap/Form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { base } from "../api";
import imgIcon from "../assets/image.png";
import { Button } from "react-bootstrap";
import Loader from "../components/Loader";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    image: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setUserInfo((prevValue) => ({
        ...prevValue,
        [name]: event.target?.files[0],
      }));
      setImgPreview(URL.createObjectURL(event.target?.files[0]));
    } else
      setUserInfo((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
  };

  const handleSubmit = () => {
    if (!userInfo.fullName) toast.error("Full name required");
    else if (!userInfo.email) toast.error("Email required");
    else if (userInfo.password.length < 6)
      toast.error("Password must be 6 character long");
    else if (!userInfo.image) toast.error("Required profile image");
    else {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullName", userInfo.fullName);
      formData.append("email", userInfo.email);
      formData.append("password", userInfo.password);
      formData.append("image", userInfo.image);

      fetch(base + "/user", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          if (res.ok) return res.json();
          else {
            const data = await res.json();
            throw new Error(data.error);
          }
        })
        .then((result) => {
          toast.success(result.message);
          navigate("/signin");
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-4 rounded border">
        <p className="text-center fw-bold fs-3">Sign Up</p>
        <div className="row">
          <div className="col-7">
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              name="fullName"
              onChange={handleInput}
              id="fullName"
            />
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

            <Button
              className="mt-4 w-100 bg-submit d-flex justify-content-center align-items-center gap-1"
              onClick={handleSubmit}
            >
              {loading ? <Loader /> : ""}
              <span> Submit</span>
            </Button>
          </div>

          <div className="col-5">
            <p>Image</p>
            <label className="rounded-lg">
              <img
                htmlFor="image"
                width="120"
                src={imgPreview ? imgPreview : imgIcon}
                alt="image"
                className="img-fluid object-fit-cover  rounded cursor-pointer mt-2"
                style={{
                  borderStyle: `${imgPreview ? "dotted" : ""}`,
                  borderWidth: "2px",
                  borderColor: "gray",
                }}
              />
              <input
                type="file"
                name="image"
                id="image"
                className="d-none"
                onChange={handleInput}
              />
            </label>
          </div>
        </div>
        <Link to="/signin" className="d-inline-block mt-3 text-decoration-none">
          back to login
        </Link>
      </div>
    </div>
  );
};
