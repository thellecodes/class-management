import {
  COURSE_FAIL,
  ADD_COURSE,
  CLEAR_ERRORS,
  ADD_CLASS,
  CLASS_FAIL,
  DELETE_STUDENT,
  UPDATE_COURSE,
  UPDATE_CLASS,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

/* Create a course */
export const createCourse =
  ({ name }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name });

    await axios
      .post("/api/course/create", body, config)
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: ADD_COURSE, payload: [data] });
        dispatch({ type: "COURSE_CREATED" });
      })
      .catch((err) => {
        dispatch({ type: COURSE_FAIL });
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "COURSE__ERROR"
          )
        );
      });
  };

export const getCourses = () => (dispatch) => {
  axios
    .get("/api/course")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_COURSE, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
    });
};

/* Class Actions */
export const createClass =
  ({ name }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name });

    await axios
      .post("/api/class/create", body, config)
      .then((res) => {
        const { data } = res.data;

        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: ADD_CLASS, payload: [data] });
        dispatch({ type: "CLASS_CREATED" });
      })
      .catch((err) => {
        dispatch({ type: COURSE_FAIL });
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "CLASS__ERROR"
          )
        );
      });
  };

export const getClasses = () => (dispatch) => {
  axios
    .get("/api/class")
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_CLASS, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data.msg, err.response.status))
    );
};

export const deleteClass = (uid) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`/api/class/${uid}`, config)
    .then(() => {
      dispatch({
        type: "CLASS_DELETED",
        payload: uid,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateAClass =
  ({ class_name, slug, uid }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ class_name, slug, uid });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put("/api/class", body, config)
      .then(() => dispatch({ type: UPDATE_CLASS }))
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

export const updateACourse =
  ({ course_name, students, slug, uid }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ course_name, slug, uid, students });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put("/api/course", body, config)
      .then(() => dispatch({ type: UPDATE_COURSE }))
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "UPDATE_COURSE_ERROR"
          )
        );
      });
  };

export const deleteCourse = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .delete(`/api/course`, { data: { course_id: `${id}` } }, config)
    .then(() => {
      dispatch({
        type: "COURSE_DELETED",
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
