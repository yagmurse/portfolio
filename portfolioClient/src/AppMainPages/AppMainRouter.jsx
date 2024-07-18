import { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import MainLanding from "./MainLanding";
import LoadingOverlay from "../components/canvas/LoadingOverlay/LoadingOverlay";
import { useSelector } from "react-redux";
import {
  About,
  Educations,
  Experience,
  Works,
  CreateJobPage,
  RegisterPage,
  LoginPage,
  Profile,
  Error,
} from "../pages";

const AuthRedirect = ({ element }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLanding />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "educations",
        element: <Educations />,
      },
      {
        path: "experience",
        element: <Experience />,
      },
      {
        path: "works",
        element: <Works />,
      },
      {
        path: "createJob",
        element: <CreateJobPage />,
      },
      {
        path: "register",
        element: <AuthRedirect element={<RegisterPage />} />,
      },
      {
        path: "login",
        element: (
          <AuthRedirect
            element={
              <Suspense fallback={<LoadingOverlay loading={true} />}>
                <LoginPage />
              </Suspense>
            }
          />
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingOverlay loading={true} />}>
            <Profile />
          </Suspense>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

export default router;
export {
  About,
  Educations,
  Experience,
  Works,
  CreateJobPage,
  RegisterPage,
  LoginPage,
  Profile,
  Error,
};
