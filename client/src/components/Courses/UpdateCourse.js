import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateACourse } from "../../store/actions/classActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateStudent = () => {
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();
  const { courses, updated } = useSelector((state) => state.cou);
  const { students } = useSelector((state) => state.stu);

  const courseDetail = courses.filter(({ slug }) => slug === s_slug)[0];

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");

    if (courseDetail) {
      const studentList = students
        .map(({ student_course, student_name }) => {
          if (student_course.includes(courseDetail.course_name.toLowerCase())) {
            return student_name.toUpperCase();
          }
          return null;
        })
        .filter((std) => std != undefined);

      if (students.length > 0)
        new Tagify(input1, {
          whitelist: [...studentList],
          dropdown: {
            classname: "color-blue",
            enabled: 0,
            maxItems: 5,
            position: "text",
            closeOnSelect: false,
            highlightFirst: true,
          },
        });
    }

    if (courseDetail) {
      setCourseName(courseDetail.course_name.toUpperCase());
    }
  }, [courseDetail]);

  useEffect(() => {
    if (updated) {
      window.location.href = "/courses";
    }
  }, [updated]);

  const onChange = (e) => setCourseName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    let courseStudents = [];
    const tags = document.querySelectorAll(".tagify__tag");
    for (var i = 0; i <= tags.length; i++) {
      if (tags[i]) {
        courseStudents.push(tags[i].getAttribute("value"));
      }
    }

    dispatch(
      updateACourse({
        course_name: courseName,
        students: courseStudents,
        uid: courseDetail.uid,
        slug: s_slug,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        {courseDetail ? (
          <>
            <div className="class__wrapper__left">
              <img src={avatar} />

              <ul>
                <li> Update a course</li>
                <li>Update Course name</li>
                <li> Add Student to course</li>
              </ul>
            </div>
            <div className="class__wrapper__right">
              <form {...{ onSubmit }} method="post">
                <div className="form-group">
                  <label htmlFor="name">Course Name</label>
                  <input
                    type="text"
                    name="coursename"
                    id="coursename"
                    placeholder="Course Name"
                    className="mb-3"
                    value={courseName}
                    {...{ onChange }}
                  />

                  <label htmlFor="coursename">
                    Assign Courses to this Student
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="assigncourses"
                    placeholder="Assign Courses"
                    className="mb-3"
                    value={`${courseDetail.course_students.toUpperCase()}`}
                  />

                  {errID == "UPDATE_COURSE_ERROR" ? (
                    <div
                      className="err-msgs"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errMsg}
                    </div>
                  ) : null}

                  <button color="dark" style={{ marginTop: "1rem" }} block>
                    Update Course Records
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateStudent;
