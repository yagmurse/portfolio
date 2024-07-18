import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LoadingOverlay from "./components/canvas/LoadingOverlay/LoadingOverlay";
import { RouterProvider, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "./store/slices/AuthSlice";
import router from "./AppMainPages/AppMainRouter";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  if (loading) {
    return <LoadingOverlay loading={loading} />;
  }

  return (
    <>
      <LoadingOverlay loading={loading} />
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
