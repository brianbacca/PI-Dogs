import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
} from "../actions/constant.js";

const initialState = {
  dogs: [],
  allDogs: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_TEMPERAMENTS:
      let allDogs = state.allDogs;
      let tempfiltrados =
        action.payload === "allT"
          ? allDogs
          : allDogs.filter(
              (t) => t.temperament && t.temperament.includes(action.payload)
            );
      return {
        ...state,
        dogs: tempfiltrados,
      };

    default:
      return state;
  }
}
