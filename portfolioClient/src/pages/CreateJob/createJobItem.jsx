import React from "react";
import { styles_trial } from "./createJobPage";
const CreateJobPageItem = ({
  title,
  inputType,
  inputName,
  inputValue,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <label className="flex flex-col">
      <span className={styles_trial.formTitle}>{title}</span>
      <input
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </label>
  );
};

export default CreateJobPageItem;
