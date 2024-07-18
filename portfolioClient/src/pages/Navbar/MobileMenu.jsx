import React from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";

const MobileMenu = ({
  navLinks,
  active,
  setActive,
  toggle,
  setToggle,
  onContactClick,
  isLoggedIn,
  user,
}) => {
  const custom_styles = {
    mobileMenu: `p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl ${
      !toggle ? "hidden" : "flex"
    }`,
    mobileNavLinks:
      "list-none flex justify-end items-start flex-1 flex-col gap-4",
    userText: "text-white text-[18px] font-medium cursor-pointer",
  };

  return (
    <div className={custom_styles.mobileMenu}>
      <ul className={custom_styles.mobileNavLinks}>
        {navLinks.map((nav) => (
          <NavbarItem
            key={nav.id}
            nav={nav}
            isActive={active === nav.title}
            onContactClick={onContactClick}
            toggleMobileMenu={() => {
              setToggle(!toggle);
              setActive(nav.title);
            }}
          />
        ))}
        {isLoggedIn ? (
          <li className={custom_styles.userText}>{user?.username}</li>
        ) : (
          <NavbarItem
            nav={{ id: "register", title: "Register" }}
            isActive={active === "register"}
            toggleMobileMenu={() => {
              setToggle(!toggle);
              setActive("register");
            }}
          />
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;
