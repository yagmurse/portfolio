import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import { styles } from "../../styles.js";
import { SectionWrapper } from "../../hoc/index.js";
import { styles_login } from "./loginStyle.js";
import { loginUser } from "../../store/slices/AuthSlice.js";

const LoginPage = () => {
  const dispatch = useDispatch();
  const actionData = useActionData();
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        toast.success("Login successful");
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(`Login failed: ${error?.msg || "Unknown error"}`);
      });
  };
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className={styles_login.createJobCardHolder}>
      <div className={styles_login.motion}>
        <div className={styles_login.registerButtonWrapper}>
          <button
            type="button"
            className={styles_login.registerButtonStyle}
            onClick={handleRegisterRedirect}
          >
            Go back to Register -
          </button>
        </div>
        <p className={styles.sectionSubText}></p>
        <h3 className={styles.sectionHeadText}>Login User</h3>

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
              placeholder="please enter your userName"
              className={styles_login.inputStyle}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="please enter your password"
              className={styles_login.inputStyle}
            />
          </label>
          <button
            type="submit"
            className={styles_login.submitButtonStyle}
            disabled={loading}
          >
            {loading ? "logging in..." : "login"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default SectionWrapper(LoginPage, "loginPage");
