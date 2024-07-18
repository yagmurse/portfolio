import React, { useEffect } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";
import ExperienceCard from "./ExperienceCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs } from "../../store/slices/JobsSlice.js";

const Experience = () => {
  const dispatch = useDispatch();
  const { entities: jobs, loading, error } = useSelector((state) => state.jobs);
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const experiencesArray = Array.isArray(jobs) ? jobs : [];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience
        </h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiencesArray.map((job, index) => (
            <ExperienceCard key={`job-${index}`} experience={job} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
