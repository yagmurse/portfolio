import React from "react";
import { Link, useRouteError } from "react-router-dom";
import "./Wrapper.css";
import img from "../../assets/images/notfound.svg";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="wrapper">
      <div>
        <img src={img} alt="not found" />
        {error && error.status === 404 ? (
          <>
            <h3>Ohh! Page not found</h3>
            <p>We can't seem to find the page you are looking for</p>
            <Link to="/">Back Home</Link>
          </>
        ) : (
          <h3>Something went wrong</h3>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
