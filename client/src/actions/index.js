import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  GET_DETAILS,
  FILTER_TEMPERAMENTS,
  FILTER_CREATED,
  SORT_BY_NAME,
  SORT_BY_WEIGHT,
  POST_DOGS,
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
      var dogsByname = await axios.get(
        `http://localhost:3001/dogs?name=${name}`,
        {}
      );
      return dispatch({
        type: GET_DOGS_NAME,
        payload: dogsByname.data,
      });
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

export function sortByName(paylod) {
  return {
    type: SORT_BY_NAME,
    paylod,
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
