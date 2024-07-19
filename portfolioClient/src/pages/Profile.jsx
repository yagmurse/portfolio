import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { avatar_image } from "../assets";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logout successful");

        setLoggedOut(true);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error?.msg || "Unknown error"}`);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-700">
      <div className="bg-white p-20 shadow-lg text-center rounded-2xl">
        <h2 className="text-2xl font-bold text-slate-700">Profile Page</h2>
        <img src={avatar_image} alt="Avatar" className=" " />
        <p className="text-gray-700 mb-4">
          {user ? (
            <>
              You are logged in as <strong>{user.username}</strong>
            </>
          ) : (
            "Please login"
          )}
        </p>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Logout
          </button>
        ) : (
          "Please login"
        )}
      </div>
    </div>
  );
};

export default Profile;
