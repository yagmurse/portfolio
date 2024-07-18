import React from "react";
import CreateJobPageItem from "./createJobItem.jsx";
import { styles_trial } from "./createJobPage.js";
import { Form } from "react-router-dom";

const CreateJobForm = ({
  formRef,
  form,
  handleChange,
  handleFileChange,
  handleSubmit,
  handleAddPoint,
  handleRemovePoint,
  loading,
}) => {
  return (
    <Form
      method="post"
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles_trial.form}
      encType="multipart/form-data"
    >
      <CreateJobPageItem
        title="Your title"
        inputType="text"
        inputName="title"
        inputValue={form.title}
        onChange={handleChange}
        placeholder="What was your title?"
        className={styles_trial.inputStyle}
      />
      <CreateJobPageItem
        title="Company Name"
        inputType="text"
        inputName="company"
        inputValue={form.company}
        onChange={handleChange}
        placeholder="What's your company's name?"
        className={styles_trial.inputStyle}
      />
      <label className="flex flex-col">
        <span className="create-job-form-title">Your company's icon</span>
        <input
          type="file"
          name="companyIcon"
          onChange={handleFileChange}
          className="create-job-form-input"
          accept="image/*"
        />
      </label>
      <CreateJobPageItem
        title="Your work dates"
        inputType="text"
        inputName="date"
        inputValue={form.date}
        onChange={handleChange}
        placeholder="What was your time?"
        className={styles_trial.inputStyle}
      />
      <label className="flex flex-col">
        <span className={styles_trial.formTitle}>Points</span>
        {form.points.map((point, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              name={`point-${index}`}
              value={point}
              onChange={handleChange}
              placeholder={`Point #${index + 1}`}
              className={styles_trial.inputStyle}
            />
            <button
              type="button"
              onClick={() => handleRemovePoint(index)}
              className={styles_trial.button}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPoint}
          className={styles_trial.addPointButton}
        >
          Add Point
        </button>
      </label>
      <button
        type="submit"
        className={styles_trial.submitButtonStyle}
        disabled={loading}
      >
        {loading ? "submitting..." : "submit"}
      </button>
    </Form>
  );
};

export default CreateJobForm;
