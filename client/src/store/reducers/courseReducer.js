import { ADD_COURSE, COURSE_FAIL, UPDATE_COURSE } from "../actions/types";

const initialState = {
  loading: true,
  courses: [],
  created: false,
  updated: false,
  deleted: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, ...payload],
      };
    case "COURSE_CREATED":
      return {
        ...state,
        created: true,
      };
    case COURSE_FAIL:
      return {
        ...state,
        created: false,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        updated: true,
      };
    case "COURSE_DELETED":
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};
