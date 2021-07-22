import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateStudent } from "../../store/actions/studentActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateStudent = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.cou);
  const { students, updated } = useSelector((state) => state.stu);
  const courseList = courses.map((c) => c.course_name.toUpperCase());

  let { slug: s_slug } = useParams();
  const studentDetail = students.filter(({ slug }) => slug == s_slug)[0];

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentClass, setStudentClass] = useState("");

  useEffect(() => {
    var input1 = document.querySelector("input[name=tags]");
    new Tagify(input1, {
      whitelist: [...courseList],
      dropdown: {
        classname: "color-blue",
        enabled: 0,
        maxItems: 5,
        position: "text",
        closeOnSelect: false,
        highlightFirst: true,
      },
    });

    if (studentDetail) {
      setStudentName(studentDetail.student_name.toUpperCase());
      setStudentAge(studentDetail.student_age);
      setStudentClass(studentDetail.student_class.toUpperCase());
    }
  }, [studentDetail]);

  useEffect(() => {
    if (updated) {
      window.location.href = "/students";
    }
  }, [updated]);

  /* Classes */
  const { classes } = useSelector((state) => state.cla);
  const classOptions = classes.map((c) => c.class_name.toUpperCase());

  const onChange = (e) => {
    setStudentClass(e.target.value);
  };

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
      updateStudent({
        name: studentName,
        age: studentAge,
        className: studentClass,
        courses: courseStudents,
        slug: studentDetail.slug,
        uid: studentDetail.uid,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        {studentDetail ? (
          <>
            <div className="class__wrapper__left">
              <img src={avatar} />

              <ul>
                <li> Create a student</li>
                <li>Update Student Name</li>
                <li> Update Student Class</li>
                <li>Update Student Age</li>
                <li>Update Student Course(s)</li>
              </ul>
            </div>
            <div className="class__wrapper__right">
              <form {...{ onSubmit }} method="post">
                <div className="form-group">
                  <label htmlFor="name">Student Name</label>
                  <input
                    type="text"
                    name="studentname"
                    id="studentname"
                    placeholder="Student Name"
                    className="mb-3"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />

                  <label htmlFor="age">Student Age</label>
                  <input
                    type="number"
                    name="studentage"
                    id="studentage"
                    placeholder="Student Age"
                    className="mb-3"
                    onChange={(e) => setStudentAge(e.target.value)}
                    value={studentAge}
                  />

                  <label htmlFor="name">Assign Courses to this Student</label>
                  <input
                    type="text"
                    name="tags"
                    id="assigncourses"
                    placeholder="Assign Courses"
                    className="mb-3"
                    value={`${studentDetail.student_course.toUpperCase()}`}
                  />

                  <div className="student__wrapper">
                    <label htmlFor="name">Select Class of Student</label>
                    <br />
                    <select value={studentClass} {...{ onChange }}>
                      {classOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  {errID == "UPDATE_ERROR" ? (
                    <div
                      className="err-msgs"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errMsg}
                    </div>
                  ) : null}

                  <button color="dark" style={{ marginTop: "1rem" }} block>
                    Update Student Records
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
