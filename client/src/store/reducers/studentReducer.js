import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from "../actions/types";

const initialState = {
  students: [],
  updated: false,
  deleted: false,
  created: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, ...payload],
      };
    case "STUDENT_CREATED":
      return {
        ...state,
        created: true,
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        updated: true,
      };

    case DELETE_STUDENT:
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};
