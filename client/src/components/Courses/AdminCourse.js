import React, { useState, useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { useDispatch, useSelector } from "react-redux";

/* Actions */
import { createCourse } from "../../store/actions/classActions";
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminCourse = () => {
  const dispatch = useDispatch();

  const [courseName, setCourseName] = useState("");

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const { created } = useSelector((state) => state.cou);

  useEffect(() => {
    if (created) {
      window.location.href = "/courses";
    }
  }, [created]);

  const onSubmit = (e) => {
    e.preventDefault();

    let courseStudents = [];
    const tags = document.querySelectorAll(".tagify__tag");
    for (var i = 0; i <= tags.length; i++) {
      if (tags[i]) {
        courseStudents.push(tags[i].getAttribute("value"));
      }
    }

    dispatch(createCourse({ name: courseName }));
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        <div className="class__wrapper__left">
          <img src={avatar} alt="Avatar" />

          <h1>Course Creation</h1>
          <ul>
            <li>Create A Course(eg: English)</li>
            <li>Add students to course</li>
          </ul>
        </div>
        <div className="class__wrapper__right">
          <form {...{ onSubmit }}>
            <div className="form-group">
              <label htmlFor="name">Course Name</label>
              <input
                type="text"
                name="coursename"
                id="coursename"
                placeholder="Course Name"
                className="mb-3"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            {errID === "COURSE__ERROR" ? (
              <div
                className="err-msgs"
                style={{ color: "red", marginTop: "10px" }}
              >
                {errMsg}
              </div>
            ) : null}

            <button color="dark" style={{ marginTop: "1rem" }}>
              Create Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
