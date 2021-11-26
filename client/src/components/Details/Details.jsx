import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogsDetail } from "../../actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";
import s from "./Details.module.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const Dog = useSelector((state) => state.datails);

  useEffect(() => {
    dispatch(getDogsDetail(id));
  }, [dispatch, id]);

  return Dog.length > 0 ? (
    Dog.map((b) => {
      return (
        <>
          <Nav />
          <div className={s.container}>
            <div className={s.container__card}>
              <div className={s.left}>
                <img
                  src={
                    b.image
                      ? b.image
                      : "https://i.pinimg.com/originals/d7/8c/88/d78c886e714f2d4040b96037dbbaa79d.png"
                  }
                  alt="Img not found"
                  width="400"
                  className={s.fotito}
                />
              </div>
              <div className={s.right}>
                <h1 className={s.h1}>{b.name}</h1>
                <div>
                  <h4 className={s.height}>Height:</h4>
                  <p>
                    {b.height_min}Cm - {b.height_max}Cm
                  </p>
                </div>
                <h4 className={s.margin}>Weight:</h4>
                <p>
                  {b.weight_min}Kg - {b.weight_max} Kg
                </p>
                <h4 className={s.margin}>Temperaments:</h4>
                <p>
                  {b.temperament ? b.temperament : "the dog has no temperaments"}
                </p>
                <h4 className={s.margin}>Life Span:</h4>
                <p>{b.life_span}</p>
              </div>
            </div>
            {/* <Link to="/dogs">
          <button>Volver</button>
        </Link> */}
          </div>
        </>
      );
    })
  ) : (
    <Loading />
  );
}
