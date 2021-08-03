import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import Tagify from "@yaireo/tagify";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";

/* Actions */
import { createStudent } from "../../store/actions/studentActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminStudent = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.cou);
  const { created } = useSelector((state) => state.stu);
  const courseList = courses.map((c) => c.course_name.toUpperCase());

  console.log(courseList);

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
  }, []);

  useEffect(() => {
    if (created) {
      return (window.location = "/students");
    }
  }, [created]);

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentClass, setStudentClass] = useState("");

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
      createStudent({
        name: studentName,
        age: studentAge,
        className: studentClass,
        courses: courseStudents,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        <div className="class__wrapper__left">
          <img src={avatar} />

          <ul>
            <li> Create a student</li>
            <li>Add Student Name</li>
            <li> Add Student to Class</li>
            <li>Add Student Age</li>
            <li>Add Studen Courses</li>
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
                onChange={(e) => setStudentName(e.target.value)}
              />

              <label htmlFor="age">Student Age</label>
              <input
                type="number"
                name="studentage"
                id="studentage"
                placeholder="Student Age"
                onChange={(e) => setStudentAge(e.target.value)}
              />

              <label htmlFor="name">Assign Courses to this Student</label>
              <input
                type="text"
                name="tags"
                id="assigncourses"
                placeholder="Assign Courses"
              />

              <div className="student__wrapper">
                <label htmlFor="name">Select Class of Student</label>
                <br />
                <select value={studentClass} {...{ onChange }}>
                  <option value="Select a class">Select class</option>
                  {classOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              {errID == "STUDENT__ERROR" ? (
                <div
                  className="err-msgs"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  {errMsg}
                </div>
              ) : null}

              <button color="dark" style={{ marginTop: "1rem" }} block>
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminStudent;
