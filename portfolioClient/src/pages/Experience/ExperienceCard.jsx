import { VerticalTimelineElement } from "react-vertical-timeline-component";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#fff",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: "#1870a4" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.companyIcon}
            alt="avatar"
            className="img w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-slate-950 text-[24px] font-bold">
          {experience.title}
        </h3>
        <p
          className="text-slate-950 text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points &&
          experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-slate-950 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
      </ul>
    </VerticalTimelineElement>
  );
};

export default ExperienceCard;
