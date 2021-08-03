import { returnErrors } from "../actions/errorActions";
import axios from "axios";
import {
  CLEAR_ERRORS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "./types";

export const createStudent =
  ({ name, age, courses, className }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, age, courses, className });

    await axios
      .post("/api/student/create", body, config)
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: ADD_STUDENT, payload: [data] });
        dispatch({ type: "STUDENT_CREATED" });
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "STUDENT__ERROR"
          )
        );
      });
  };

export const getStudents = () => (dispatch) => {
  axios
    .get("/api/student")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_STUDENT, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data.msg, err.response.status))
    );
};

export const updateStudent =
  ({ name, age, className, courses, slug, uid }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ name, age, courses, className, slug, uid });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put("/api/student", body, config)
      .then(() => dispatch({ type: UPDATE_STUDENT }))
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "UPDATE_ERROR"
          )
        );
      });
  };

export const deleteStudent = (uid) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`/api/student/${uid}`, config)
    .then(() => {
      dispatch({
        type: DELETE_STUDENT,
        payload: uid,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
