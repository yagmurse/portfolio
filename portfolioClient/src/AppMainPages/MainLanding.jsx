import { Suspense, useRef, useEffect, lazy } from "react";
import { Navbar, Contact } from "../pages";
import LoadingOverlay from "../components/canvas/LoadingOverlay/LoadingOverlay";
import { useLocation } from "react-router-dom";
import { Experience, Educations, CreateJobPage, Works, Hero } from "../pages";

const MainLanding = () => {
  const contactRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleScrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative z-0 bg-slate-700">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar onContactClick={handleScrollToContact} />
      </div>
      <div className="relative ">
        <Suspense fallback={<LoadingOverlay loading={true} />}>
          <Hero />
        </Suspense>
      </div>
      <div className="bg-gradient-to-tr from-slate-300 to-primary">
        <Suspense fallback={<LoadingOverlay loading={true} />}>
          <Experience />
        </Suspense>
      </div>
      <div className="bg-gradient-to-br from-slate-50 to-slate-700">
        <Suspense fallback={<LoadingOverlay loading={true} />}>
          <Educations />
        </Suspense>
      </div>
      <div className="relative z-0">
        <Suspense fallback={<LoadingOverlay loading={true} />}>
          <CreateJobPage />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingOverlay loading={true} />}>
        <Works />
      </Suspense>
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
};

export default MainLanding;
