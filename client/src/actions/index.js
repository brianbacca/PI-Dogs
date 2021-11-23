import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  GET_DETAILS,
  FILTER_TEMPERAMENTS,
  FILTER_CREATED,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  SPIN_LOADING,
  GET_DOGS_ERROR,
} from "./constant.js";

import axios from "axios";

//action:
// 1) get que me traiga todos los pichichen

export function getDogs() {
  return async function (dispatch) {
    var dogs = await axios.get("http://localhost:3001/dogs", {});
    return dispatch({
      type: GET_DOGS,
      payload: dogs.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var temperaments = await axios.get(
      "http://localhost:3001/temperaments",
      {}
    );
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: temperaments.data,
    });
  };
}

export function getDogsName(name) {
  return async function (dispatch) {
    try {
      return await axios
        .get(`http://localhost:3001/dogs?name=${name}`)
        .then((json) => dispatch({ type: GET_DOGS_NAME, payload: json.data }))
        .catch((error) =>
          dispatch({
            type: GET_DOGS_ERROR,
            error: [
              {
                name: "The breed was not found, try again",
                image:
                  "https://scontent.fcnq2-2.fna.fbcdn.net/v/t1.6435-9/104256655_3367084809992763_5174959565789712579_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=973b4a&_nc_ohc=SASoECbF1zoAX863PqI&_nc_ht=scontent.fcnq2-2.fna&oh=09551e372fd25b73eb71d2bb29aae87f&oe=61C2764F",
              },
            ],
          })
        );
    } catch (err) {
      console.log("Error en geetDogsName", err);
    }
  };
}

export function postDog(payload) {
  console.log(payload);
  return async function (dispatch) {
    try {
      var post = await axios.post("http://localhost:3001/dog", payload);
      return post;
    } catch (err) {
      console.log("Error en postDog", err);
    }
  };
}

export function filterByTemps(payload) {
  return {
    type: FILTER_TEMPERAMENTS,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function sortbyweight(payload) {
  return {
    type: SORT_BY_WEIGHT,
    payload,
  };
}

export function getDogsDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (err) {
      console.log("error en getDogsDetails", err);
    }
  };
}

export function spinLoadader(paylaod) {
  return {
    type: SPIN_LOADING,
    paylaod,
  };
}

// export function getNames() {
//   return async function (dispatch) {
//     var json = await axios.get("http://localhost:3001/names", {});
//     return dispatch({
//       type: "GET_NAMES",
//       payload: json.data,
//     });
//   };
// }

// export const postDog = ({
//   name,
//   height_min,
//   height_max,
//   weight_min,
//   weight_max,
//   life_span,
//   temperament,
//   image,
// }) => {
//   return async (dispatch) => {
//     await axios.post("http://localhost:3001/dog", {
//       name,
//       height_min,
//       height_max,
//       weight_min,
//       weight_max,
//       life_span,
//       temperament,
//       image,
//     });
//      dispatch({
//       type: POST_DOGS,
//     });
//   };
// };
