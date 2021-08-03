import React from "react";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import { useSelector } from "react-redux";

const Courses = () => {
  const { courses } = useSelector((state) => state.cou);

  return (
    <div className="container">
      <div className="student__wrapper">
        <AppNavbar />

        <div className="classes__wrapper">
          {courses.length > 0 ? (
            <ul className="allClasses">
              {courses.map(({ course_name, slug }, id) => {
                return (
                  <li key={id}>
                    <Link to={`/about-course/${slug}`}>
                      {course_name.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <h3>No Course Available</h3>
              <br />
              <Link to="/create-course"> Create a course</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
