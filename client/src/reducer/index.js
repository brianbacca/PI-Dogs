import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  GET_DETAILS,
  POST_DOGS,
  FILTER_TEMPERAMENTS,
  FILTER_CREATED,
  PAGE,
  GET_DOGS_ERROR,
} from "../actions/constant.js";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  datails: [],
  page: 1,
  names: [],
  loading: true,
  filterr: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
        names: action.payload.map((b) => b.name),
        datails: [],
        loading: false,
        filterr: action.payload,
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
    case GET_DETAILS:
      return {
        ...state,
        datails: action.payload,
      };

    case POST_DOGS:
      return {
        ...state,
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
      const allDogss = state.allDogs;
      let filter =
        action.payload === "created"
          ? allDogss.filter((e) => e.createInDb)
          : allDogss.filter((e) => !e.createInDb);
      return {
        ...state,
        dogs: action.payload === "All" ? allDogss : filter,
        filterr: filter,
      };

    case GET_DOGS_ERROR:
      return {
        ...state,
        dogs: action.error,
      };
    case PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case "SORTI": {
      let dogi = state.allDogs;
      let sorti =
        action.payload === "asc"
          ? dogi.sort(function (a, b) {
              if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1;
              }
              if (b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase()) {
                return -1;
              }
              return 0;
            })
          : action.payload === "desc"
          ? dogi.sort(function (a, b) {
              if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return -1;
              }
              if (b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase) {
                return 1;
              }
              return 0;
            })
          : action.payload === "ascW"
          ? dogi.sort(function (a, b) {
              if (Number(a.weight_min) > Number(b.weight_min)) {
                return -1;
              }
              if (Number(b.weight_min) > Number(a.weight_min)) {
                return 1;
              }
              return 0;
            })
          : dogi.sort(function (a, b) {
              if (Number(a.weight_min) > Number(b.weight_min)) {
                return 1;
              }
              if (Number(b.weight_min) > Number(a.weight_min)) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sorti,
      };
    }
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
