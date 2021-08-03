import React, { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent } from "../../store/actions/studentActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewStudent() {
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();

  const { students, deleted } = useSelector((state) => state.stu);
  const studentDetail = students.filter(({ slug }) => slug == s_slug)[0];
  const totalCourse = studentDetail.student_course.split(" ").length;

  const onDelete = (uid) => dispatch(deleteStudent(uid));

  useEffect(() => {
    if (deleted) {
      window.location.href = "/students";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {studentDetail ? (
          <>
            <div className="one__student__left">
              <img src={avatar} />

              <h1>{studentDetail.student_name.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <ul>
                <li>
                  <span>Name</span>: {studentDetail.student_name.toUpperCase()}
                </li>
                <li>
                  <span>Age</span>: {studentDetail.student_age}
                </li>
                <li>
                  <span>Class</span>:{studentDetail.student_class.toUpperCase()}
                </li>
                <li>
                  <span>Courses</span>:
                  {studentDetail.student_course.toUpperCase()}
                </li>
                <li>
                  <span>Total Number Courses</span>:{totalCourse}
                </li>
              </ul>

              <div className="one__actions">
                <Link to={`/student/update/${studentDetail.slug}`}>
                  Update student records
                </Link>

                <button
                  className="del-btn"
                  onClick={() => onDelete(studentDetail.uid)}
                >
                  Delete student records
                </button>
              </div>
            </div>
          </>
        ) : (
          <h3>Record Unavailable for Student</h3>
        )}
      </div>
    </div>
  );
}

export default withRouter(ViewStudent);
