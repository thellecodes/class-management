import React, { useEffect } from "react";
import AppNavbar from "../AppNavbar";
import { AvatarGenerator } from "random-avatar-generator";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass } from "../../store/actions/classActions";

const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

function ViewClass() {
  const history = useHistory();
  const dispatch = useDispatch();
  let { slug: s_slug } = useParams();

  const { students } = useSelector((state) => state.stu);
  const { classes, deleted } = useSelector((state) => state.cla);
  const classDetail = classes.filter(({ slug }) => slug == s_slug)[0];

  const numOfStudents = students.filter(
    ({ student_class }) => student_class == classDetail.class_name
  );

  const onDelete = (uid) => dispatch(deleteClass(uid));

  useEffect(() => {
    if (deleted) {
      window.location.href = "/classes";
    }
  }, [deleted]);

  return (
    <div className="container">
      <AppNavbar />
      <div className="one__student">
        {classDetail ? (
          <>
            <div className="one__student__left">
              <img src={avatar} />

              <h1>{classDetail.class_name.toUpperCase()}</h1>
            </div>
            <div className="one__student__right">
              <ul>
                <li>
                  <span>Name</span>: {classDetail.class_name.toUpperCase()}
                </li>
                <li>
                  <span>Number of Students </span>:
                  {numOfStudents.length > 0 ? (
                    numOfStudents.length
                  ) : (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      No student attached to this class
                    </span>
                  )}
                </li>
                <li>
                  <span>Participating Students</span>:
                  <ol style={{ marginTop: "14px" }}>
                    {numOfStudents.map(({ student_name }) => (
                      <li>
                        <span
                          style={{
                            color: "green",
                            marginLeft: "10px",
                            textTransform: "capitalize",
                            fontSize: "12px",
                          }}
                        >
                          {student_name.toUpperCase()}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              </ul>

              <div className="one__actions">
                <Link to={`/class/update/${classDetail.slug}`}>
                  Update student records
                </Link>

                <button
                  className="del-btn"
                  onClick={() => onDelete(classDetail.uid)}
                >
                  Delete Class
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

export default withRouter(ViewClass);
