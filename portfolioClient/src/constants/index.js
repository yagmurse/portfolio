import { kocLogo, bogaziciLogo } from "../assets";
export const navLinks = [
  {
    id: "",
    title: "Homepage",
  },
  {
    id: "experience",
    title: "Work Experience",
  },
  {
    id: "educations",
    title: "Education",
  },
  {
    id: "contact",
    title: "Contact",
  },
  { id: "createJob", title: "Create Job" },
];

const educations = [
  {
    title: "Bachelor of Science in Computer Engineering",
    schoolName: "Bogazici University",
    icon: bogaziciLogo,
    date: "2017 - 2023",
    points: [],
  },
  {
    title: "Bachelor of Science in Mechanical Engineering",
    schoolName: "Koç University",
    icon: kocLogo,
    date: "2015-2017(left)",
    points: [
      "I transferred to Boğazici to pursue my passion for Computer Engineering after completing my second year at Koç.",
    ],
  },
];

const projects = [];

export { projects, educations };
