import { Link } from "react-router-dom";

const NavbarItem = ({ nav, isActive, onContactClick, toggleMobileMenu }) => {
  return (
    <li
      className={`${
        isActive ? "text-white" : "text-secondary"
      } hover:text-white text-[18px] font-medium cursor-pointer`}
    >
      {nav.id === "contact" ? (
        <span onClick={onContactClick}>{nav.title}</span>
      ) : (
        <Link to={`/${nav.id}`} onClick={toggleMobileMenu}>
          {nav.title}
        </Link>
      )}
    </li>
  );
};

export default NavbarItem;
