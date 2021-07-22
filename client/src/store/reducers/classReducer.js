import { ADD_CLASS, UPDATE_CLASS } from "../actions/types";

const initialState = {
  classes: [],
  deleted: false,
  updated: false,
  created: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case ADD_CLASS:
      return {
        ...state,
        classes: [...state.classes, ...payload],
      };
    case UPDATE_CLASS:
      return {
        ...state,
        updated: true,
      };
    case "CLASS_CREATED":
      return {
        ...state,
        created: true,
      };
    case "CLASS_DELETED":
      return {
        ...state,
        deleted: true,
      };
    default:
      return state;
  }
};
