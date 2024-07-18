import { useRef, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Navbar, Contact } from "../pages";

const Layout = () => {
  const location = useLocation();
  const contactRef = useRef(null);

  const handleScrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const bgStyle =
    location.pathname === "/register" || location.pathname === "/login"
      ? "bg-emerald-950"
      : "bg-slate-700";
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <div className={`relative z-0 ${bgStyle}`}>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar onContactClick={handleScrollToContact} />
      </div>
      <ScrollToTop />
      <Outlet />
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
};

export default Layout;
