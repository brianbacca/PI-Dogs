import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  GET_DETAILS,
  POST_DOGS,
  FILTER_TEMPERAMENTS,
  FILTER_CREATED,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  SPIN_LOADING,
  GET_DOGS_ERROR,
} from "../actions/constant.js";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  datails: [],
  Loading: false,
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
      const allDogsCreated = state.allDogs;
      const createdFilter =
        action.payload === "created"
          ? allDogsCreated.filter((e) => e.createInDb)
          : allDogsCreated.filter((e) => !e.createInDb);
      return {
        ...state,
        dogs: action.payload === "All" ? allDogsCreated : createdFilter,
      };
    case SORT_BY_WEIGHT:
      let sorteWeight =
        action.payload === "ascW"
          ? state.dogs.sort(function (a, b) {
              return b.weight_min - a.weight_min;
            })
          : state.dogs.sort(function (a, b) {
              return a.weight_min - b.weight_min;
            });
      return {
        ...state,
        dogs: sorteWeight,
      };
    case SORT_BY_NAME:
      let sortDog;
      if (action.payload === "todos") {
        sortDog = state.dogs;
      }
      if (action.payload === "asc") {
        sortDog = state.dogs.sort(function (a, b) {
          if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
          }
          if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === "desc") {
        sortDog = state.dogs.sort(function (a, b) {
          if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return -1;
          }
          if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        dogs: sortDog,
      };
    case SPIN_LOADING:
      return {
        ...state,
        Loading: action.payload,
      };
    case GET_DOGS_ERROR:
      return {
        ...state,
        dogs: action.error,
      };

    default:
      return state;
  }
}

// const doggi = state.dogs.map((n) => n);
// const sortAZ = doggi.sort((a, b) => {
//   if (a.name < b.name) return -1;
//   else if (a.name > b.name) return 1;
//   else return 0;
// });
// const sortZA = doggi.sort((a, b) => {
//   if (a.name < b.name) return 1;
//   else if (a.name > b.name) return -1;
//   else return 0;
// });

// return {
//   ...state,
//   dogs: action.paylod === "asc" ? sortAZ : sortZA,
// };
