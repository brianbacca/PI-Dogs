import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../actions";
import Nav from "../Nav/Nav";
import styles from "./DogCreate.module.css";

//------------------------------------------------
export default function DogCreate() {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);
  const names = useSelector((state) => state.names);
  const [errors, setErrors] = useState({});

  //---------------------------------------------------------------------------------------------------
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "name is required";
    } else if (!/^[A-Z]+[A-Za-z\s]+$/g.test(input.name)) {
      errors.name =
        "the first letter must be capitalized and the name can only contain letters";
    } else if (input.name === names) {
      errors.name = "la raza ya existe";
    }
    if (!input.height_min) {
      errors.height_min = "height min is required";
    } else if (input.height_min <= 0) {
      errors.height_min = " height should be higher than 0!";
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.height_min)) {
      errors.height_min = " value has to be numeric, no comma is allowed";
    }
    if (!input.height_max) {
      errors.height_max = "height max is required";
    } else if (parseInt(input.height_max) <= parseInt(input.height_min)) {
      errors.height_max = " cannot be greater than or equal to max";
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.height_max)) {
      errors.height_max = " value has to be numeric, no comma is allowed";
    }
    if (!input.weight_min) {
      errors.weight_min = "weight min is required";
    } else if (input.weight_min <= 0) {
      errors.weight_min = " weight should be higher than 0!";
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)) {
      errors.weight_min = " value has to be numeric, no comma is allowed";
    }
    if (!input.weight_max) {
      errors.weight_max = "weight max is required";
    } else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
      errors.weight_max = " cannot be greater than or equal to max";
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)) {
      errors.weight_max = " value has to be numeric, no comma is allowed";
    }

    if (!input.life_span_min) {
      errors.life_span_min = "life span min is required";
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.life_span_min)) {
      errors.life_span_min = "value has to be numeric, no comma is allowed";
    }
    if (!input.life_span_max) {
      errors.life_span_max = "life span max is required";
    } else if (parseInt(input.life_span_max) <= parseInt(input.life_span_min)) {
      errors.life_span_max = " cannot be greater than or equal to max";
    } else if (!/^[1-9]\d*(\.\d+)?$/.test(input.life_span_max)) {
      errors.life_span_max = "value has to be numeric, no comma is allowed";
    }
    if (
      input.image &&
      !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image)
    ) {
      errors.image = "It must be a URL or be empty to take a Default Image";
    }

    return errors;
  }
  //-----------------------------------------------------------------------------------------------------

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperament: [],
    image: "",
  });
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  }
  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== e),
    });
  }

  function handleSumbit(e) {
    e.preventDefault();
    if (
      Object.keys(errors).length === 0 &&
      input.name !== "" &&
      input.height_min !== "" &&
      input.height_max !== "" &&
      input.weight_min !== "" &&
      input.weight_max !== "" &&
      input.life_span_min !== "" &&
      input.life_span_max !== "" &&
      input.image === ""
    ) {
      dispatch(postDog(input));
      alert("Dog created!!!");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperament: [],
        image: "",
      });
    } else {
    }
  }
  return (
    <div className={styles.divCreate}>
      <Nav />
      <h1 className={styles.title}>Create Dog</h1>
      <form className={styles.form} onSubmit={(e) => handleSumbit(e)}>
        <div>
          <div>
            <label>Name</label>
            <input
              className={styles.name}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.name && <p className={styles.error1}>{errors.name}</p>}
          </div>
          <div>
            <label>height-min(Cm)</label>
            <input
              className={styles.heightMin}
              type="number"
              min="0"
              value={input.height_min}
              name="height_min"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.height_min && (
              <p className={styles.error}>{errors.height_min}</p>
            )}
          </div>
          <div>
            <label>height-max(Cm)</label>
            <input
              className={styles.heightMax}
              type="number"
              min="0"
              value={input.height_max}
              name="height_max"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.height_max && (
              <p className={styles.error}>{errors.height_max}</p>
            )}
          </div>
          <div>
            <label>weight-min(Kg)</label>
            <input
              className={styles.weighMin}
              type="number"
              min="0"
              value={input.weight_min}
              name="weight_min"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.weight_min && (
              <p className={styles.error}>{errors.weight_min}</p>
            )}
          </div>
          <div>
            <label>weight-max(Kg)</label>
            <input
              className={styles.input}
              type="number"
              min="0"
              value={input.weight_max}
              name="weight_max"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.weight_max && (
              <p className={styles.error}>{errors.weight_max}</p>
            )}
          </div>
          <div>
            <label>life min(years)</label>
            <input
              className={styles.lifeSpanMin}
              type="number"
              min="0"
              value={input.life_span_min}
              name="life_span_min"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.life_span_min && (
              <p className={styles.error2}>{errors.life_span_min}</p>
            )}
          </div>
          <div>
            <label>life max(years)</label>
            <input
              className={styles.lifeSpanMax}
              type="number"
              min="0"
              value={input.life_span_max}
              name="life_span_max"
              onChange={(e) => handleChange(e)}
              autocomplete="off"
            />
            {errors.life_span_max && (
              <p className={styles.error2}>{errors.life_span_max}</p>
            )}
          </div>
          <div className={styles.temp}>
            <select onChange={(e) => handleSelect(e)}>
              {temperaments &&
                temperaments.map((t) => (
                  <option
                    className={styles.temp}
                    name="temperament"
                    key={t}
                    value={t}
                  >
                    {t}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>image</label>
            <input
              className={styles.input}
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className={styles.image1}>{errors.image}</p>}

            <label className={styles.tempTi}>Temperament:</label>
            {input.temperament.map((el) => (
              <ul key={el} className={styles.allTemps}>
                <li>
                  <p className={styles.temp}>{el}</p>
                  <button className={styles.x} onClick={() => handleDelete(el)}>
                    x
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <button className={styles.button} onSubmit={(e) => handleSumbit(e)}>
          Create
        </button>

        <div></div>
      </form>
      <div>
        <img
          className={styles.image}
          src="https://www.hola.com/imagenes/estar-bien/20190820147813/razas-perros-pequenos-parecen-grandes/0-711-550/razas-perro-pequenos-grandes-a.jpg?filter=w500"
          alt=""
        />
      </div>
    </div>
  );
}
