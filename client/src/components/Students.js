import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const Students = () => {
  useEffect(() => {}, []);

  const { students } = useSelector((state) => state.stu);

  return (
    <div className="container">
      <div className="student__wrapper students__cover">
        <AppNavbar />

        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Courses</th>
          </tr>
          {students.map(
            (
              {
                student_name,
                student_age,
                student_class,
                student_course,
                slug,
              },
              id
            ) => {
              const studentCourses = student_course.split(",");

              return (
                <tr key={id}>
                  <td>
                    <Link to={`/student/${slug}`}>
                      {student_name.toUpperCase()}
                    </Link>
                  </td>
                  <td>{student_age}</td>
                  <td>{student_class.toUpperCase()}</td>
                  <td>
                    <select value="">
                      <option defaultValue="1">Courses</option>
                      {studentCourses.map((_, id) => (
                        <option value="2">{_.toUpperCase()}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            }
          )}
        </table>
      </div>
    </div>
  );
};

export default Students;
