import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  POST_DOGS,
  FILTER_TEMPERAMENTS,
  FILTER_CREATED,
  SORT_BY_NAME,
} from "../actions/constant.js";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
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
    case GET_DOGS_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case POST_DOGS:
      return {
        ...state,
        dogs: action.payload,
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
    case FILTER_CREATED:
      const allDogsCreated = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogsCreated.filter((e) => e.createInDb)
          : allDogsCreated.filter((e) => !e.createInDb);
      return {
        ...state,
        dogs: action.payload === "All" ? allDogsCreated : createdFilter,
      };

    case SORT_BY_NAME:
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
    default:
      return state;
  }
}
