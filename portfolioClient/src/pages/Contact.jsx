import React, { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const contacts = [
  {
    id: "email",
    icon: <FaEnvelope size={46} />,
    link: "mailto:yagmurselek24@gmail.com",
    label: "yagmurselek24@gmail.com",
  },
  {
    id: "github",
    icon: <FaGithub size={46} />,
    link: "https://github.com/yagmurse",
    label: "GitHub",
  },
  {
    id: "linkedin",
    icon: <FaLinkedin size={46} />,
    link: "https://www.linkedin.com/in/selekyagmur/",
    label: "LinkedIn",
  },
];

const ContactPage = () => {
  const [activeContact, setActiveContact] = useState("");
  return (
    <div
      className="contact-page"
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#050816",
      }}
    >
      {contacts.map((contact) => (
        <a
          key={contact.id}
          href={contact.link}
          className="contact-link"
          style={{
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            color: activeContact === contact.id ? "white" : "#aaa6c3",
            cursor: "pointer",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={() => setActiveContact(contact.id)}
          onMouseLeave={() => setActiveContact("")}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {contact.icon}
            <span style={{ marginTop: "10px" }}>{contact.label}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ContactPage;
