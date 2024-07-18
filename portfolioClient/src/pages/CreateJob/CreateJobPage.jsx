import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useActionData, useNavigate } from "react-router-dom";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { styles_trial } from "./createJobPage.js";
import { createJob } from "../../store/slices/JobsSlice.js";
import { toast } from "react-toastify";
import CreateJobForm from "./createJobForm.jsx";

const initialFormState = {
  company: "",
  title: "",
  companyIcon: "",
  companyIconBg: "",
  date: "",
  points: [""],
};

const CreateJobPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.jobs);

  const formRef = useRef();
  const [form, setForm] = useState(initialFormState);
  const actionData = useActionData();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (actionData?.success) {
      setForm(initialFormState);
      setFile(null);
      formRef.current.reset();
    }
  }, [actionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("point-")) {
      const index = parseInt(name.split("-")[1], 10);
      const newPoints = [...form.points];
      newPoints[index] = value;
      setForm({ ...form, points: newPoints });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddPoint = () => {
    setForm({ ...form, points: [...form.points, ""] });
  };

  const handleRemovePoint = (index) => {
    setForm({
      ...form,
      points: form.points.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("points", JSON.stringify(form.points));
    dispatch(createJob(formData))
      .unwrap()
      .then(() => {
        navigate("/experience");
      })
      .catch((error) => {
        toast.error(
          `Create failed: ${error?.message || error?.msg || "Unknown error"}`
        );
        toast.warning(
          `You need to be logged in as an admin to create an experience`
        );
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={styles_trial.createJobCardHolder}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className={styles_trial.motion}
      >
        <p className={styles.sectionSubText}>Create new Job</p>
        <h3 className={styles.sectionHeadText}>Grow Your Career</h3>
        <CreateJobForm
          formRef={formRef}
          form={form}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          handleAddPoint={handleAddPoint}
          handleRemovePoint={handleRemovePoint}
          loading={loading}
        />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      ></motion.div>
    </div>
  );
};

export default SectionWrapper(CreateJobPage, "createJobPage");
