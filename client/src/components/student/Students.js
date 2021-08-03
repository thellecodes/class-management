import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppNavbar from "../AppNavbar";

const Students = () => {
  const { students } = useSelector((state) => state.stu);
  const { courses } = useSelector((state) => state.cou);
  const { classes } = useSelector((state) => state.cla);

  return (
    <div className="container">
      <div className="student__wrapper students__cover">
        <AppNavbar />

        {students.length > 0 && courses.length > 0 && classes.length > 0 ? (
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
        ) : (
          <div style={{ paddingLeft: "10px" }}>
            <h4>Please complete the following to manage students</h4>
            <ul>
              {courses.length < 1 ? (
                <li>
                  <Link to="/create-course"> Create a course</Link>
                </li>
              ) : null}
              {classes.length < 1 ? (
                <li>
                  <Link to="/create-class">Create a Class</Link>
                </li>
              ) : null}
              {classes.length > 0 && courses.length > 0 ? (
                <li>
                  <Link to="/create-student">Add a Student</Link>
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
