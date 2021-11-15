import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_NAME,
  POST_DOGS,
  FILTER_TEMPERAMENTS,
  FILTER_CREATED,
  SORT_BY_NAME,
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

export function filterSortByName(paylod) {
  return {
    type: SORT_BY_NAME,
    paylod,
  };
}
