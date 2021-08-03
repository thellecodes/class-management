import React, { useEffect, useState } from "react";
import AppNavbar from "../AppNavbar";
import { useSelector, useDispatch } from "react-redux";
import { AvatarGenerator } from "random-avatar-generator";
import { useParams } from "react-router-dom";

/* Actions */
import { updateAClass } from "../../store/actions/classActions";

/* Avatar */
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const UpdateClass = () => {
  let { slug: s_slug } = useParams();
  const dispatch = useDispatch();
  const { classes, updated } = useSelector((state) => state.cla);

  const classDetail = classes.filter(({ slug }) => slug === s_slug)[0];

  const { msg: errMsg, id: errID } = useSelector((state) => state.error);
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (updated) {
      window.location.href = "/classes";
    }

    if (classDetail) {
      setClassName(classDetail.class_name.toUpperCase());
    }
  }, [classDetail, updated]);

  const onChange = (e) => setClassName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateAClass({
        class_name: className,
        slug: classDetail.slug,
        uid: classDetail.uid,
      })
    );
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        {classDetail ? (
          <>
            <div className="class__wrapper__left">
              <img src={avatar} alt="Avatar" />

              <ul>
                <li> Update a class</li>
                <li> Update class name</li>
              </ul>
            </div>
            <div className="class__wrapper__right">
              <form {...{ onSubmit }} method="post">
                <div className="form-group">
                  <label htmlFor="name">Class Name</label>
                  <input
                    type="text"
                    name="classname"
                    id="classname"
                    placeholder="Class Name"
                    className="mb-3"
                    value={className}
                    {...{ onChange }}
                  />

                  {errID == "UPDATE_CLASS_ERROR" ? (
                    <div
                      className="err-msgs"
                      style={{ color: "red", marginTop: "10px" }}
                    >
                      {errMsg}
                    </div>
                  ) : null}

                  <button color="dark" style={{ marginTop: "1rem" }} block>
                    Update Class Records
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

export default UpdateClass;
