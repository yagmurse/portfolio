import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo, menu, close } from "../../assets/index";
import { navLinks } from "../../constants";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";

const Navbar = ({ onContactClick }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [updateNavbar, setUpdateNavbar] = useState(false);
  useEffect(() => {
    setUpdateNavbar(!updateNavbar);
  }, [isLoggedIn]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const custom_styles = {
    nav: `w-full flex items-center py-5 fixed top-0 z-20 ${
      scrolled ? "bg-primary" : "bg-transparent"
    }`,
    navContainer: "w-full flex justify-between items-center max-w-7xl mx-auto",
    logo: "w-20 h-auto object-contain",
    navLinksContainer:
      "flex flex-grow list-none hidden sm:flex flex-row gap-10 justify-center",
    mobileMenuIcon: "w-[28px] h-[28px] object-contain",
    userText: "text-white text-[18px] font-medium cursor-pointer",
    navLinks: "flex flex-row gap-10",
  };

  return (
    <nav className={custom_styles.nav}>
      <div className={custom_styles.navContainer}>
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setActive("")}
        >
          <img src={logo} alt="logo" className={custom_styles.logo} />
        </Link>
        <div className={custom_styles.navLinksContainer}>
          <ul className={custom_styles.navLinks}>
            {navLinks.map((nav) => (
              <NavbarItem
                key={nav.id}
                nav={nav}
                isActive={active === nav.title}
                onContactClick={onContactClick}
                toggleMobileMenu={() => setActive(nav.title)}
              />
            ))}
          </ul>
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <Link to="/profile" className={custom_styles.navLinks}>
              {user?.username}
            </Link>
          ) : (
            <Link
              to="/login"
              className={custom_styles.navLinks}
              onClick={() => setActive("login")}
            >
              Register/Login
            </Link>
          )}
          <div className="sm:hidden flex items-center ml-4">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className={custom_styles.mobileMenuIcon}
              onClick={() => setToggle(!toggle)}
            />
            <MobileMenu
              navLinks={navLinks}
              active={active}
              setActive={setActive}
              toggle={toggle}
              setToggle={setToggle}
              onContactClick={onContactClick}
              isLoggedIn={isLoggedIn}
              user={user}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
