import React, { useState, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import AppNavbar from "../AppNavbar";
import { useDispatch, useSelector } from "react-redux";
import { createClass } from "../../store/actions/classActions";
import { useHistory } from "react-router-dom";

/* Avatar Generator*/
const generator = new AvatarGenerator();
const avatar = generator.generateRandomAvatar();

const AdminClass = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [className, setClassName] = useState("");
  const { created } = useSelector((state) => state.cla);
  const { msg: errMsg, id: errID } = useSelector((state) => state.error);

  useEffect(() => {
    if (created) {
      history.push("/classes");
    }
  }, [created, history]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createClass({ name: className }));
  };

  return (
    <div className="container">
      <AppNavbar />
      <div className="class__wrapper">
        <div className="class__wrapper__left">
          <img src={avatar} alt="Avatar" />

          <h3>Classes</h3>
          <ul>
            <li>Create A Class(eg: Primary 1)</li>
          </ul>
        </div>
        <div className="class__wrapper__right">
          <h2>Create a class</h2>
          <form {...{ onSubmit }} className="form">
            <div className="form-group">
              <label for="name">Class Name</label>
              <input
                type="text"
                name="classname"
                id="classname"
                placeholder="Class Name"
                className="mb-3"
                onChange={(e) => setClassName(e.target.value)}
                value={className}
              />

              {errID == "CLASS__ERROR" ? (
                <div
                  className="err-msgs"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  {errMsg}
                </div>
              ) : null}

              <button color="dark" style={{ marginTop: "1rem" }} block>
                Create Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminClass;
