import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate, useActionData } from "react-router-dom";
import { styles } from "../../styles.js";
import { SectionWrapper } from "../../hoc/index.js";
import { registerUser } from "../../store/slices/AuthSlice.js";
import { toast } from "react-toastify";
import { styles_register } from "./registerStyle.js";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const actionData = useActionData();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (actionData?.success) {
      setFormData({
        username: "",
        password: "",
      });
    }
  }, [actionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Registration successful");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error?.msg || "Unknown error"}`);
      });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <div className={styles_register.createJobCardHolder}>
      <div className={styles_register.motion}>
        <div className={styles_register.loginButtonWrapper}>
          <button
            type="button"
            className={styles_register.loginButtonStyle}
            onClick={handleLoginRedirect}
          >
            Go back to Login
          </button>
        </div>
        <p className={styles.sectionSubText}></p>
        <h3 className={styles.sectionHeadText}>Register as New User</h3>

        <Form
          method="post"
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
          encType="multipart/form-data"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Username</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Please enter your username"
              className={styles_register.inputStyle}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Please enter your password"
              className={styles_register.inputStyle}
            />
          </label>
          <label className="flex flex-row gap-4 justify-around">
            <label className="flex flex-col">
              <button
                type="submit"
                className={styles_register.submitButtonStyle}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </label>
          </label>
        </Form>
      </div>
    </div>
  );
};

export default SectionWrapper(RegisterPage, "registerPage");
