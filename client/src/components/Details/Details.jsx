import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsDetail } from "../../actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const Dog = useSelector((state) => state.datails);
  const arrDog = Object.values(Dog);

  useEffect(() => {
    dispatch(getDogsDetail(id));
  }, []);

  return (
    <div>
      <h1>{Dog.name}</h1>
      <div>
        <img src={Dog.image} alt="Img not found" />
        <div>
          <div>
            <h2>Height:</h2>
            <p>
              {Dog.height_min}Cm - {Dog.height_max}Cm
            </p>
          </div>
          <div>
            <h2>Weight:</h2>
            <p>
              {Dog.weight_min}Kg - {Dog.weight_max} Kg
            </p>
          </div>
          <div>
            <h2>Life Span:</h2>
            <p>{Dog.life_span}</p>
          </div>
          <div>
            <h2>Temperaments:</h2>
          </div>
          <p>{Dog.temperament}</p>
        </div>
      </div>
      <Link to="/dogs">
        <button>Volver</button>
      </Link>
    </div>
  );
}
