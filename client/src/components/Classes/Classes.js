import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";

const Classes = () => {
  const { classes } = useSelector((state) => state.cla);

  return (
    <div className="container">
      <div className="student__wrapper">
        <AppNavbar />

        <div className="classes__wrapper">
          {classes.length > 0 ? (
            <ul className="allClasses">
              {classes.map(({ class_name, slug }, id) => {
                return (
                  <li key={id}>
                    <Link to={`/about-class/${slug}`}>
                      {class_name.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h3>No Course Available</h3>
              <br />
              <Link to="/create-class"> Create a class</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
